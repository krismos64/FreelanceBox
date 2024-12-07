import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  Users,
  BarChart3,
  CheckSquare,
  Building2,
  LogOut,
  User,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useAuthService } from "../hooks/useAuth";
import { useAuth } from "../context/AuthContext";

const Layout: React.FC = () => {
  const { handleLogout } = useAuthService();
  const { user } = useAuth(); // Utilisation directe de l'utilisateur connecté

  return (
    <div className="layout-container flex">
      {/* Sidebar */}
      <motion.aside
        className="sidebar w-64 bg-white dark:bg-gray-900 h-screen p-4 shadow-lg"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 text-transparent bg-clip-text">
            FreelanceBox
          </h1>
          <ThemeToggle />
        </div>

        {/* Navigation */}
        <div className="flex flex-col h-full justify-between">
          <nav className="space-y-2">
            <NavItem icon={<LayoutGrid />} text="Tableau de bord" to="/" />
            <NavItem icon={<Calendar />} text="Planning" to="/planning" />
            <NavItem icon={<Users />} text="Clients" to="/clients" />
            <NavItem icon={<FileText />} text="Devis" to="/quotes" />
            <NavItem icon={<FileText />} text="Factures" to="/invoices" />
            <NavItem icon={<BarChart3 />} text="Statistiques" to="/stats" />
            <NavItem icon={<CheckSquare />} text="Checklist" to="/checklist" />
            <NavItem icon={<Building2 />} text="Mon entreprise" to="/company" />
          </nav>

          {/* User Info & Logout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-auto pt-4"
          >
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg p-4 border border-primary-200 dark:border-primary-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user?.name || "Invité"}{" "}
                    {/* Affiche "Invité" si l'utilisateur est null */}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email || "Pas d'adresse email"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-300 bg-white dark:bg-gray-800 rounded-md hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <LogOut size={16} />
                Déconnexion
              </button>
            </div>
          </motion.div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="main-content flex-1 bg-gray-50 dark:bg-gray-800 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="group">
      <motion.div
        className={`nav-item flex items-center gap-4 px-4 py-2 rounded-md transition-colors ${
          isActive
            ? "bg-primary-500 text-white"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        }`}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="nav-item-icon w-6 h-6">{icon}</span>
        <span className="font-medium">{text}</span>
      </motion.div>
    </Link>
  );
};

export default Layout;
