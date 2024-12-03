# Gestion Entreprise

Application de gestion pour auto-entrepreneurs permettant de gérer les devis, factures et clients.

## Installation

1. Cloner le projet :
```bash
git clone <votre-repo>
cd gestion-entreprise
```

2. Installer les dépendances :
```bash
npm install
```

3. Configuration de la base de données :
- Créer une base de données MySQL nommée `gestion_entreprise`
- Importer le fichier `database.sql` pour créer les tables
- Configurer les variables d'environnement dans le fichier `.env` :
  ```
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=root
  DB_NAME=gestion_entreprise
  PORT=3000
  ```

4. Démarrer l'application :
```bash
npm start
```

L'application sera accessible à l'adresse : http://localhost:5173

## Fonctionnalités

- Gestion des devis et factures
- Gestion des clients
- Génération de PDF
- Tableau de bord avec statistiques
- Checklist des tâches