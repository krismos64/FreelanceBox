import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Euro, FileText, CheckCircle } from 'lucide-react';
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { RecentDocuments } from '../components/dashboard/RecentDocuments';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { PageTransition } from '../components/PageTransition';
const Dashboard = () => {
    const { state } = useApp();
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
    const pendingQuotes = state.documents.filter((doc) => doc.type === 'quote' && doc.status === 'Envoyé').length;
    const paidInvoices = state.documents.filter((doc) => doc.type === 'invoice' && doc.status === 'Payé').length;
    const formattedDate = new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return (_jsx(PageTransition, { children: _jsxs("div", { className: "space-y-8", children: [_jsx("div", { className: "flex justify-between items-center", children: _jsx("h1", { className: "text-2xl font-bold text-gray-800 dark:text-white", children: "Tableau de bord" }) }), _jsx(Card, { children: _jsxs("p", { className: "text-lg text-gray-800 dark:text-gray-200", children: ["Bonjour, nous sommes le ", formattedDate, ".", _jsx("br", {}), "Votre chiffre d'affaires du mois est de ", monthlyRevenue.toFixed(2), " \u20AC."] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(DashboardCard, { title: "Chiffre d'affaires mensuel", value: `${monthlyRevenue.toFixed(2)} €`, icon: _jsx(Euro, { className: "text-green-500", size: 24 }), trend: "Ce mois" }), _jsx(DashboardCard, { title: "Devis en attente", value: pendingQuotes.toString(), icon: _jsx(FileText, { className: "text-blue-500", size: 24 }), trend: "En attente de r\u00E9ponse" }), _jsx(DashboardCard, { title: "Factures pay\u00E9es", value: paidInvoices.toString(), icon: _jsx(CheckCircle, { className: "text-green-500", size: 24 }), trend: "Total" })] }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: _jsx(RecentDocuments, {}) })] }) }));
};
export default Dashboard;
