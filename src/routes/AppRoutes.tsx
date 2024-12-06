import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthManager } from "../hooks/useAuthManager";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import OnboardingPage from "../pages/OnboardingPage";
import Dashboard from "../pages/Dashboard";
import QuoteList from "../pages/QuoteList";
import InvoiceList from "../pages/InvoiceList";
import ClientList from "../pages/ClientList";
import Stats from "../pages/Stats";
import ChecklistPage from "../pages/ChecklistPage";
import CompanyPage from "../pages/CompanyPage";
import CreateDocument from "../pages/CreateDocument";
import EditDocument from "../pages/EditDocument";
import Planning from "../components/Planning";
import Layout from "../components/Layout";

export const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthManager();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Chargement...</p>
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
