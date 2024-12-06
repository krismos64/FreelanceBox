import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '../ui/Card';
export const DashboardCard = ({ title, value, icon, trend }) => {
    return (_jsxs(Card, { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-gray-600 dark:text-gray-400 text-sm", children: title }), icon] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-2xl font-bold text-gray-800 dark:text-white", children: value }), _jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400 mt-2", children: trend })] })] }));
};
