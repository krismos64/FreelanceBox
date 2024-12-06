import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '../components/ui/Card';
import { useApp } from '../context/AppContext';
const Stats = () => {
    const { state } = useApp();
    // Nombre total de clients
    const totalClients = state.clients.length;
    // Chiffre d'affaires total (factures payées uniquement)
    const totalRevenue = state.documents
        .filter((doc) => doc.type === 'invoice' && doc.status === 'Payé')
        .reduce((sum, doc) => sum + doc.total, 0);
    // Chiffre d'affaires mensuel
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const monthlyRevenue = state.documents
        .filter((doc) => {
        const docDate = new Date(doc.date);
        return (doc.type === 'invoice' &&
            doc.status === 'Payé' &&
            docDate.getMonth() === currentMonth &&
            docDate.getFullYear() === currentYear);
    })
        .reduce((sum, doc) => sum + doc.total, 0);
    // Chiffre d'affaires annuel
    const yearlyRevenue = state.documents
        .filter((doc) => {
        const docDate = new Date(doc.date);
        return (doc.type === 'invoice' &&
            doc.status === 'Payé' &&
            docDate.getFullYear() === currentYear);
    })
        .reduce((sum, doc) => sum + doc.total, 0);
    return (_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800 mb-6", children: "Statistiques" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Nombre de clients" }), _jsx("p", { className: "text-3xl font-bold text-blue-600", children: totalClients })] }), _jsxs(Card, { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Chiffre d'affaires total" }), _jsxs("p", { className: "text-3xl font-bold text-green-600", children: [totalRevenue.toFixed(2), " \u20AC"] }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Total des factures pay\u00E9es" })] }), _jsxs(Card, { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Chiffre d'affaires mensuel" }), _jsxs("p", { className: "text-3xl font-bold text-purple-600", children: [monthlyRevenue.toFixed(2), " \u20AC"] }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) })] }), _jsxs(Card, { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Chiffre d'affaires annuel" }), _jsxs("p", { className: "text-3xl font-bold text-orange-600", children: [yearlyRevenue.toFixed(2), " \u20AC"] }), _jsxs("p", { className: "text-sm text-gray-500 mt-1", children: ["Ann\u00E9e ", currentYear] })] })] })] }));
};
export default Stats;
