import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useParams } from "react-router-dom";
import { DocumentForm } from "../components/documents/DocumentForm";
import { useApp } from "../context/AppContext";
const EditDocument = ({ type }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { state } = useApp();
    const document = state.documents.find((doc) => doc.id === id);
    if (!document) {
        return (_jsxs("div", { className: "text-center py-8", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800 mb-4", children: "Document non trouv\u00E9" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Le document que vous essayez de modifier n'existe pas." }), _jsx("button", { onClick: () => navigate(-1), className: "text-blue-600 hover:text-blue-800", children: "Retourner \u00E0 la liste" })] }));
    }
    return (_jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-bold text-gray-800 mb-6", children: ["Modifier ", type === "quote" ? "le devis" : "la facture", " ", document.number] }), _jsx(DocumentForm, { type: type, initialData: document })] }));
};
export default EditDocument;
