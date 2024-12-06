import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Document, Page, View, StyleSheet } from "@react-pdf/renderer";
import { PDFHeader } from "./PDFHeader";
import { PDFClientInfo } from "./PDFClientInfo";
import { PDFItemsTable } from "./PDFItemsTable";
import { PDFTotals } from "./PDFTotals";
import PDFFooter from "./PDFFooter";
import { PDFNotes } from "./PDFNotes";
import { PDFValidation } from "./PDFValidation";
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: "Helvetica",
        fontSize: 11,
        color: "#1f2937",
    },
    container: {
        flex: 1,
    },
});
export const PDFDocument = ({ document }) => {
    // Validation des données
    if (!document) {
        console.error("Document non fourni à PDFDocument.");
        return null;
    }
    if (!document.client) {
        console.error("Client manquant dans le document.");
        return null;
    }
    if (!document.items) {
        console.error("Articles manquants dans le document.");
        return null;
    }
    return (_jsx(Document, { children: _jsx(Page, { size: "A4", style: styles.page, children: _jsxs(View, { style: styles.container, children: [_jsx(PDFHeader, { document: document }), _jsx(PDFClientInfo, { client: document.client }), _jsx(PDFItemsTable, { items: document.items }), _jsx(PDFTotals, { subtotal: document.subtotal, total: document.total }), document.notes && _jsx(PDFNotes, { notes: document.notes }), document.type === "quote" && _jsx(PDFValidation, {}), _jsx(PDFFooter, {})] }) }) }));
};
