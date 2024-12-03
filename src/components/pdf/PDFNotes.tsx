import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  notes: {
    marginTop: 40,
    padding: 15,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2563eb',
  },
  text: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 1.4,
  },
});

interface PDFNotesProps {
  notes: string;
}

export const PDFNotes: React.FC<PDFNotesProps> = ({ notes }) => (
  <View style={styles.notes}>
    <Text style={styles.title}>Notes :</Text>
    <Text style={styles.text}>{notes}</Text>
  </View>
);