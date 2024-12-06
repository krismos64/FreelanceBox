import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
export const ClientForm = ({ onSubmit, initialData }) => {
    const { dispatch } = useApp();
    const [client, setClient] = useState(initialData || {
        id: uuidv4(),
        name: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        city: '',
        siret: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (initialData) {
            dispatch({ type: 'UPDATE_CLIENT', payload: client });
        }
        else {
            dispatch({ type: 'ADD_CLIENT', payload: client });
        }
        onSubmit();
    };
    return (_jsx("form", { onSubmit: handleSubmit, children: _jsxs(Card, { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(Input, { label: "Nom", required: true, value: client.name, onChange: (e) => setClient((prev) => ({ ...prev, name: e.target.value })) }), _jsx(Input, { label: "Email", type: "email", required: true, value: client.email, onChange: (e) => setClient((prev) => ({ ...prev, email: e.target.value })) }), _jsx(Input, { label: "T\u00E9l\u00E9phone", value: client.phone, onChange: (e) => setClient((prev) => ({ ...prev, phone: e.target.value })) }), _jsx(Input, { label: "SIRET", value: client.siret, onChange: (e) => setClient((prev) => ({ ...prev, siret: e.target.value })) }), _jsx("div", { className: "col-span-2", children: _jsx(Input, { label: "Adresse", required: true, value: client.address, onChange: (e) => setClient((prev) => ({ ...prev, address: e.target.value })) }) }), _jsx(Input, { label: "Code postal", required: true, value: client.postalCode, onChange: (e) => setClient((prev) => ({ ...prev, postalCode: e.target.value })) }), _jsx(Input, { label: "Commune", required: true, value: client.city, onChange: (e) => setClient((prev) => ({ ...prev, city: e.target.value })) })] }), _jsx("div", { className: "mt-6 flex justify-end", children: _jsxs(Button, { type: "submit", children: [initialData ? 'Mettre à jour' : 'Enregistrer', " le client"] }) })] }) }));
};
