import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import OnboardingPage from "./pages/OnboardingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/Dashboard"; // Exemple pour ajouter une page Dashboard

const App: React.FC = () => {
  // Simuler un état utilisateur connecté
  const isAuthenticated = false; // Changez cette valeur pour simuler l'état

  return (
    <Router>
      <Routes>
        {/* Route principale */}
        <Route path="/" element={<OnboardingPage />} />

        {/* Authentification */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Exemple d'une route protégée */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <DashboardPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
