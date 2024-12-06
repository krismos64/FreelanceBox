import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View, Text, StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
    notes: {
        marginTop: 40,
        padding: 15,
        backgroundColor: '#f8fafc',
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#2563eb',
    },
    text: {
        fontSize: 10,
        color: '#4b5563',
        lineHeight: 1.4,
    },
});
export const PDFNotes = ({ notes }) => (_jsxs(View, { style: styles.notes, children: [_jsx(Text, { style: styles.title, children: "Notes :" }), _jsx(Text, { style: styles.text, children: notes })] }));
