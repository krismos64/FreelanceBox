import express from "express";
import mysql from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Configuration de la connexion MySQL
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "gestion_entreprise",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Middleware pour valider les champs nécessaires
const validateEvent = (req, res, next) => {
  const { title, start, end } = req.body;

  if (!title || !start || !end) {
    return res.status(400).json({
      message: "Les champs 'title', 'start' et 'end' sont obligatoires.",
    });
  }

  if (new Date(start) >= new Date(end)) {
    return res
      .status(400)
      .json({ message: "La date de début doit être avant la date de fin." });
  }

  next();
};

// Récupérer tous les événements
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM events ORDER BY start ASC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des événements:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des événements.",
    });
  }
});

// Créer un nouvel événement
router.post("/", validateEvent, async (req, res) => {
  const { title, start, end, description } = req.body;
  const id = uuidv4();

  try {
    await pool.execute(
      "INSERT INTO events (id, title, start, end, description) VALUES (?, ?, ?, ?, ?)",
      [id, title, start, end, description]
    );
    res.status(201).json({ message: "Événement créé avec succès", id });
  } catch (error) {
    console.error("Erreur lors de la création de l'événement:", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la création de l'événement." });
  }
});

// Mettre à jour un événement
router.put("/:id", validateEvent, async (req, res) => {
  const { id } = req.params;
  const { title, start, end, description } = req.body;

  try {
    const [existingEvent] = await pool.execute(
      "SELECT * FROM events WHERE id = ?",
      [id]
    );
    if (existingEvent.length === 0) {
      return res.status(404).json({ message: "Événement non trouvé." });
    }

    await pool.execute(
      "UPDATE events SET title = ?, start = ?, end = ?, description = ? WHERE id = ?",
      [title, start, end, description, id]
    );
    res.json({ message: "Événement mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'événement:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la mise à jour de l'événement.",
    });
  }
});

// Supprimer un événement
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [existingEvent] = await pool.execute(
      "SELECT * FROM events WHERE id = ?",
      [id]
    );
    if (existingEvent.length === 0) {
      return res.status(404).json({ message: "Événement non trouvé." });
    }

    await pool.execute("DELETE FROM events WHERE id = ?", [id]);
    res.json({ message: "Événement supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'événement:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la suppression de l'événement.",
    });
  }
});

export default router;
