import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import { useApp } from "../../context/AppContext";
import { formatDate } from "../../utils/dateUtils";
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 30,
        borderBottom: 2,
        borderBottomColor: "#2563eb",
        paddingBottom: 20,
    },
    companyInfo: {
        width: "50%",
    },
    logoContainer: {
        marginBottom: 10,
    },
    logo: {
        width: 100,
        height: 50,
        objectFit: "contain",
        marginBottom: 10,
    },
    companyName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#2563eb",
    },
    companyDetails: {
        fontSize: 10,
        marginBottom: 3,
        color: "#4b5563",
    },
    documentInfo: {
        width: "40%",
        alignItems: "flex-end",
    },
    documentTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#2563eb",
        marginBottom: 12,
    },
    documentNumber: {
        fontSize: 14,
        marginBottom: 8,
        color: "#4b5563",
    },
    documentDate: {
        fontSize: 10,
        marginBottom: 3,
        color: "#4b5563",
    },
});
export const PDFHeader = ({ document }) => {
    const context = useApp();
    if (!context) {
        console.error("PDFHeader utilisé en dehors de AppProvider.");
        return (_jsx(View, { children: _jsx(Text, { style: { color: "red" }, children: "Erreur : Contexte manquant." }) }));
    }
    const { state } = context;
    const { companySettings } = state;
    // Définir des valeurs par défaut si des champs sont manquants
    const companyName = companySettings?.name || "Nom de l'entreprise";
    const address = companySettings?.address || "Adresse non spécifiée";
    const postalCode = companySettings?.postalCode || "Code postal non spécifié";
    const city = companySettings?.city || "Ville non spécifiée";
    const phone = companySettings?.phone || "Téléphone non spécifié";
    const email = companySettings?.email || "Email non spécifié";
    const website = companySettings?.website || null;
    const siret = companySettings?.siret || null;
    return (_jsxs(View, { style: styles.header, children: [_jsxs(View, { style: styles.companyInfo, children: [companySettings?.logo && (_jsx(View, { style: styles.logoContainer, children: _jsx(Image, { src: companySettings.logo, style: styles.logo }) })), _jsx(Text, { style: styles.companyName, children: companyName }), _jsx(Text, { style: styles.companyDetails, children: address }), _jsxs(Text, { style: styles.companyDetails, children: [postalCode, " ", city] }), _jsxs(Text, { style: styles.companyDetails, children: ["T\u00E9l : ", phone] }), _jsxs(Text, { style: styles.companyDetails, children: ["Email : ", email] }), website && (_jsxs(Text, { style: styles.companyDetails, children: ["Site web : ", website] })), siret && _jsxs(Text, { style: styles.companyDetails, children: ["SIRET : ", siret] })] }), _jsxs(View, { style: styles.documentInfo, children: [_jsx(Text, { style: styles.documentTitle, children: document.type === "quote" ? "DEVIS" : "FACTURE" }), _jsxs(Text, { style: styles.documentNumber, children: ["N\u00B0 ", document.number] }), _jsxs(Text, { style: styles.documentDate, children: ["Date : ", formatDate(document.date)] }), document.type === "quote" && document.validUntil && (_jsxs(Text, { style: styles.documentDate, children: ["Valable jusqu'au : ", formatDate(document.validUntil)] }))] })] }));
};
