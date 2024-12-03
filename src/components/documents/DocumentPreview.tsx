import React from 'react';
import { X } from 'lucide-react';
import { Document } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { Button } from '../ui/Button';

interface DocumentPreviewProps {
  document: Document;
  onClose: () => void;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ document, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {document.type === 'quote' ? 'Devis' : 'Facture'} {document.number}
          </h2>
          <Button variant="secondary" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Informations</h3>
            <p className="text-gray-600 dark:text-gray-400">Date : {formatDate(document.date)}</p>
            {document.type === 'quote' && document.validUntil && (
              <p className="text-gray-600 dark:text-gray-400">Valable jusqu'au : {formatDate(document.validUntil)}</p>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Client</h3>
            <p className="text-gray-600 dark:text-gray-400">{document.client.name}</p>
            <p className="text-gray-600 dark:text-gray-400">{document.client.email}</p>
            <p className="text-gray-600 dark:text-gray-400">{document.client.phone}</p>
            <p className="text-gray-600 dark:text-gray-400">{document.client.address}</p>
            {document.client.siret && <p className="text-gray-600 dark:text-gray-400">SIRET : {document.client.siret}</p>}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">Services</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Description</th>
                  <th className="text-right">Quantité</th>
                  <th className="text-right">Prix unitaire</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {document.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.description}</td>
                    <td className="text-right">{item.quantity}</td>
                    <td className="text-right">{item.unitPrice.toFixed(2)} €</td>
                    <td className="text-right">{item.total.toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="w-64">
            <div className="flex justify-between py-2">
              <span className="text-gray-600 dark:text-gray-400">Total HT</span>
              <span className="font-medium">{document.subtotal.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between py-2 text-sm text-gray-500 dark:text-gray-400">
              <span>TVA non applicable, art. 293 B du CGI</span>
              <span>0.00 €</span>
            </div>
            <div className="flex justify-between py-2 font-bold border-t border-gray-200 dark:border-gray-700">
              <span>Total TTC</span>
              <span>{document.total.toFixed(2)} €</span>
            </div>
          </div>
        </div>

        {document.notes && (
          <div className="mt-8">
            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Notes</h3>
            <p className="text-gray-600 dark:text-gray-400">{document.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};