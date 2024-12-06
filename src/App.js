import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/auth/PrivateRoute";
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
const App = () => {
    const [showSplash, setShowSplash] = useState(true);
    const isAuthenticated = false; // Exemple d'état utilisateur connecté
    useNavigationSound();
    if (showSplash) {
        return _jsx(SplashScreen, { onComplete: () => setShowSplash(false) });
    }
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(ThemeProvider, { children: _jsx(AuthProvider, { children: _jsx(AppProvider, { children: _jsxs(Router, { children: [_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: isAuthenticated ? (_jsx(Navigate, { to: "/dashboard" })) : (_jsx(OnboardingPage, {})) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsxs(Route, { element: _jsx(PrivateRoute, { children: _jsx(Layout, {}) }), children: [_jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/planning", element: _jsx(Planning, {}) }), _jsx(Route, { path: "/quotes", element: _jsx(QuoteList, {}) }), _jsx(Route, { path: "/quotes/new", element: _jsx(CreateDocument, { type: "quote" }) }), _jsx(Route, { path: "/quotes/:id/edit", element: _jsx(EditDocument, { type: "quote" }) }), _jsx(Route, { path: "/invoices", element: _jsx(InvoiceList, {}) }), _jsx(Route, { path: "/invoices/new", element: _jsx(CreateDocument, { type: "invoice" }) }), _jsx(Route, { path: "/invoices/:id/edit", element: _jsx(EditDocument, { type: "invoice" }) }), _jsx(Route, { path: "/clients", element: _jsx(ClientList, {}) }), _jsx(Route, { path: "/stats", element: _jsx(Stats, {}) }), _jsx(Route, { path: "/checklist", element: _jsx(ChecklistPage, {}) }), _jsx(Route, { path: "/company", element: _jsx(CompanyPage, {}) })] }), _jsx(Route, { path: "*", element: _jsx("div", { children: "404 Page Not Found" }) })] }), _jsx(Toaster, { position: "top-right" })] }) }) }) }) }));
};
export default App;
