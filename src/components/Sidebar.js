import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import { HomeIcon, DocumentTextIcon, UserGroupIcon, CalendarIcon, } from "@heroicons/react/24/outline";
const Sidebar = () => {
    const location = useLocation();
    const menuItems = [
        { path: "/", icon: HomeIcon, text: "Accueil" },
        { path: "/clients", icon: UserGroupIcon, text: "Clients" },
        { path: "/documents", icon: DocumentTextIcon, text: "Documents" },
        { path: "/planning", icon: CalendarIcon, text: "Planning" },
    ];
    return (_jsxs("div", { className: "bg-gray-800 text-white w-64 min-h-screen p-4", children: [_jsx("div", { className: "mb-8", children: _jsx("h1", { className: "text-2xl font-bold", children: "FreelanceBox" }) }), _jsx("nav", { children: _jsx("ul", { className: "space-y-2", children: menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (_jsx("li", { children: _jsxs(Link, { to: item.path, className: `flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors ${isActive ? "bg-gray-700" : ""}`, children: [_jsx(Icon, { className: "h-6 w-6" }), _jsx("span", { children: item.text })] }) }, item.path));
                    }) }) })] }));
};
export default Sidebar;
