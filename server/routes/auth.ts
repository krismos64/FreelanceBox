import * as express from "express";
import * as jwt from "jsonwebtoken";
import { UserModel } from "../models/User";
import { loginSchema, registerSchema } from "../../src/types/auth";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

router.post("/register", async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);

    const existingUser = await UserModel.findByEmail(data.email);
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    const user = await UserModel.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    res.status(201).json({ message: "Compte créé avec succès", user });
  } catch (error) {
    res.status(400).json({ message: "Données invalides", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await UserModel.findByEmail(data.email);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    const isValid = await UserModel.verifyPassword(
      user.password,
      data.password
    );
    if (!isValid) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Ne pas extraire `password` si non utilisé
    const { password: _, ...userWithoutPassword } = user;
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(400).json({ message: "Données invalides", error });
  }
});

router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
});

export default router;
