import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
    legalSection: {
        margin: 10,
        padding: 10,
        border: "1px solid #000",
    },
    legalText: {
        fontSize: 12,
        marginBottom: 5,
    },
});
export const PDFLegalSection = () => (_jsxs(View, { style: styles.legalSection, children: [_jsx(Text, { style: styles.legalText, children: "Dispens\u00E9 d'immatriculation au registre du commerce et des soci\u00E9t\u00E9s (RCS) et au r\u00E9pertoire des m\u00E9tiers (RM)" }), _jsx(Text, { style: styles.legalText, children: "TVA non applicable, art. 293 B du Code G\u00E9n\u00E9ral des Imp\u00F4ts" }), _jsx(Text, { style: styles.legalText, children: "En cas de retard de paiement, une p\u00E9nalit\u00E9 de 3 fois le taux d'int\u00E9r\u00EAt l\u00E9gal sera appliqu\u00E9e, \u00E0 laquelle s'ajoutera une indemnit\u00E9 forfaitaire pour frais de recouvrement de 40\u20AC." })] }));
