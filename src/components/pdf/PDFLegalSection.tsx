import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from './styles';

export const PDFLegalSection: React.FC = () => (
  <View style={styles.legalSection}>
    <Text style={styles.legalText}>
      Dispensé d'immatriculation au registre du commerce et des sociétés (RCS) et au répertoire des métiers (RM)
    </Text>
    <Text style={styles.legalText}>
      TVA non applicable, art. 293 B du Code Général des Impôts
    </Text>
    <Text style={styles.legalText}>
      En cas de retard de paiement, une pénalité de 3 fois le taux d'intérêt légal sera appliquée, 
      à laquelle s'ajoutera une indemnité forfaitaire pour frais de recouvrement de 40€.
    </Text>
  </View>
);