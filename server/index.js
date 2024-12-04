import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import clientsRoutes from "./routes/clients.js";
import documentsRoutes from "./routes/documents.js";
import settingsRoutes from "./routes/settings.js";
import { authMiddleware } from "./middleware/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configuration CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// Middleware pour parser le JSON
app.use(express.json({ limit: "10mb" }));

// Routes publiques
app.use("/api/auth", authRoutes);

// Routes protégées
app.use("/api/clients", authMiddleware, clientsRoutes);
app.use("/api/documents", authMiddleware, documentsRoutes);
app.use("/api/settings", authMiddleware, settingsRoutes);
app.use("/api/events", require("./routes/events"));

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Une erreur est survenue sur le serveur" });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
