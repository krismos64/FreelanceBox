import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { ServiceItem } from "../../types";

const styles = StyleSheet.create({
  table: {
    marginVertical: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    padding: 8,
    marginBottom: 1,
  },
  tableHeaderCell: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    padding: 8,
  },
  tableRowEven: {
    backgroundColor: "#f9fafb",
  },
  description: {
    flex: 2,
    paddingRight: 8,
  },
  quantity: {
    width: "15%",
    textAlign: "center",
  },
  unitPrice: {
    width: "20%",
    textAlign: "right",
  },
  total: {
    width: "20%",
    textAlign: "right",
  },
});

interface PDFItemsTableProps {
  items: ServiceItem[];
}

export const PDFItemsTable: React.FC<PDFItemsTableProps> = ({ items }) => {
  return (
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, styles.description]}>
          Description
        </Text>
        <Text style={[styles.tableHeaderCell, styles.quantity]}>Quantité</Text>
        <Text style={[styles.tableHeaderCell, styles.unitPrice]}>
          Prix unitaire
        </Text>
        <Text style={[styles.tableHeaderCell, styles.total]}>Total HT</Text>
      </View>

      {items.map((item, index) => (
        <View
          key={item.id}
          style={[
            styles.tableRow,
            ...(index % 2 === 1 ? [styles.tableRowEven] : []),
          ]}
        >
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <Text style={styles.unitPrice}>{item.unitPrice.toFixed(2)} €</Text>
          <Text style={styles.total}>{item.total.toFixed(2)} €</Text>
        </View>
      ))}
    </View>
  );
};
