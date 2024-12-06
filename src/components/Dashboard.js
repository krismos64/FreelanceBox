import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Euro, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { DashboardCard } from "./dashboard/DashboardCard";
import { RecentDocuments } from "./dashboard/RecentDocuments";
import { UpcomingPayments } from "./dashboard/UpcomingPayments";
import { useApp } from "../context/AppContext";
const Dashboard = () => {
    const { state } = useApp();
    const totalRevenue = state.documents
        .filter((doc) => doc.type === "invoice" && doc.status === "Payé")
        .reduce((sum, doc) => sum + doc.total, 0);
    const pendingQuotes = state.documents.filter((doc) => doc.type === "quote" && doc.status === "Envoyé").length;
    const paidInvoices = state.documents.filter((doc) => doc.type === "invoice" && doc.status === "Payé").length;
    const latePayments = state.documents.filter((doc) => doc.type === "invoice" &&
        doc.status !== "Payé" &&
        doc.dueDate &&
        new Date(doc.dueDate) < new Date()).length;
    return (_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800 mb-6", children: "Tableau de bord" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [_jsx(DashboardCard, { title: "Chiffre d'affaires", value: `${totalRevenue.toFixed(2)} €`, icon: _jsx(Euro, { className: "text-green-500" }), trend: "Ce mois" }), _jsx(DashboardCard, { title: "Devis en attente", value: pendingQuotes.toString(), icon: _jsx(FileText, { className: "text-blue-500" }), trend: "En attente de r\u00E9ponse" }), _jsx(DashboardCard, { title: "Factures pay\u00E9es", value: paidInvoices.toString(), icon: _jsx(CheckCircle, { className: "text-green-500" }), trend: "Total" }), _jsx(DashboardCard, { title: "Paiements en retard", value: latePayments.toString(), icon: _jsx(AlertCircle, { className: "text-red-500" }), trend: "\u00C0 relancer" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx(RecentDocuments, {}), _jsx(UpcomingPayments, {})] })] }));
};
export default Dashboard;
