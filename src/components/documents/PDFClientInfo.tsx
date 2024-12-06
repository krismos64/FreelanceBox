import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { Client } from '../../types';
import { styles } from './styles';

interface PDFClientInfoProps {
  client: Client;
}

export const PDFClientInfo: React.FC<PDFClientInfoProps> = ({ client }) => (
  <View style={styles.clientSection}>
    <Text style={styles.clientTitle}>Client</Text>
    <Text style={styles.clientInfo}>{client.name}</Text>
    <Text style={styles.clientInfo}>{client.address}</Text>
    <Text style={styles.clientInfo}>
      {client.postalCode} {client.city}
    </Text>
    <Text style={styles.clientInfo}>{client.email}</Text>
    <Text style={styles.clientInfo}>{client.phone}</Text>
    {client.siret && (
      <Text style={styles.clientInfo}>SIRET : {client.siret}</Text>
    )}
  </View>
);