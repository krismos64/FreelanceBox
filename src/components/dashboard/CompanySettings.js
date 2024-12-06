import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
export const CompanySettings = () => {
    const { state, dispatch } = useApp();
    const [isEditing, setIsEditing] = useState(false);
    const [settings, setSettings] = useState(state.companySettings);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'UPDATE_COMPANY_SETTINGS', payload: settings });
        setIsEditing(false);
    };
    if (!isEditing) {
        return (_jsxs(Card, { children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-800", children: "Informations de l'entreprise" }), _jsx(Button, { variant: "secondary", onClick: () => setIsEditing(true), children: "Modifier" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Nom :" }), " ", settings.name || '-'] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Adresse :" }), " ", settings.address || '-'] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Code postal :" }), " ", settings.postalCode || '-'] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Ville :" }), " ", settings.city || '-'] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "T\u00E9l\u00E9phone :" }), " ", settings.phone || '-'] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Email :" }), " ", settings.email || '-'] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Site web :" }), " ", settings.website || '-'] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "SIRET :" }), " ", settings.siret || '-'] })] })] }));
    }
    return (_jsx(Card, { children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-4", children: "Modifier les informations" }), _jsxs("div", { className: "space-y-4", children: [_jsx(Input, { label: "Nom de l'entreprise", value: settings.name, onChange: (e) => setSettings((prev) => ({ ...prev, name: e.target.value })) }), _jsx(Input, { label: "Adresse", value: settings.address, onChange: (e) => setSettings((prev) => ({ ...prev, address: e.target.value })) }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(Input, { label: "Code postal", value: settings.postalCode, onChange: (e) => setSettings((prev) => ({ ...prev, postalCode: e.target.value })) }), _jsx(Input, { label: "Ville", value: settings.city, onChange: (e) => setSettings((prev) => ({ ...prev, city: e.target.value })) })] }), _jsx(Input, { label: "T\u00E9l\u00E9phone", value: settings.phone, onChange: (e) => setSettings((prev) => ({ ...prev, phone: e.target.value })) }), _jsx(Input, { label: "Email", type: "email", value: settings.email, onChange: (e) => setSettings((prev) => ({ ...prev, email: e.target.value })) }), _jsx(Input, { label: "Site web", value: settings.website, onChange: (e) => setSettings((prev) => ({ ...prev, website: e.target.value })) }), _jsx(Input, { label: "SIRET", value: settings.siret, onChange: (e) => setSettings((prev) => ({ ...prev, siret: e.target.value })) })] }), _jsxs("div", { className: "flex justify-end gap-2 mt-6", children: [_jsx(Button, { type: "button", variant: "secondary", onClick: () => setIsEditing(false), children: "Annuler" }), _jsx(Button, { type: "submit", children: "Enregistrer" })] })] }) }));
};
