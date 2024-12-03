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
} from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useAuthService } from "../hooks/useAuth";
import { useAuth } from "../context/AuthContext";

const Layout: React.FC = () => {
  const { handleLogout } = useAuthService();
  const { state: authState } = useAuth();

  return (
    <div className="layout-container">
      <motion.aside
        className="sidebar"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 text-transparent bg-clip-text">
              FreelanceBox
            </h1>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex flex-col h-[calc(100vh-6rem)] justify-between">
          <nav className="space-y-2">
            <NavItem icon={<LayoutGrid />} text="Tableau de bord" to="/" />
            <NavItem icon={<FileText />} text="Devis" to="/quotes" />
            <NavItem icon={<FileText />} text="Factures" to="/invoices" />
            <NavItem icon={<Users />} text="Clients" to="/clients" />
            <NavItem icon={<BarChart3 />} text="Statistiques" to="/stats" />
            <NavItem icon={<CheckSquare />} text="Checklist" to="/checklist" />
            <NavItem icon={<Building2 />} text="Mon entreprise" to="/company" />
          </nav>

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
                    {authState.user?.name}
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

      <main className="main-content">
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
        className={`nav-item ${isActive ? "active" : ""}`}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="nav-item-icon">{icon}</span>
        <span>{text}</span>
      </motion.div>
    </Link>
  );
};

export default Layout;
