import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  validationBlock: {
    marginTop: 40,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 10,
    textAlign: 'center',
  },
  signatureLine: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    width: '100%',
  },
  signatureText: {
    marginTop: 10,
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export const PDFValidation: React.FC = () => (
  <View style={styles.validationBlock}>
    <Text style={styles.title}>Bon pour accord</Text>
    <View style={styles.signatureLine} />
    <Text style={styles.signatureText}>Date et signature</Text>
  </View>
);