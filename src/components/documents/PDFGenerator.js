import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { BlobProvider } from "@react-pdf/renderer";
export const PDFGenerator = ({ document, children, }) => {
    return (_jsx(BlobProvider, { document: _jsx(PDFDocument, { document: document }), children: ({ url, loading, error, }) => (_jsx(_Fragment, { children: error ? (_jsx("p", { children: "Erreur lors de la g\u00E9n\u00E9ration du PDF" })) : (_jsx("a", { href: url || "#", download: `${document.number}.pdf`, children: children({ loading }) })) })) }));
};
import { Document as PDFDoc, Page, Text, View, StyleSheet, } from "@react-pdf/renderer";
import { formatDate } from "../../utils/dateUtils";
const styles = StyleSheet.create({
    page: { padding: 30, fontFamily: "Helvetica" },
    header: { marginBottom: 20 },
    title: { fontSize: 24, marginBottom: 10 },
    info: { fontSize: 12, marginBottom: 5 },
    clientInfo: { marginTop: 20, marginBottom: 20 },
    table: { marginTop: 20 },
    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        borderBottomStyle: "solid",
        paddingBottom: 5,
        marginBottom: 10,
    },
    row: { flexDirection: "row", paddingTop: 5, paddingBottom: 5 },
    description: { flex: 2 },
    quantity: { flex: 1, textAlign: "right" },
    price: { flex: 1, textAlign: "right" },
    total: { flex: 1, textAlign: "right" },
    totals: { marginTop: 20, alignItems: "flex-end" },
    footer: {
        position: "absolute",
        bottom: 30,
        left: 30,
        right: 30,
        fontSize: 10,
        color: "#666",
    },
});
const PDFDocument = ({ document }) => (_jsx(PDFDoc, { children: _jsxs(Page, { size: "A4", style: styles.page, children: [_jsxs(View, { style: styles.header, children: [_jsxs(Text, { style: styles.title, children: [document.type === "quote" ? "Devis" : "Facture", " ", document.number] }), _jsxs(Text, { style: styles.info, children: ["Date : ", formatDate(document.date)] }), document.validUntil && (_jsxs(Text, { style: styles.info, children: ["Valable jusqu'au : ", formatDate(document.validUntil)] })), document.dueDate && (_jsxs(Text, { style: styles.info, children: ["Date d'\u00E9ch\u00E9ance : ", formatDate(document.dueDate)] }))] }), _jsxs(View, { style: styles.clientInfo, children: [_jsx(Text, { style: styles.info, children: "Client :" }), _jsx(Text, { style: styles.info, children: document.client.name }), _jsx(Text, { style: styles.info, children: document.client.address }), _jsx(Text, { style: styles.info, children: document.client.email }), _jsx(Text, { style: styles.info, children: document.client.phone }), document.client.siret && (_jsxs(Text, { style: styles.info, children: ["SIRET : ", document.client.siret] }))] }), _jsxs(View, { style: styles.table, children: [_jsxs(View, { style: styles.tableHeader, children: [_jsx(Text, { style: styles.description, children: "Description" }), _jsx(Text, { style: styles.quantity, children: "Quantit\u00E9" }), _jsx(Text, { style: styles.price, children: "Prix unitaire" }), _jsx(Text, { style: styles.total, children: "Total" })] }), document.items.map((item) => (_jsxs(View, { style: styles.row, children: [_jsx(Text, { style: styles.description, children: item.description }), _jsx(Text, { style: styles.quantity, children: item.quantity }), _jsxs(Text, { style: styles.price, children: [item.unitPrice.toFixed(2), " \u20AC"] }), _jsxs(Text, { style: styles.total, children: [item.total.toFixed(2), " \u20AC"] })] }, item.id)))] }), _jsxs(View, { style: styles.totals, children: [_jsxs(Text, { children: ["Total HT : ", document.subtotal.toFixed(2), " \u20AC"] }), _jsx(Text, { children: "TVA non applicable, art. 293 B du CGI" }), _jsxs(Text, { children: ["Total TTC : ", document.total.toFixed(2), " \u20AC"] })] }), document.notes && (_jsxs(View, { style: { marginTop: 20 }, children: [_jsx(Text, { style: styles.info, children: "Notes :" }), _jsx(Text, { style: styles.info, children: document.notes })] })), _jsxs(View, { style: styles.footer, children: [_jsx(Text, { children: "Dispens\u00E9 d'immatriculation en application de l'article L 123-1-1 du code de commerce" }), _jsx(Text, { children: "TVA non applicable, art. 293 B du CGI" })] })] }) }));
