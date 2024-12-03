import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import Layout from "./components/Layout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Dashboard from "./pages/Dashboard";
import QuoteList from "./pages/QuoteList";
import InvoiceList from "./pages/InvoiceList";
import ClientList from "./pages/ClientList";
import Stats from "./pages/Stats";
import ChecklistPage from "./pages/ChecklistPage";
import CompanyPage from "./pages/CompanyPage";
import CreateDocument from "./pages/CreateDocument";
import EditDocument from "./pages/EditDocument";
import { AppProvider } from "./context/AppContext";
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

function App() {
  const [showSplash, setShowSplash] = useState(true);
  useNavigationSound();

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route
                  element={
                    <PrivateRoute>
                      <Layout />
                    </PrivateRoute>
                  }
                >
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/quotes" element={<QuoteList />} />
                  <Route
                    path="/quotes/new"
                    element={<CreateDocument type="quote" />}
                  />
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
              </Routes>
              <Toaster position="top-right" />
            </Router>
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
