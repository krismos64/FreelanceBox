import express from "express";
import pool from "../config/database.js";

const router = express.Router();

// Récupérer les paramètres de l'entreprise
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM company_settings WHERE user_id = ? LIMIT 1",
      [req.user.id]
    );
    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Aucun paramètre de l'entreprise trouvé.",
      });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error("Erreur lors de la récupération des paramètres :", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des paramètres de l'entreprise.",
    });
  }
});

router.put("/", async (req, res) => {
  const { name, address, postalCode, city, phone, email, website, siret } =
    req.body;

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
    return res.status(400).json({
      success: false,
      message: "Tous les champs sont requis.",
    });
  }

  try {
    const [rows] = await pool.query(
      "SELECT id FROM company_settings WHERE user_id = ? LIMIT 1",
      [req.user.id]
    );

    if (rows.length === 0) {
      await pool.query(
        "INSERT INTO company_settings (user_id, name, address, postal_code, city, phone, email, website, siret) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          req.user.id,
          name,
          address,
          postalCode,
          city,
          phone,
          email,
          website,
          siret,
        ]
      );
    } else {
      await pool.query(
        "UPDATE company_settings SET name = ?, address = ?, postal_code = ?, city = ?, phone = ?, email = ?, website = ?, siret = ? WHERE id = ? AND user_id = ?",
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
          req.user.id,
        ]
      );
    }

    res.json({ success: true, message: "Paramètres mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour des paramètres :", error);
    res.status(500).json({
      success: false,
      message:
        "Une erreur est survenue lors de la mise à jour des paramètres de l'entreprise.",
    });
  }
});
export default router;
