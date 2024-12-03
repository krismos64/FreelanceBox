import { Document } from '../types';

export const generateDocumentNumber = (
  type: 'quote' | 'invoice',
  documents: Document[]
): string => {
  const currentYear = new Date().getFullYear();
  const typePrefix = type === 'quote' ? 'D' : 'F';
  const existingDocs = documents.filter((doc) => doc.type === type);
  const number = (existingDocs.length + 1).toString().padStart(4, '0');
  return `${typePrefix}${currentYear}-${number}`;
};