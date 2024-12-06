import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ClientForm } from '../components/clients/ClientForm';
import { ClientActions } from '../components/clients/ClientActions';
import { useApp } from '../context/AppContext';
const ClientList = () => {
    const { state } = useApp();
    const [showForm, setShowForm] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const handleEditClick = (client) => {
        setEditingClient(client);
        setShowForm(true);
    };
    const handleFormSubmit = () => {
        setShowForm(false);
        setEditingClient(null);
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "Clients" }), _jsxs(Button, { onClick: () => setShowForm(true), children: [_jsx(Plus, { size: 20, className: "mr-2" }), "Nouveau client"] })] }), showForm && (_jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-lg font-medium", children: editingClient ? 'Modifier le client' : 'Nouveau client' }), _jsx(Button, { variant: "secondary", onClick: () => {
                                    setShowForm(false);
                                    setEditingClient(null);
                                }, children: "Annuler" })] }), _jsx(ClientForm, { onSubmit: handleFormSubmit, initialData: editingClient })] })), _jsx(Card, { children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "text-left py-3 px-4", children: "Nom" }), _jsx("th", { className: "text-left py-3 px-4", children: "Email" }), _jsx("th", { className: "text-left py-3 px-4", children: "T\u00E9l\u00E9phone" }), _jsx("th", { className: "text-left py-3 px-4", children: "SIRET" }), _jsx("th", { className: "text-left py-3 px-4", children: "Adresse" }), _jsx("th", { className: "text-left py-3 px-4", children: "Code postal" }), _jsx("th", { className: "text-left py-3 px-4", children: "Commune" }), _jsx("th", { className: "text-right py-3 px-4", children: "Actions" })] }) }), _jsx("tbody", { children: state.clients.map((client) => (_jsxs("tr", { className: "border-b hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-4", children: client.name }), _jsx("td", { className: "py-3 px-4", children: client.email }), _jsx("td", { className: "py-3 px-4", children: client.phone }), _jsx("td", { className: "py-3 px-4", children: client.siret }), _jsx("td", { className: "py-3 px-4", children: client.address }), _jsx("td", { className: "py-3 px-4", children: client.postalCode }), _jsx("td", { className: "py-3 px-4", children: client.city }), _jsx("td", { className: "py-3 px-4", children: _jsx("div", { className: "flex justify-end", children: _jsx(ClientActions, { client: client, onEdit: () => handleEditClick(client) }) }) })] }, client.id))) })] }) }) })] }));
};
export default ClientList;
