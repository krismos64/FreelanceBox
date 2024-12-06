import React from "react";
import { Document, Page, View, StyleSheet } from "@react-pdf/renderer";
import { Document as IDocument } from "../../types";
import { PDFHeader } from "./PDFHeader";
import { PDFClientInfo } from "./PDFClientInfo";
import { PDFItemsTable } from "./PDFItemsTable";
import { PDFTotals } from "./PDFTotals";
import PDFFooter from "./PDFFooter";
import { PDFNotes } from "./PDFNotes";
import { PDFValidation } from "./PDFValidation";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#1f2937",
  },
  container: {
    flex: 1,
  },
});

interface PDFDocumentProps {
  document: IDocument;
}

export const PDFDocument: React.FC<PDFDocumentProps> = ({ document }) => {
  // Validation des données
  if (!document) {
    console.error("Document non fourni à PDFDocument.");
    return null;
  }
  if (!document.client) {
    console.error("Client manquant dans le document.");
    return null;
  }
  if (!document.items) {
    console.error("Articles manquants dans le document.");
    return null;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <PDFHeader document={document} />
          <PDFClientInfo client={document.client} />
          <PDFItemsTable items={document.items} />
          <PDFTotals subtotal={document.subtotal} total={document.total} />
          {document.notes && <PDFNotes notes={document.notes} />}
          {document.type === "quote" && <PDFValidation />}
          <PDFFooter />
        </View>
      </Page>
    </Document>
  );
};
