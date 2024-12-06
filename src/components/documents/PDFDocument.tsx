import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { Document as IDocument } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/dateUtils';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    borderBottom: 1,
    borderColor: '#2563eb',
    paddingBottom: 10,
  },
  companyInfo: {
    width: '50%',
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2563eb',
  },
  companyDetails: {
    marginBottom: 3,
    fontSize: 10,
  },
  documentInfo: {
    width: '40%',
    alignItems: 'flex-end',
  },
  documentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2563eb',
  },
  documentNumber: {
    fontSize: 12,
    marginBottom: 5,
  },
  clientSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  clientTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2563eb',
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 8,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    padding: 8,
  },
  description: { width: '40%' },
  quantity: { width: '20%', textAlign: 'center' },
  price: { width: '20%', textAlign: 'right' },
  total: { width: '20%', textAlign: 'right' },
  totalsSection: {
    marginTop: 30,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  totalLabel: {
    width: 150,
    textAlign: 'right',
    marginRight: 10,
  },
  totalValue: {
    width: 80,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 9,
    textAlign: 'center',
    color: '#6b7280',
  },
});

export const PDFDocument: React.FC<{ document: IDocument }> = ({ document }) => {
  const { state } = useApp();
  const { companySettings } = state;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{companySettings.name}</Text>
            <Text style={styles.companyDetails}>{companySettings.address}</Text>
            <Text style={styles.companyDetails}>
              {companySettings.postalCode} {companySettings.city}
            </Text>
            <Text style={styles.companyDetails}>Tél : {companySettings.phone}</Text>
            <Text style={styles.companyDetails}>Email : {companySettings.email}</Text>
            {companySettings.website && (
              <Text style={styles.companyDetails}>Site web : {companySettings.website}</Text>
            )}
            {companySettings.siret && (
              <Text style={styles.companyDetails}>SIRET : {companySettings.siret}</Text>
            )}
          </View>

          <View style={styles.documentInfo}>
            <Text style={styles.documentTitle}>
              {document.type === 'quote' ? 'DEVIS' : 'FACTURE'}
            </Text>
            <Text style={styles.documentNumber}>N° {document.number}</Text>
            <Text>Date : {formatDate(document.date)}</Text>
            {document.type === 'quote' && document.validUntil && (
              <Text>Valable jusqu'au : {formatDate(document.validUntil)}</Text>
            )}
          </View>
        </View>

        <View style={styles.clientSection}>
          <Text style={styles.clientTitle}>Client</Text>
          <Text>{document.client.name}</Text>
          <Text>{document.client.address}</Text>
          <Text>
            {document.client.postalCode} {document.client.city}
          </Text>
          <Text>{document.client.email}</Text>
          <Text>{document.client.phone}</Text>
          {document.client.siret && <Text>SIRET : {document.client.siret}</Text>}
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.quantity}>Quantité</Text>
            <Text style={styles.price}>Prix unitaire</Text>
            <Text style={styles.total}>Total HT</Text>
          </View>

          {document.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <Text style={styles.price}>{item.unitPrice.toFixed(2)} €</Text>
              <Text style={styles.total}>{item.total.toFixed(2)} €</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total HT :</Text>
            <Text style={styles.totalValue}>{document.subtotal.toFixed(2)} €</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TVA non applicable, art. 293 B du CGI</Text>
            <Text style={styles.totalValue}>0.00 €</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total TTC :</Text>
            <Text style={styles.totalValue}>{document.total.toFixed(2)} €</Text>
          </View>
        </View>

        {document.notes && (
          <View style={{ marginTop: 30 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Notes :</Text>
            <Text>{document.notes}</Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text>Dispensé d'immatriculation en application de l'article L 123-1-1 du code de commerce</Text>
          <Text>TVA non applicable, art. 293 B du CGI</Text>
        </View>
      </Page>
    </Document>
  );
};