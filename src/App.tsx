import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import QuoteList from "./pages/QuoteList";
import InvoiceList from "./pages/InvoiceList";
import ClientList from "./pages/ClientList";
import Stats from "./pages/Stats";
import ChecklistPage from "./pages/ChecklistPage";
import CompanyPage from "./pages/CompanyPage";
import CreateDocument from "./pages/CreateDocument";
import EditDocument from "./pages/EditDocument";
import Planning from "./components/Planning";
import SplashScreen from "./components/SplashScreen";
import { useNavigationSound } from "./utils/sound";

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
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

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
      <Route
        path="/onboarding"
        element={
          !isAuthenticated ? (
            <OnboardingPage />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />

      {/* Routes protégées */}
      {isAuthenticated && (
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/quotes" element={<QuoteList />} />
          <Route path="/quotes/new" element={<CreateDocument type="quote" />} />
          <Route
            path="/quotes/:id/edit"
            element={<EditDocument type="quote" />}
          />
          <Route path="/invoices" element={<InvoiceList />} />
          <Route
            path="/invoices/new"
            element={<CreateDocument type="invoice" />}
          />
          <Route
            path="/invoices/:id/edit"
            element={<EditDocument type="invoice" />}
          />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/checklist" element={<ChecklistPage />} />
          <Route path="/company" element={<CompanyPage />} />
        </Route>
      )}

      {/* Route de secours */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  useNavigationSound();

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

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
