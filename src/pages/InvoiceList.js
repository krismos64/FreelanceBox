import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { DocumentFilters } from '../components/documents/DocumentFilters';
import { StatusBadge } from '../components/documents/StatusBadge';
import { DocumentActions } from '../components/documents/DocumentActions';
import { DocumentPreview } from '../components/documents/DocumentPreview';
import { useApp } from '../context/AppContext';
import { formatDate } from '../utils/dateUtils';
const InvoiceList = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useApp();
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [dateSort, setDateSort] = useState('desc');
    const [previewDocument, setPreviewDocument] = useState(null);
    const invoices = state.documents
        .filter((doc) => doc.type === 'invoice')
        .filter((doc) => statusFilter === 'all' || doc.status === statusFilter)
        .filter((doc) => doc.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.client.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateSort === 'asc' ? dateA - dateB : dateB - dateA;
    });
    const handleStatusChange = (documentId, newStatus) => {
        const document = state.documents.find((doc) => doc.id === documentId);
        if (document) {
            dispatch({
                type: 'UPDATE_DOCUMENT',
                payload: { ...document, status: newStatus },
            });
        }
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Factures" }), _jsxs(Button, { onClick: () => navigate('/invoices/new'), children: [_jsx(Plus, { size: 20, className: "mr-2" }), "Nouvelle facture"] })] }), _jsx(DocumentFilters, { onStatusChange: setStatusFilter, onSearch: setSearchTerm, onDateSort: setDateSort, type: "invoice" }), _jsx(Card, { children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "text-left py-3 px-4", children: "Num\u00E9ro" }), _jsx("th", { className: "text-left py-3 px-4", children: "Client" }), _jsx("th", { className: "text-left py-3 px-4", children: "Date" }), _jsx("th", { className: "text-right py-3 px-4", children: "Montant" }), _jsx("th", { className: "text-center py-3 px-4", children: "Statut" }), _jsx("th", { className: "text-right py-3 px-4", children: "Actions" })] }) }), _jsx("tbody", { children: invoices.map((invoice) => (_jsxs("tr", { className: "border-b hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-4", children: invoice.number }), _jsx("td", { className: "py-3 px-4", children: invoice.client.name }), _jsx("td", { className: "py-3 px-4", children: formatDate(invoice.date) }), _jsxs("td", { className: "py-3 px-4 text-right", children: [invoice.total.toFixed(2), " \u20AC"] }), _jsx("td", { className: "py-3 px-4", children: _jsx("div", { className: "flex justify-center", children: _jsx(StatusBadge, { status: invoice.status, type: "invoice", onStatusChange: (newStatus) => handleStatusChange(invoice.id, newStatus) }) }) }), _jsx("td", { className: "py-3 px-4", children: _jsx("div", { className: "flex justify-end", children: _jsx(DocumentActions, { document: invoice, onPreview: () => setPreviewDocument(invoice), onEdit: () => navigate(`/invoices/${invoice.id}/edit`) }) }) })] }, invoice.id))) })] }) }) }), previewDocument && (_jsx(DocumentPreview, { document: previewDocument, onClose: () => setPreviewDocument(null) }))] }));
};
export default InvoiceList;
