import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcryptjs";
import pool from "../config/database";
// Schéma de validation pour un utilisateur
export const userSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .min(2, { message: "Le nom doit comporter au moins 2 caractères" }),
  email: z.string().email({ message: "L'adresse email n'est pas valide" }),
  password: z.string().min(8, {
    message: "Le mot de passe doit comporter au moins 8 caractères",
  }),
  createdAt: z.string().datetime(),
});

export type User = z.infer<typeof userSchema>;

export class UserModel {
  // Création d'un nouvel utilisateur
  static async create(data: Omit<User, "id" | "createdAt">) {
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const hashedPassword = await bcrypt.hash(data.password, 10);

    await pool.query(
      "INSERT INTO users (id, name, email, password, created_at) VALUES (?, ?, ?, ?, ?)",
      [id, data.name, data.email, hashedPassword, createdAt]
    );

    return { id, name: data.name, email: data.email, createdAt };
  }

  // Recherche d'un utilisateur par email
  static async findByEmail(email: string): Promise<User | null> {
    const [rows]: any = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return null;
    }

    const user = rows[0];
    return userSchema.parse(user); // Validation avec Zod
  }

  // Recherche d'un utilisateur par ID
  static async findById(id: string): Promise<User | null> {
    const [rows]: any = await pool.query(
      "SELECT id, name, email, created_at AS createdAt FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    const user = rows[0];
    return userSchema.parse(user); // Validation avec Zod
  }

  // Vérification du mot de passe
  static async verifyPassword(
    storedPassword: string,
    inputPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedPassword);
  }
}
