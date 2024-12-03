import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { Client } from '../../types';

const styles = StyleSheet.create({
  clientSection: {
    marginBottom: 40,
    padding: 15,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2563eb',
  },
  info: {
    fontSize: 11,
    marginBottom: 3,
    color: '#4b5563',
  },
});

interface PDFClientInfoProps {
  client: Client;
}

export const PDFClientInfo: React.FC<PDFClientInfoProps> = ({ client }) => (
  <View style={styles.clientSection}>
    <Text style={styles.title}>Client</Text>
    <Text style={styles.info}>{client.name}</Text>
    <Text style={styles.info}>{client.address}</Text>
    <Text style={styles.info}>
      {client.postalCode} {client.city}
    </Text>
    <Text style={styles.info}>{client.email}</Text>
    <Text style={styles.info}>{client.phone}</Text>
    {client.siret && (
      <Text style={styles.info}>SIRET : {client.siret}</Text>
    )}
  </View>
);