import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext";
import { AppProvider } from "./context/AppContext";
import { useAuthManager } from "./hooks/useAuthManager";

// Importation des composants
import Layout from "./components/Layout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import OnboardingPage from "./pages/OnboardingPage";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthManager();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Chargement...
      </div>
    );
  }

  return (
    <>
      {/* Navigation dynamique */}
      <header>
        <nav className="flex justify-between p-4 bg-gray-100">
          <Link to="/" className="font-bold">
            FreelanceBox
          </Link>
          <div>
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="mx-2">
                  Se connecter
                </Link>
                <Link to="/register" className="mx-2">
                  S'inscrire
                </Link>
              </>
            ) : (
              <Link to="/dashboard" className="mx-2">
                Mon Espace
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Déclaration des routes */}
      <Routes>
        <Route path="/" element={<OnboardingPage />} />

        {/* Routes publiques */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <RegisterPage />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Routes protégées */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Route de secours */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppProvider>
            <AppRoutes />
            <Toaster position="top-right" />
          </AppProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
