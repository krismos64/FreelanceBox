import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import pool from "../config/database.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Vérifier si l'email existe déjà
    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    // Créer l'utilisateur
    await pool.query(
      "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
      [userId, name, email, hashedPassword]
    );

    res.status(201).json({ message: "Compte créé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la création du compte:", error);
    res.status(500).json({ message: "Erreur lors de la création du compte" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Rechercher l'utilisateur
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    const user = users[0];
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Générer le token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    // Ne pas renvoyer le mot de passe
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
});

router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const [users] = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id = ?",
      [decoded.userId]
    );

    if (!users[0]) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(users[0]);
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    res.status(401).json({ message: "Token invalide" });
  }
});

export default router;
