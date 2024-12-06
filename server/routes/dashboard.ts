import * as express from "express";
import { authMiddleware } from "../middleware/auth"; // Middleware pour protéger les routes
import { DashboardService } from "../services/DashboardService";

const router = express.Router();

// Route pour récupérer les données du tableau de bord
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Remplacez par votre logique métier
    const dashboardData = await DashboardService.getDashboardData(
      req.user.userId
    );

    res.json(dashboardData);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données du tableau de bord :",
      error
    );
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// Ajoutez d'autres routes spécifiques au tableau de bord si nécessaire

export default router;
