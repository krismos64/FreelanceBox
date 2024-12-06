import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#1f2937',
  },
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
  clientSection: {
    marginBottom: 40,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 4,
  },
  clientTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2563eb',
  },
  clientInfo: {
    fontSize: 11,
    marginBottom: 3,
    color: '#4b5563',
  },
  table: {
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2563eb',
    padding: 8,
    marginBottom: 1,
  },
  tableHeaderCell: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 8,
    backgroundColor: '#ffffff',
  },
  tableRowEven: {
    backgroundColor: '#f9fafb',
  },
  descriptionCell: {
    flex: 2,
    paddingRight: 10,
  },
  quantityCell: {
    width: '15%',
    textAlign: 'center',
  },
  priceCell: {
    width: '20%',
    textAlign: 'right',
  },
  totalCell: {
    width: '20%',
    textAlign: 'right',
  },
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
  notes: {
    marginTop: 40,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 4,
  },
  notesTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2563eb',
  },
  notesText: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 1.4,
  },
  legalSection: {
    marginTop: 40,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 4,
  },
  legalText: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 3,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 9,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 15,
  },
  validationBlock: {
    marginTop: 40,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
  },
  validationTitle: {
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