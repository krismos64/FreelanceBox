import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { Document } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/dateUtils';
import { styles } from './styles';

interface PDFHeaderProps {
  document: Document;
}

export const PDFHeader: React.FC<PDFHeaderProps> = ({ document }) => {
  const { state } = useApp();
  const { companySettings } = state;

  return (
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