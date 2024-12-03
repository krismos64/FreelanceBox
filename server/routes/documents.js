import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Récupérer tous les documents
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT d.*, c.* 
      FROM documents d 
      JOIN clients c ON d.client_id = c.id 
      ORDER BY d.date DESC
    `);
    
    const [items] = await pool.query('SELECT * FROM document_items');
    
    const documents = rows.map(doc => ({
      ...doc,
      client: {
        id: doc.client_id,
        name: doc.name,
        email: doc.email,
        phone: doc.phone,
        address: doc.address,
        postalCode: doc.postal_code,
        city: doc.city,
        siret: doc.siret
      },
      items: items.filter(item => item.document_id === doc.id).map(item => ({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        total: item.total
      }))
    }));

    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Créer un nouveau document
router.post('/', async (req, res) => {
  const { type, number, date, validUntil, client, items, subtotal, total, notes, status } = req.body;
  
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Insérer le document
      const [docResult] = await connection.query(
        'INSERT INTO documents (id, type, number, date, valid_until, client_id, subtotal, total, notes, status) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [type, number, date, validUntil, client.id, subtotal, total, notes, status]
      );

      const documentId = docResult.insertId;

      // Insérer les items
      for (const item of items) {
        await connection.query(
          'INSERT INTO document_items (id, document_id, description, quantity, unit_price, total) VALUES (UUID(), ?, ?, ?, ?, ?)',
          [documentId, item.description, item.quantity, item.unitPrice, item.total]
        );
      }

      await connection.commit();
      res.status(201).json({ id: documentId, ...req.body });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour un document
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { date, validUntil, client, items, subtotal, total, notes, status } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Mettre à jour le document
      await connection.query(
        'UPDATE documents SET date = ?, valid_until = ?, client_id = ?, subtotal = ?, total = ?, notes = ?, status = ? WHERE id = ?',
        [date, validUntil, client.id, subtotal, total, notes, status, id]
      );

      // Supprimer les anciens items
      await connection.query('DELETE FROM document_items WHERE document_id = ?', [id]);

      // Insérer les nouveaux items
      for (const item of items) {
        await connection.query(
          'INSERT INTO document_items (id, document_id, description, quantity, unit_price, total) VALUES (UUID(), ?, ?, ?, ?, ?)',
          [id, item.description, item.quantity, item.unitPrice, item.total]
        );
      }

      await connection.commit();
      res.json({ id, ...req.body });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Supprimer un document
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM documents WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;