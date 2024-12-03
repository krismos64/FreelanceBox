import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Récupérer tous les clients
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clients ORDER BY name');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Créer un nouveau client
router.post('/', async (req, res) => {
  const { name, email, phone, address, postalCode, city, siret } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO clients (name, email, phone, address, postal_code, city, siret) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, address, postalCode, city, siret]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour un client
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, postalCode, city, siret } = req.body;
  try {
    await pool.query(
      'UPDATE clients SET name = ?, email = ?, phone = ?, address = ?, postal_code = ?, city = ?, siret = ? WHERE id = ?',
      [name, email, phone, address, postalCode, city, siret, id]
    );
    res.json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Supprimer un client
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM clients WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;