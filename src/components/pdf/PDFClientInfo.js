import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
    clientSection: {
        marginBottom: 40,
        padding: 15,
        backgroundColor: "#f8fafc",
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#2563eb",
    },
    info: {
        fontSize: 11,
        marginBottom: 3,
        color: "#4b5563",
    },
});
export const PDFClientInfo = ({ client }) => {
    if (!client) {
        return (_jsxs(View, { style: styles.clientSection, children: [_jsx(Text, { style: styles.title, children: "Client" }), _jsx(Text, { style: styles.info, children: "Aucune information client disponible" })] }));
    }
    return (_jsxs(View, { style: styles.clientSection, children: [_jsx(Text, { style: styles.title, children: "Client" }), _jsx(Text, { style: styles.info, children: client.name || "Nom non spécifié" }), _jsx(Text, { style: styles.info, children: client.address || "Adresse non spécifiée" }), _jsx(Text, { style: styles.info, children: (client.postalCode || "Code postal non spécifié") +
                    " " +
                    (client.city || "Ville non spécifiée") }), _jsx(Text, { style: styles.info, children: client.email || "Email non spécifié" }), _jsx(Text, { style: styles.info, children: client.phone || "Téléphone non spécifié" }), client.siret && _jsxs(Text, { style: styles.info, children: ["SIRET : ", client.siret] })] }));
};
