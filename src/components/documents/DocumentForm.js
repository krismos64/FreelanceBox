import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { ServiceItemForm } from "./ServiceItemForm";
import { useApp } from "../../context/AppContext";
import { generateDocumentNumber } from "../../utils/documentUtils";
import { generateDueDate } from "../../utils/dateUtils";
import { Plus } from "lucide-react";
import { showSuccess } from "../../utils/notifications";
import { motion, AnimatePresence } from "framer-motion";
export const DocumentForm = ({ type, initialData, }) => {
    const { state } = useApp();
    const today = new Date().toISOString().split("T")[0];
    const [document, setDocument] = useState(initialData ?? {
        id: uuidv4(),
        type,
        number: generateDocumentNumber(type, state.documents),
        date: today,
        client: {
            id: "",
            name: "",
            email: "",
            phone: "",
            address: "",
            postalCode: "",
            city: "",
        },
        items: [],
        status: "Généré",
        subtotal: 0,
        total: 0,
        notes: "",
        validUntil: type === "quote" ? generateDueDate(today, 30) : undefined,
        dueDate: type === "invoice" ? new Date().toISOString() : undefined,
    });
    const calculateTotals = (items) => {
        const subtotal = items.reduce((sum, item) => sum + item.total, 0);
        return {
            subtotal,
            total: subtotal,
        };
    };
    const handleClientChange = (clientId) => {
        const selectedClient = state.clients.find((c) => c.id === clientId);
        if (selectedClient) {
            setDocument((prev) => ({
                ...prev,
                client: selectedClient,
            }));
        }
    };
    const handleDateChange = (field, value) => {
        const dateValue = value || today;
        setDocument((prev) => ({
            ...prev,
            [field]: dateValue,
            ...(field === "date" &&
                type === "quote" && {
                validUntil: generateDueDate(dateValue, 30),
            }),
        }));
    };
    const handleAddItem = () => {
        const newItem = {
            id: uuidv4(),
            description: "",
            quantity: 1,
            unitPrice: 0,
            total: 0,
        };
        setDocument((prev) => ({
            ...prev,
            items: [...prev.items, newItem],
        }));
    };
    const handleUpdateItem = (updatedItem) => {
        setDocument((prev) => {
            const newItems = prev.items.map((item) => item.id === updatedItem.id ? updatedItem : item);
            const { subtotal, total } = calculateTotals(newItems);
            return {
                ...prev,
                items: newItems,
                subtotal,
                total,
            };
        });
    };
    const handleDeleteItem = (itemId) => {
        setDocument((prev) => {
            const newItems = prev.items.filter((item) => item.id !== itemId);
            const { subtotal, total } = calculateTotals(newItems);
            return {
                ...prev,
                items: newItems,
                subtotal,
                total,
            };
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        showSuccess(`${type === "quote" ? "Devis" : "Facture"} ${initialData ? "modifié" : "créé"} avec succès`);
    };
    return (_jsx("form", { onSubmit: handleSubmit, children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, children: [_jsx(Card, { className: "mb-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(Input, { label: "Num\u00E9ro", value: document.number, disabled: true }), _jsx(Input, { label: "Date", type: "date", value: document.date, onChange: (e) => handleDateChange("date", e.target.value) }), type === "quote" && (_jsx(Input, { label: "Valable jusqu'au", type: "date", value: document.validUntil ?? "", onChange: (e) => handleDateChange("validUntil", e.target.value) })), _jsx(Select, { label: "Client", value: document.client.id, onChange: (e) => handleClientChange(e.target.value), options: [
                                    { value: "", label: "Sélectionner un client" },
                                    ...state.clients.map((client) => ({
                                        value: client.id,
                                        label: client.name,
                                    })),
                                ] })] }) }), _jsxs(Card, { className: "mb-6", children: [_jsx("h3", { className: "text-lg font-medium mb-4", children: "Services" }), _jsx(AnimatePresence, { children: document.items.map((item) => (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.2 }, children: _jsx(ServiceItemForm, { item: item, onChange: handleUpdateItem, onDelete: () => handleDeleteItem(item.id) }) }, item.id))) }), _jsx("div", { className: "mt-4", children: _jsxs(Button, { type: "button", variant: "secondary", onClick: handleAddItem, children: [_jsx(Plus, { size: 20, className: "mr-2" }), "Ajouter un service"] }) })] }), _jsx(Card, { className: "mb-6", children: _jsx("div", { className: "flex flex-col items-end", children: _jsxs("div", { className: "w-64", children: [_jsxs("div", { className: "flex justify-between py-2", children: [_jsx("span", { children: "Total HT" }), _jsxs("span", { children: [document.subtotal.toFixed(2), " \u20AC"] })] }), _jsxs("div", { className: "flex justify-between py-2 text-sm text-gray-600", children: [_jsx("span", { children: "TVA non applicable, art. 293 B du CGI" }), _jsx("span", { children: "0.00 \u20AC" })] }), _jsxs("div", { className: "flex justify-between py-2 font-bold border-t", children: [_jsx("span", { children: "Total TTC" }), _jsxs("span", { children: [document.total.toFixed(2), " \u20AC"] })] })] }) }) }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { htmlFor: "notes", className: "block text-sm font-medium", children: "Notes" }), _jsx("textarea", { id: "notes", rows: 4, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", value: document.notes, onChange: (e) => setDocument((prev) => ({ ...prev, notes: e.target.value })) })] }), _jsx("div", { className: "flex justify-end", children: _jsxs(Button, { type: "submit", children: [initialData ? "Mettre à jour" : "Créer", " ", type === "quote" ? "le devis" : "la facture"] }) })] }) }));
};
