import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  totalsSection: {
    marginTop: 20,
    marginLeft: 'auto',
    width: '40%',
  },
  totalRow: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingVertical: 3,
  },
  totalLabel: {
    flex: 2,
    textAlign: 'right',
    paddingRight: 10,
    color: '#4b5563',
  },
  totalValue: {
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  totalTTC: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#2563eb',
  },
  tvaInfo: {
    fontSize: 9,
    color: '#6b7280',
    textAlign: 'right',
    marginTop: 5,
  },
});

interface PDFTotalsProps {
  subtotal: number;
  total: number;
}

export const PDFTotals: React.FC<PDFTotalsProps> = ({ subtotal, total }) => {
  return (
    <View style={styles.totalsSection}>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total HT :</Text>
        <Text style={styles.totalValue}>{subtotal.toFixed(2)} €</Text>
      </View>
      
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>TVA :</Text>
        <Text style={styles.totalValue}>0.00 €</Text>
      </View>
      
      <View style={[styles.totalRow, styles.totalTTC]}>
        <Text style={styles.totalLabel}>Total TTC :</Text>
        <Text style={styles.totalValue}>{total.toFixed(2)} €</Text>
      </View>
      
      <Text style={styles.tvaInfo}>TVA non applicable, art. 293 B du CGI</Text>
    </View>
  );
};