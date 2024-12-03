import React from 'react';
import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { Document } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/dateUtils';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: '#2563eb',
    paddingBottom: 20,
  },
  companyInfo: {
    width: '50%',
  },
  logoContainer: {
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 50,
    objectFit: 'contain',
    marginBottom: 10,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2563eb',
  },
  companyDetails: {
    fontSize: 10,
    marginBottom: 3,
    color: '#4b5563',
  },
  documentInfo: {
    width: '40%',
    alignItems: 'flex-end',
  },
  documentTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 12,
  },
  documentNumber: {
    fontSize: 14,
    marginBottom: 8,
    color: '#4b5563',
  },
  documentDate: {
    fontSize: 10,
    marginBottom: 3,
    color: '#4b5563',
  },
});

interface PDFHeaderProps {
  document: Document;
}

export const PDFHeader: React.FC<PDFHeaderProps> = ({ document }) => {
  const { state } = useApp();
  const { companySettings } = state;

  return (
    <View style={styles.header}>
      <View style={styles.companyInfo}>
        {companySettings.logo && (
          <View style={styles.logoContainer}>
            <Image src={companySettings.logo} style={styles.logo} />
          </View>
        )}
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
        <Text style={styles.documentDate}>Date : {formatDate(document.date)}</Text>
        {document.type === 'quote' && document.validUntil && (
          <Text style={styles.documentDate}>
            Valable jusqu'au : {formatDate(document.validUntil)}
          </Text>
        )}
      </View>
    </View>
  );
};