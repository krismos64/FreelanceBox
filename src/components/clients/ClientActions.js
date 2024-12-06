import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
export const ClientActions = ({ client, onEdit }) => {
    const { state, dispatch } = useApp();
    const handleDelete = () => {
        // Vérifier si le client est utilisé dans des documents
        const isClientUsed = state.documents.some((doc) => doc.client.id === client.id);
        if (isClientUsed) {
            alert('Ce client ne peut pas être supprimé car il est utilisé dans des documents.');
            return;
        }
        if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
            dispatch({ type: 'DELETE_CLIENT', payload: client.id });
        }
    };
    return (_jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "secondary", size: "sm", onClick: onEdit, children: [_jsx(Pencil, { size: 16, className: "mr-1" }), "Modifier"] }), _jsxs(Button, { variant: "danger", size: "sm", onClick: handleDelete, children: [_jsx(Trash2, { size: 16, className: "mr-1" }), "Supprimer"] })] }));
};
