import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { useApp } from "../../context/AppContext";

const PDFFooter: React.FC = () => {
  const context = useApp();
  if (!context) {
    console.error("PDFFooter est utilisé en dehors de AppProvider");
    return null;
  }

  const { state } = context;
  const { companySettings } = state || {};

  return (
    <View style={styles.footer}>
      <View style={styles.divider} />
      <Text style={styles.companyInfo}>
        {companySettings?.name || "Nom de l’entreprise non spécifié"} - SIRET :{" "}
        {companySettings?.siret || "SIRET inconnu"}
      </Text>
      <Text style={styles.text}>
        {companySettings
          ? "Dispensé d'immatriculation en application de l'article L 123-1-1 du code de commerce"
          : "Informations d’immatriculation indisponibles"}
      </Text>
      <Text style={styles.text}>
        {companySettings
          ? "TVA non applicable, art. 293 B du CGI"
          : "Informations sur la TVA indisponibles"}
      </Text>
      <Text style={styles.text}>
        En cas de retard de paiement, une pénalité de 3 fois le taux d'intérêt
        légal sera appliquée, à laquelle s'ajoutera une indemnité forfaitaire
        pour frais de recouvrement de 40€.
      </Text>
    </View>
  );
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
