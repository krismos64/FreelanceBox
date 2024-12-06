import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { useApp } from "../../context/AppContext";
const PDFFooter = () => {
    const context = useApp();
    if (!context) {
        console.error("PDFFooter est utilisé en dehors de AppProvider");
        return null;
    }
    const { state } = context;
    const { companySettings } = state || {};
    return (_jsxs(View, { style: styles.footer, children: [_jsx(View, { style: styles.divider }), _jsxs(Text, { style: styles.companyInfo, children: [companySettings?.name || "Nom de l’entreprise non spécifié", " - SIRET :", " ", companySettings?.siret || "SIRET inconnu"] }), _jsx(Text, { style: styles.text, children: companySettings
                    ? "Dispensé d'immatriculation en application de l'article L 123-1-1 du code de commerce"
                    : "Informations d’immatriculation indisponibles" }), _jsx(Text, { style: styles.text, children: companySettings
                    ? "TVA non applicable, art. 293 B du CGI"
                    : "Informations sur la TVA indisponibles" }), _jsx(Text, { style: styles.text, children: "En cas de retard de paiement, une p\u00E9nalit\u00E9 de 3 fois le taux d'int\u00E9r\u00EAt l\u00E9gal sera appliqu\u00E9e, \u00E0 laquelle s'ajoutera une indemnit\u00E9 forfaitaire pour frais de recouvrement de 40\u20AC." })] }));
};
const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        bottom: 30,
        left: 40,
        right: 40,
    },
    text: {
        fontSize: 8,
        color: "#6b7280",
        textAlign: "center",
        marginBottom: 2,
    },
    divider: {
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        marginBottom: 10,
    },
    companyInfo: {
        fontSize: 8,
        color: "#6b7280",
        textAlign: "center",
        marginBottom: 5,
    },
});
export default PDFFooter;
