import express from "express";
import pool from "../config/database.js";

const router = express.Router();

// Récupérer les paramètres de l'entreprise
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM company_settings LIMIT 1");
    res.json(rows[0] || {});
  } catch (error) {
    console.error("Erreur lors de la récupération des paramètres :", error);
    res
      .status(500)
      .json({
        message:
          "Erreur lors de la récupération des paramètres de l'entreprise.",
      });
  }
});

// Mettre à jour les paramètres de l'entreprise
router.put("/", async (req, res) => {
  const { name, address, postalCode, city, phone, email, website, siret } =
    req.body;

  // Validation des données
  if (
    !name ||
    !address ||
    !postalCode ||
    !city ||
    !phone ||
    !email ||
    !website ||
    !siret
  ) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const [rows] = await pool.query("SELECT id FROM company_settings LIMIT 1");

    if (rows.length === 0) {
      // Insérer si aucun paramètre n'existe
      console.log("Insertion des paramètres de l'entreprise :", req.body);
      await pool.query(
        "INSERT INTO company_settings (name, address, postal_code, city, phone, email, website, siret) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [name, address, postalCode, city, phone, email, website, siret]
      );
    } else {
      // Mettre à jour les paramètres existants
      console.log("Mise à jour des paramètres de l'entreprise :", req.body);
      await pool.query(
        "UPDATE company_settings SET name = ?, address = ?, postal_code = ?, city = ?, phone = ?, email = ?, website = ?, siret = ? WHERE id = ?",
        [
          name,
          address,
          postalCode,
          city,
          phone,
          email,
          website,
          siret,
          rows[0].id,
        ]
      );
    }

    res.json(req.body);
  } catch (error) {
    console.error("Erreur lors de la mise à jour des paramètres :", error);
    res
      .status(500)
      .json({
        message:
          "Une erreur est survenue lors de la mise à jour des paramètres de l'entreprise.",
      });
  }
});

export default router;
