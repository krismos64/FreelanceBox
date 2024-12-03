import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Document } from '../../types';

interface PDFGeneratorProps {
  document: Document;
  children: (props: { loading: boolean }) => React.ReactNode;
}

export const PDFGenerator: React.FC<PDFGeneratorProps> = ({ document, children }) => {
  return (
    <PDFDownloadLink
      document={<PDFDocument document={document} />}
      fileName={`${document.number}.pdf`}
    >
      {({ loading }) => children({ loading })}
    </PDFDownloadLink>
  );
};

import { Document as PDFDoc, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from '../../utils/dateUtils';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  info: {
    fontSize: 12,
    marginBottom: 5,
  },
  clientInfo: {
    marginTop: 20,
    marginBottom: 20,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    paddingBottom: 5,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
  },
  description: {
    flex: 2,
  },
  quantity: {
    flex: 1,
    textAlign: 'right',
  },
  price: {
    flex: 1,
    textAlign: 'right',
  },
  total: {
    flex: 1,
    textAlign: 'right',
  },
  totals: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    color: '#666',
  },
});

const PDFDocument: React.FC<{ document: Document }> = ({ document }) => (
  <PDFDoc>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {document.type === 'quote' ? 'Devis' : 'Facture'} {document.number}
        </Text>
        <Text style={styles.info}>Date : {formatDate(document.date)}</Text>
        {document.type === 'quote' ? (
          <Text style={styles.info}>Valable jusqu'au : {formatDate(document.validUntil!)}</Text>
        ) : (
          <Text style={styles.info}>Date d'échéance : {formatDate(document.dueDate!)}</Text>
        )}
      </View>

      <View style={styles.clientInfo}>
        <Text style={styles.info}>Client :</Text>
        <Text style={styles.info}>{document.client.name}</Text>
        <Text style={styles.info}>{document.client.address}</Text>
        <Text style={styles.info}>{document.client.email}</Text>
        <Text style={styles.info}>{document.client.phone}</Text>
        {document.client.siret && (
          <Text style={styles.info}>SIRET : {document.client.siret}</Text>
        )}
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.quantity}>Quantité</Text>
          <Text style={styles.price}>Prix unitaire</Text>
          <Text style={styles.total}>Total</Text>
        </View>

        {document.items.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Text style={styles.price}>{item.unitPrice.toFixed(2)} €</Text>
            <Text style={styles.total}>{item.total.toFixed(2)} €</Text>
          </View>
        ))}
      </View>

      <View style={styles.totals}>
        <Text>Total HT : {document.subtotal.toFixed(2)} €</Text>
        <Text>TVA non applicable, art. 293 B du CGI</Text>
        <Text>Total TTC : {document.total.toFixed(2)} €</Text>
      </View>

      {document.notes && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.info}>Notes :</Text>
          <Text style={styles.info}>{document.notes}</Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text>Dispensé d'immatriculation en application de l'article L 123-1-1 du code de commerce</Text>
        <Text>TVA non applicable, art. 293 B du CGI</Text>
      </View>
    </Page>
  </PDFDoc>
);