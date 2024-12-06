import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
    table: {
        marginVertical: 20,
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#2563eb",
        padding: 8,
        marginBottom: 1,
    },
    tableHeaderCell: {
        color: "#ffffff",
        fontSize: 10,
        fontWeight: "bold",
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
        padding: 8,
    },
    tableRowEven: {
        backgroundColor: "#f9fafb",
    },
    description: {
        flex: 2,
        paddingRight: 8,
    },
    quantity: {
        width: "15%",
        textAlign: "center",
    },
    unitPrice: {
        width: "20%",
        textAlign: "right",
    },
    total: {
        width: "20%",
        textAlign: "right",
    },
});
export const PDFItemsTable = ({ items }) => {
    return (_jsxs(View, { style: styles.table, children: [_jsxs(View, { style: styles.tableHeader, children: [_jsx(Text, { style: [styles.tableHeaderCell, styles.description], children: "Description" }), _jsx(Text, { style: [styles.tableHeaderCell, styles.quantity], children: "Quantit\u00E9" }), _jsx(Text, { style: [styles.tableHeaderCell, styles.unitPrice], children: "Prix unitaire" }), _jsx(Text, { style: [styles.tableHeaderCell, styles.total], children: "Total HT" })] }), items.map((item, index) => (_jsxs(View, { style: [
                    styles.tableRow,
                    ...(index % 2 === 1 ? [styles.tableRowEven] : []),
                ], children: [_jsx(Text, { style: styles.description, children: item.description }), _jsx(Text, { style: styles.quantity, children: item.quantity }), _jsxs(Text, { style: styles.unitPrice, children: [item.unitPrice.toFixed(2), " \u20AC"] }), _jsxs(Text, { style: styles.total, children: [item.total.toFixed(2), " \u20AC"] })] }, item.id)))] }));
};
