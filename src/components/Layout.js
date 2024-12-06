import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutGrid, FileText, Users, BarChart3, CheckSquare, Building2, LogOut, User, Calendar, } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useAuthService } from "../hooks/useAuth";
import { useAuth } from "../context/AuthContext";
const Layout = () => {
    const { handleLogout } = useAuthService();
    const { state: authState } = useAuth();
    return (_jsxs("div", { className: "layout-container", children: [_jsxs(motion.aside, { className: "sidebar", initial: { x: -20, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { duration: 0.3 }, children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("div", { className: "flex items-center gap-3", children: _jsx("h1", { className: "text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 text-transparent bg-clip-text", children: "FreelanceBox" }) }), _jsx(ThemeToggle, {})] }), _jsxs("div", { className: "flex flex-col h-[calc(100vh-6rem)] justify-between", children: [_jsxs("nav", { className: "space-y-2", children: [_jsx(NavItem, { icon: _jsx(LayoutGrid, {}), text: "Tableau de bord", to: "/" }), _jsx(NavItem, { icon: _jsx(Calendar, {}), text: "Planning", to: "/planning" }), _jsx(NavItem, { icon: _jsx(Users, {}), text: "Clients", to: "/clients" }), _jsx(NavItem, { icon: _jsx(FileText, {}), text: "Devis", to: "/quotes" }), _jsx(NavItem, { icon: _jsx(FileText, {}), text: "Factures", to: "/invoices" }), _jsx(NavItem, { icon: _jsx(BarChart3, {}), text: "Statistiques", to: "/stats" }), _jsx(NavItem, { icon: _jsx(CheckSquare, {}), text: "Checklist", to: "/checklist" }), _jsx(NavItem, { icon: _jsx(Building2, {}), text: "Mon entreprise", to: "/company" })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mt-auto pt-4", children: _jsxs("div", { className: "bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg p-4 border border-primary-200 dark:border-primary-800", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center", children: _jsx(User, { className: "w-5 h-5 text-white" }) }), _jsx("div", { children: _jsx("p", { className: "font-medium text-gray-900 dark:text-white", children: authState.user?.name }) })] }), _jsxs("button", { onClick: handleLogout, className: "w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-300 bg-white dark:bg-gray-800 rounded-md hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors duration-200", children: [_jsx(LogOut, { size: 16 }), "D\u00E9connexion"] })] }) })] })] }), _jsx("main", { className: "main-content", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, children: _jsx(Outlet, {}) }) })] }));
};
const NavItem = ({ icon, text, to }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (_jsx(Link, { to: to, className: "group", children: _jsxs(motion.div, { className: `nav-item ${isActive ? "active" : ""}`, whileHover: { x: 4 }, whileTap: { scale: 0.98 }, children: [_jsx("span", { className: "nav-item-icon", children: icon }), _jsx("span", { children: text })] }) }));
};
export default Layout;
