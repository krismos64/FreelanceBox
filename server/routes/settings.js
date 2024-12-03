import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Récupérer les paramètres de l'entreprise
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM company_settings LIMIT 1');
    res.json(rows[0] || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour les paramètres de l'entreprise
router.put('/', async (req, res) => {
  const { name, address, postalCode, city, phone, email, website, siret } = req.body;
  
  try {
    const [rows] = await pool.query('SELECT id FROM company_settings LIMIT 1');
    
    if (rows.length === 0) {
      // Insérer si aucun paramètre n'existe
      await pool.query(
        'INSERT INTO company_settings (name, address, postal_code, city, phone, email, website, siret) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, address, postalCode, city, phone, email, website, siret]
      );
    } else {
      // Mettre à jour les paramètres existants
      await pool.query(
        'UPDATE company_settings SET name = ?, address = ?, postal_code = ?, city = ?, phone = ?, email = ?, website = ?, siret = ? WHERE id = ?',
        [name, address, postalCode, city, phone, email, website, siret, rows[0].id]
      );
    }
    
    res.json(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;