import React from "react";
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

export const PDFLegalSection: React.FC = () => (
  <View style={styles.legalSection}>
    <Text style={styles.legalText}>
      Dispensé d'immatriculation au registre du commerce et des sociétés (RCS)
      et au répertoire des métiers (RM)
    </Text>
    <Text style={styles.legalText}>
      TVA non applicable, art. 293 B du Code Général des Impôts
    </Text>
    <Text style={styles.legalText}>
      En cas de retard de paiement, une pénalité de 3 fois le taux d'intérêt
      légal sera appliquée, à laquelle s'ajoutera une indemnité forfaitaire pour
      frais de recouvrement de 40€.
    </Text>
  </View>
);
