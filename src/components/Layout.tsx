import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutGrid, FileText, Users, BarChart3, CheckSquare, Building2, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { useAuthService } from '../hooks/useAuth';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
            <motion.img 
              src="/logo.png" 
              alt="FreelanceBox" 
              className="w-10 h-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 text-transparent bg-clip-text">
              FreelanceBox
            </h1>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex flex-col h-full justify-between">
          <nav className="space-y-2">
            <NavItem icon={<LayoutGrid />} text="Tableau de bord" to="/" />
            <NavItem icon={<FileText />} text="Devis" to="/quotes" />
            <NavItem icon={<FileText />} text="Factures" to="/invoices" />
            <NavItem icon={<Users />} text="Clients" to="/clients" />
            <NavItem icon={<BarChart3 />} text="Statistiques" to="/stats" />
            <NavItem icon={<CheckSquare />} text="Checklist" to="/checklist" />
            <NavItem icon={<Building2 />} text="Mon entreprise" to="/company" />
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connecté en tant que
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {authState.user?.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {authState.user?.email}
              </p>
            </div>
            <Button
              variant="secondary"
              className="w-full mt-2"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </motion.aside>

      <main className="main-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
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
        className={`nav-item ${isActive ? 'active' : ''}`}
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