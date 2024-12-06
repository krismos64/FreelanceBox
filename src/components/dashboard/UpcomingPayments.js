import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "../ui/Card";
import { useApp } from "../../context/AppContext";
import { formatDate } from "../../utils/dateUtils";
export const UpcomingPayments = () => {
    const { state } = useApp();
    const upcomingPayments = state.documents
        .filter((doc) => doc.type === "invoice" &&
        doc.status !== "Payé" &&
        doc.dueDate &&
        new Date(doc.dueDate) > new Date())
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
        .slice(0, 5);
    return (_jsxs(Card, { children: [_jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-4", children: "Paiements \u00E0 venir" }), _jsx("div", { className: "space-y-4", children: upcomingPayments.map((doc) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-800", children: doc.number }), _jsx("p", { className: "text-sm text-gray-500", children: doc.client.name })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "font-medium", children: [doc.total.toFixed(2), " \u20AC"] }), _jsxs("p", { className: "text-sm text-gray-500", children: ["\u00C9ch\u00E9ance : ", formatDate(doc.dueDate)] })] })] }, doc.id))) })] }));
};
