const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const { app } = require('electron');

class DatabaseManager {
  constructor() {
    const userDataPath = app.getPath('userData');
    const dbPath = path.join(userDataPath, 'freelancebox.db');
    
    this.db = new Database(dbPath);
    this.initDatabase();
  }

  initDatabase() {
    const schema = fs.readFileSync(path.join(__dirname, '../database.sql'), 'utf8');
    const statements = schema.split(';').filter(stmt => stmt.trim());
    
    this.db.exec('PRAGMA foreign_keys = ON');
    
    statements.forEach(statement => {
      if (statement.trim()) {
        this.db.exec(statement);
      }
    });
  }

  // Méthodes pour les clients
  getClients() {
    return this.db.prepare('SELECT * FROM clients ORDER BY name').all();
  }

  addClient(client) {
    const stmt = this.db.prepare(`
      INSERT INTO clients (id, name, email, phone, address, postal_code, city, siret)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(client.id, client.name, client.email, client.phone, 
                    client.address, client.postalCode, client.city, client.siret);
  }

  // Méthodes pour les documents
  getDocuments() {
    return this.db.prepare(`
      SELECT d.*, c.* FROM documents d
      JOIN clients c ON d.client_id = c.id
      ORDER BY d.date DESC
    `).all();
  }

  addDocument(document) {
    const stmt = this.db.prepare(`
      INSERT INTO documents (id, type, number, date, valid_until, client_id, subtotal, total, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(document.id, document.type, document.number, document.date,
                    document.validUntil, document.client.id, document.subtotal,
                    document.total, document.notes, document.status);
  }

  // Méthodes pour les paramètres de l'entreprise
  getCompanySettings() {
    return this.db.prepare('SELECT * FROM company_settings LIMIT 1').get();
  }

  updateCompanySettings(settings) {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO company_settings 
      (id, name, address, postal_code, city, phone, email, website, siret)
      VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(settings.name, settings.address, settings.postalCode,
                    settings.city, settings.phone, settings.email,
                    settings.website, settings.siret);
  }
}

module.exports = new DatabaseManager();