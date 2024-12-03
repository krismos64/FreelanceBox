import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { useApp } from '../../context/AppContext';

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
  },
  text: {
    fontSize: 8,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 2,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginBottom: 10,
  },
  companyInfo: {
    fontSize: 8,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export const PDFFooter: React.FC = () => {
  const { state } = useApp();
  const { companySettings } = state;

  return (
    <View style={styles.footer}>
      <View style={styles.divider} />
      <Text style={styles.companyInfo}>
        {companySettings.name} - SIRET : {companySettings.siret}
      </Text>
      <Text style={styles.text}>
        Dispensé d'immatriculation en application de l'article L 123-1-1 du code de commerce
      </Text>
      <Text style={styles.text}>
        TVA non applicable, art. 293 B du CGI
      </Text>
      <Text style={styles.text}>
        En cas de retard de paiement, une pénalité de 3 fois le taux d'intérêt légal sera appliquée,
        à laquelle s'ajoutera une indemnité forfaitaire pour frais de recouvrement de 40€.
      </Text>
    </View>
  );
};