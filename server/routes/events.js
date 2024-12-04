const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const { v4: uuidv4 } = require("uuid");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "freelancebox",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Récupérer tous les événements
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM events");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Créer un nouvel événement
router.post("/", async (req, res) => {
  const { title, start, end, description } = req.body;
  const id = uuidv4();

  try {
    await pool.execute(
      "INSERT INTO events (id, title, start, end, description) VALUES (?, ?, ?, ?, ?)",
      [id, title, start, end, description]
    );
    res.status(201).json({ message: "Événement créé avec succès", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Mettre à jour un événement
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, start, end, description } = req.body;

  try {
    await pool.execute(
      "UPDATE events SET title = ?, start = ?, end = ?, description = ? WHERE id = ?",
      [title, start, end, description, id]
    );
    res.json({ message: "Événement mis à jour avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Supprimer un événement
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.execute("DELETE FROM events WHERE id = ?", [id]);
    res.json({ message: "Événement supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
