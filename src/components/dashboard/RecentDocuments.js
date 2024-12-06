import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '../ui/Card';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/dateUtils';
import { Link } from 'react-router-dom';
export const RecentDocuments = () => {
    const { state } = useApp();
    const recentDocs = state.documents
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);
    return (_jsxs(Card, { children: [_jsx("h2", { className: "text-lg font-semibold text-gray-800 dark:text-white mb-4", children: "Documents r\u00E9cents" }), _jsx("div", { className: "space-y-4", children: recentDocs.map((doc) => (_jsx(Link, { to: `/${doc.type === 'quote' ? 'quotes' : 'invoices'}/${doc.id}/edit`, className: "block hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors", children: _jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-800 dark:text-white", children: doc.number }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: doc.client.name })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "font-medium text-gray-800 dark:text-white", children: [doc.total.toFixed(2), " \u20AC"] }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: formatDate(doc.date) })] })] }) }, doc.id))) })] }));
};
