import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/dateUtils';
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 11,
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        borderBottom: 1,
        borderColor: '#2563eb',
        paddingBottom: 10,
    },
    companyInfo: {
        width: '50%',
    },
    companyName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#2563eb',
    },
    companyDetails: {
        marginBottom: 3,
        fontSize: 10,
    },
    documentInfo: {
        width: '40%',
        alignItems: 'flex-end',
    },
    documentTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2563eb',
    },
    documentNumber: {
        fontSize: 12,
        marginBottom: 5,
    },
    clientSection: {
        marginTop: 20,
        marginBottom: 30,
    },
    clientTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#2563eb',
    },
    table: {
        marginTop: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f3f4f6',
        padding: 8,
        fontSize: 10,
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#e5e7eb',
        padding: 8,
    },
    description: { width: '40%' },
    quantity: { width: '20%', textAlign: 'center' },
    price: { width: '20%', textAlign: 'right' },
    total: { width: '20%', textAlign: 'right' },
    totalsSection: {
        marginTop: 30,
        alignItems: 'flex-end',
    },
    totalRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    totalLabel: {
        width: 150,
        textAlign: 'right',
        marginRight: 10,
    },
    totalValue: {
        width: 80,
        textAlign: 'right',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        fontSize: 9,
        textAlign: 'center',
        color: '#6b7280',
    },
});
export const PDFDocument = ({ document }) => {
    const { state } = useApp();
    const { companySettings } = state;
    return (_jsx(Document, { children: _jsxs(Page, { size: "A4", style: styles.page, children: [_jsxs(View, { style: styles.header, children: [_jsxs(View, { style: styles.companyInfo, children: [_jsx(Text, { style: styles.companyName, children: companySettings.name }), _jsx(Text, { style: styles.companyDetails, children: companySettings.address }), _jsxs(Text, { style: styles.companyDetails, children: [companySettings.postalCode, " ", companySettings.city] }), _jsxs(Text, { style: styles.companyDetails, children: ["T\u00E9l : ", companySettings.phone] }), _jsxs(Text, { style: styles.companyDetails, children: ["Email : ", companySettings.email] }), companySettings.website && (_jsxs(Text, { style: styles.companyDetails, children: ["Site web : ", companySettings.website] })), companySettings.siret && (_jsxs(Text, { style: styles.companyDetails, children: ["SIRET : ", companySettings.siret] }))] }), _jsxs(View, { style: styles.documentInfo, children: [_jsx(Text, { style: styles.documentTitle, children: document.type === 'quote' ? 'DEVIS' : 'FACTURE' }), _jsxs(Text, { style: styles.documentNumber, children: ["N\u00B0 ", document.number] }), _jsxs(Text, { children: ["Date : ", formatDate(document.date)] }), document.type === 'quote' && document.validUntil && (_jsxs(Text, { children: ["Valable jusqu'au : ", formatDate(document.validUntil)] }))] })] }), _jsxs(View, { style: styles.clientSection, children: [_jsx(Text, { style: styles.clientTitle, children: "Client" }), _jsx(Text, { children: document.client.name }), _jsx(Text, { children: document.client.address }), _jsxs(Text, { children: [document.client.postalCode, " ", document.client.city] }), _jsx(Text, { children: document.client.email }), _jsx(Text, { children: document.client.phone }), document.client.siret && _jsxs(Text, { children: ["SIRET : ", document.client.siret] })] }), _jsxs(View, { style: styles.table, children: [_jsxs(View, { style: styles.tableHeader, children: [_jsx(Text, { style: styles.description, children: "Description" }), _jsx(Text, { style: styles.quantity, children: "Quantit\u00E9" }), _jsx(Text, { style: styles.price, children: "Prix unitaire" }), _jsx(Text, { style: styles.total, children: "Total HT" })] }), document.items.map((item, index) => (_jsxs(View, { style: styles.tableRow, children: [_jsx(Text, { style: styles.description, children: item.description }), _jsx(Text, { style: styles.quantity, children: item.quantity }), _jsxs(Text, { style: styles.price, children: [item.unitPrice.toFixed(2), " \u20AC"] }), _jsxs(Text, { style: styles.total, children: [item.total.toFixed(2), " \u20AC"] })] }, index)))] }), _jsxs(View, { style: styles.totalsSection, children: [_jsxs(View, { style: styles.totalRow, children: [_jsx(Text, { style: styles.totalLabel, children: "Total HT :" }), _jsxs(Text, { style: styles.totalValue, children: [document.subtotal.toFixed(2), " \u20AC"] })] }), _jsxs(View, { style: styles.totalRow, children: [_jsx(Text, { style: styles.totalLabel, children: "TVA non applicable, art. 293 B du CGI" }), _jsx(Text, { style: styles.totalValue, children: "0.00 \u20AC" })] }), _jsxs(View, { style: styles.totalRow, children: [_jsx(Text, { style: styles.totalLabel, children: "Total TTC :" }), _jsxs(Text, { style: styles.totalValue, children: [document.total.toFixed(2), " \u20AC"] })] })] }), document.notes && (_jsxs(View, { style: { marginTop: 30 }, children: [_jsx(Text, { style: { fontWeight: 'bold', marginBottom: 5 }, children: "Notes :" }), _jsx(Text, { children: document.notes })] })), _jsxs(View, { style: styles.footer, children: [_jsx(Text, { children: "Dispens\u00E9 d'immatriculation en application de l'article L 123-1-1 du code de commerce" }), _jsx(Text, { children: "TVA non applicable, art. 293 B du CGI" })] })] }) }));
};
