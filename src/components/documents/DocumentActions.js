import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Eye, Pencil, Trash2, FileDown } from "lucide-react";
import { Button } from "../ui/Button";
import { useApp } from "../../context/AppContext";
import { BlobProvider } from "@react-pdf/renderer";
import { PDFDocument } from "../pdf/PDFDocument";
import { showSuccess } from "../../utils/notifications";
export const DocumentActions = ({ document, onPreview, onEdit, }) => {
    const { dispatch } = useApp();
    const handleDelete = () => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce document ?")) {
            dispatch({ type: "DELETE_DOCUMENT", payload: document.id });
            showSuccess("Document supprimé avec succès");
        }
    };
    return (_jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "secondary", size: "sm", onClick: onPreview, children: [_jsx(Eye, { size: 16, className: "mr-1" }), "Aper\u00E7u"] }), _jsx(BlobProvider, { document: _jsx(PDFDocument, { document: document }), children: ({ url, loading }) => loading ? (_jsxs(Button, { variant: "secondary", size: "sm", disabled: true, children: [_jsx(FileDown, { size: 16, className: "mr-1" }), "Chargement..."] })) : (url && (_jsx("a", { href: url || undefined, download: `${document.number}.pdf`, className: "no-underline", children: _jsxs(Button, { variant: "secondary", size: "sm", children: [_jsx(FileDown, { size: 16, className: "mr-1" }), "PDF"] }) }))) }), _jsxs(Button, { variant: "secondary", size: "sm", onClick: onEdit, children: [_jsx(Pencil, { size: 16, className: "mr-1" }), "Modifier"] }), _jsxs(Button, { variant: "danger", size: "sm", onClick: handleDelete, children: [_jsx(Trash2, { size: 16, className: "mr-1" }), "Supprimer"] })] }));
};
