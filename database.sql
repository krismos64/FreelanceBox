CREATE DATABASE IF NOT EXISTS gestion_entreprise;
USE gestion_entreprise;

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création d'un utilisateur par défaut
-- Le mot de passe 'Mostefaoui1' est hashé avec bcrypt
INSERT INTO users (id, name, email, password) VALUES (
  'e97e7d6c-8ab4-4d7f-b01d-f2c1a9c6d9b8',
  'Christophe Mostefaoui',
  'christophe.mostefaoui.dev@gmail.com',
  '$2a$10$8XpBmMqz7l.ygB0ysXkPZu4YnhHxGZK2PH8tgL3VQNYtJUNV.ZXES'
);

CREATE TABLE IF NOT EXISTS clients (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  postal_code VARCHAR(10),
  city VARCHAR(100),
  siret VARCHAR(14),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS documents (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  type ENUM('quote', 'invoice') NOT NULL,
  number VARCHAR(20) NOT NULL,
  date DATE NOT NULL,
  valid_until DATE,
  client_id VARCHAR(36) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  notes TEXT,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE IF NOT EXISTS document_items (
  id VARCHAR(36) PRIMARY KEY,
  document_id VARCHAR(36) NOT NULL,
  description TEXT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS company_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(36) NOT NULL,
  name VARCHAR(255),
  address TEXT,
  postal_code VARCHAR(10),
  city VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  siret VARCHAR(14),
  logo TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);