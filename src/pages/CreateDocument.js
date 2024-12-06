import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { DocumentForm } from "../components/documents/DocumentForm";
const CreateDocument = ({ type }) => {
    const { state } = useApp();
    // Initialisation des données
    const [newDocument] = useState({
        id: `${Date.now()}`, // Génère un ID unique
        type,
        number: `DOC-${state.documents.length + 1}`, // Numérotation simple
        date: new Date().toISOString(),
        client: state.clients[0] || {
            id: "",
            name: "",
            email: "",
            phone: "",
            address: "",
            postalCode: "",
            city: "",
        }, // Client par défaut si aucun client n'est défini
        items: [], // Liste vide par défaut
        status: "Généré", // Statut par défaut
        subtotal: 0,
        total: 0,
        notes: "",
        validUntil: type === "quote" ? new Date().toISOString() : undefined,
        dueDate: type === "invoice" ? new Date().toISOString() : undefined,
    });
    // Gestion de la soumission
    return (_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold mb-6", children: type === "quote" ? "Créer un devis" : "Créer une facture" }), _jsx(DocumentForm, { type: type, initialData: newDocument })] }));
};
export default CreateDocument;
