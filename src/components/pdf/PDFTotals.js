import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View, Text, StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
    totalsSection: {
        marginTop: 20,
        marginLeft: 'auto',
        width: '40%',
    },
    totalRow: {
        flexDirection: 'row',
        marginBottom: 5,
        paddingVertical: 3,
    },
    totalLabel: {
        flex: 2,
        textAlign: 'right',
        paddingRight: 10,
        color: '#4b5563',
    },
    totalValue: {
        flex: 1,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    totalTTC: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 2,
        borderTopColor: '#2563eb',
    },
    tvaInfo: {
        fontSize: 9,
        color: '#6b7280',
        textAlign: 'right',
        marginTop: 5,
    },
});
export const PDFTotals = ({ subtotal, total }) => {
    return (_jsxs(View, { style: styles.totalsSection, children: [_jsxs(View, { style: styles.totalRow, children: [_jsx(Text, { style: styles.totalLabel, children: "Total HT :" }), _jsxs(Text, { style: styles.totalValue, children: [subtotal.toFixed(2), " \u20AC"] })] }), _jsxs(View, { style: styles.totalRow, children: [_jsx(Text, { style: styles.totalLabel, children: "TVA :" }), _jsx(Text, { style: styles.totalValue, children: "0.00 \u20AC" })] }), _jsxs(View, { style: [styles.totalRow, styles.totalTTC], children: [_jsx(Text, { style: styles.totalLabel, children: "Total TTC :" }), _jsxs(Text, { style: styles.totalValue, children: [total.toFixed(2), " \u20AC"] })] }), _jsx(Text, { style: styles.tvaInfo, children: "TVA non applicable, art. 293 B du CGI" })] }));
};
