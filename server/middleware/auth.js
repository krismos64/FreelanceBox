import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mon_secret_super_securise";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.error("Token manquant");
      return res.status(401).json({ message: "Token manquant" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erreur d'authentification :", error.message);
    res.status(401).json({ message: "Token invalide" });
  }
};
