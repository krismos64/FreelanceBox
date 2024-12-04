import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Client } from "../../types";

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

interface PDFClientInfoProps {
  client: Client | null;
}

export const PDFClientInfo: React.FC<PDFClientInfoProps> = ({ client }) => {
  if (!client) {
    return (
      <View style={styles.clientSection}>
        <Text style={styles.title}>Client</Text>
        <Text style={styles.info}>Aucune information client disponible</Text>
      </View>
    );
  }

  return (
    <View style={styles.clientSection}>
      <Text style={styles.title}>Client</Text>
      <Text style={styles.info}>{client.name || "Nom non spécifié"}</Text>
      <Text style={styles.info}>
        {client.address || "Adresse non spécifiée"}
      </Text>
      <Text style={styles.info}>
        {(client.postalCode || "Code postal non spécifié") +
          " " +
          (client.city || "Ville non spécifiée")}
      </Text>
      <Text style={styles.info}>{client.email || "Email non spécifié"}</Text>
      <Text style={styles.info}>
        {client.phone || "Téléphone non spécifié"}
      </Text>
      {client.siret && <Text style={styles.info}>SIRET : {client.siret}</Text>}
    </View>
  );
};
