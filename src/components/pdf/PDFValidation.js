import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View, Text, StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
    validationBlock: {
        marginTop: 40,
        padding: 20,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2563eb',
        marginBottom: 10,
        textAlign: 'center',
    },
    signatureLine: {
        marginTop: 40,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        width: '100%',
    },
    signatureText: {
        marginTop: 10,
        fontSize: 10,
        color: '#6b7280',
        textAlign: 'center',
    },
});
export const PDFValidation = () => (_jsxs(View, { style: styles.validationBlock, children: [_jsx(Text, { style: styles.title, children: "Bon pour accord" }), _jsx(View, { style: styles.signatureLine }), _jsx(Text, { style: styles.signatureText, children: "Date et signature" })] }));
