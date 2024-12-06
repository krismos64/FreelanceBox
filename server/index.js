import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import clientsRoutes from "./routes/clients.js";
import documentsRoutes from "./routes/documents.js";
import settingsRoutes from "./routes/settings.js";
import eventsRoutes from "./routes/events.js";
import { authMiddleware } from "./middleware/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration de CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);

// Parsing JSON avec une taille limite
app.use(express.json({ limit: "10mb" }));

// Routes protégées et non protégées
app.use("/api/auth", authRoutes);
app.use("/api/clients", authMiddleware, clientsRoutes);
app.use("/api/documents", authMiddleware, documentsRoutes);
app.use("/api/settings", authMiddleware, settingsRoutes);
app.use("/api/events", authMiddleware, eventsRoutes);

// Route de test protégée
app.get("/protected-route", authMiddleware, (req, res) => {
  res.json({
    message: "Bienvenue sur la route protégée !",
    user: req.user, // Informations du token décodé
  });
});

// Un seul appel à listen
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
