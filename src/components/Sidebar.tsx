import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: HomeIcon, text: "Accueil" },
    { path: "/clients", icon: UserGroupIcon, text: "Clients" },
    { path: "/documents", icon: DocumentTextIcon, text: "Documents" },
    { path: "/planning", icon: CalendarIcon, text: "Planning" },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">FreelanceBox</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors ${
                    isActive ? "bg-gray-700" : ""
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span>{item.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
