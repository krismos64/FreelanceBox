import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

async function testDatabaseConnection() {
  try {
    // Test de la connexion à la base de données
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("✅ Connexion à MySQL réussie");

    // Vérifier si la base de données existe
    const [databases] = await connection.query("SHOW DATABASES");
    const dbExists = databases.some(
      (db) => db.Database === process.env.DB_NAME
    );
    console.log(
      `Base de données '${process.env.DB_NAME}': ${
        dbExists ? "✅ existe" : "❌ n'existe pas"
      }`
    );

    if (dbExists) {
      // Vérifier les tables
      const [tables] = await connection.query("SHOW TABLES");
      console.log("\nTables dans la base de données:");
      tables.forEach((table) => {
        console.log(`- ${Object.values(table)[0]}`);
      });
    }

    await connection.end();
    return true;
  } catch (error) {
    console.error(
      "❌ Erreur de connexion à la base de données:",
      error.message
    );
    if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.log("→ Vérifiez vos identifiants MySQL dans le fichier .env");
    }
    return false;
  }
}

// Test du serveur Express
app.get("/test", (req, res) => {
  res.json({ message: "Le serveur fonctionne correctement" });
});

async function startServer() {
  // Tester d'abord la connexion à la base de données
  const dbConnected = await testDatabaseConnection();

  if (dbConnected) {
    // Vérifier si le port est disponible
    app
      .listen(port, () => {
        console.log(`\n✅ Serveur démarré sur le port ${port}`);
        console.log(`→ Test du serveur: http://localhost:${port}/test`);
      })
      .on("error", (err) => {
        if (err.code === "EADDRINUSE") {
          console.error(`❌ Le port ${port} est déjà utilisé`);
          console.log("→ Vérifiez qu'aucun autre service n'utilise ce port");
        } else {
          console.error("❌ Erreur lors du démarrage du serveur:", err.message);
        }
      });
  }
}

startServer();
