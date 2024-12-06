import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token"); // Récupérer le token
  if (!token) {
    // Si le token est manquant, rediriger vers la page de connexion
    return <Navigate to="/login" />;
  }
  return children; // Afficher la page protégée si l'utilisateur est connecté
};

export default PrivateRoute;
