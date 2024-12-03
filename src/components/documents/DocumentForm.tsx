import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { ServiceItemForm } from './ServiceItemForm';
import { Document, ServiceItem, Client } from '../../types';
import { useApp } from '../../context/AppContext';
import { generateDocumentNumber } from '../../utils/documentUtils';
import { generateDueDate } from '../../utils/dateUtils';
import { Plus } from 'lucide-react';
import { showSuccess } from '../../utils/notifications';
import { motion, AnimatePresence } from 'framer-motion';

interface DocumentFormProps {
  type: 'quote' | 'invoice';
  initialData?: Document;
  onSubmit: (document: Document) => void;
}

export const DocumentForm: React.FC<DocumentFormProps> = ({
  type,
  initialData,
  onSubmit,
}) => {
  const { state } = useApp();
  const today = new Date().toISOString().split('T')[0];

  const [document, setDocument] = useState<Document>(
    initialData || {
      id: uuidv4(),
      type,
      number: generateDocumentNumber(type, state.documents),
      date: today,
      client: {
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        city: '',
      },
      items: [],
      status: 'Généré',
      subtotal: 0,
      total: 0,
      notes: '',
      validUntil: type === 'quote' ? generateDueDate(today, 30) : undefined,
    }
  );

  const calculateTotals = (items: ServiceItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    return {
      subtotal,
      total: subtotal,
    };
  };

  const handleClientChange = (clientId: string) => {
    const selectedClient = state.clients.find((c) => c.id === clientId);
    if (selectedClient) {
      setDocument((prev) => ({
        ...prev,
        client: selectedClient,
      }));
    }
  };

  const handleDateChange = (field: 'date' | 'validUntil', value: string) => {
    setDocument((prev) => ({
      ...prev,
      [field]: value || today,
      ...(field === 'date' && type === 'quote' && {
        validUntil: generateDueDate(value || today, 30),
      }),
    }));
  };

  const handleAddItem = () => {
    const newItem: ServiceItem = {
      id: uuidv4(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };

    setDocument((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const handleUpdateItem = (updatedItem: ServiceItem) => {
    setDocument((prev) => {
      const newItems = prev.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      const { subtotal, total } = calculateTotals(newItems);
      return {
        ...prev,
        items: newItems,
        subtotal,
        total,
      };
    });
  };

  const handleDeleteItem = (itemId: string) => {
    setDocument((prev) => {
      const newItems = prev.items.filter((item) => item.id !== itemId);
      const { subtotal, total } = calculateTotals(newItems);
      return {
        ...prev,
        items: newItems,
        subtotal,
        total,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(document);
    showSuccess(
      `${type === 'quote' ? 'Devis' : 'Facture'} ${
        initialData ? 'modifié' : 'créé'
      } avec succès`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Numéro"
              value={document.number}
              disabled
            />
            <Input
              label="Date"
              type="date"
              value={document.date}
              onChange={(e) => handleDateChange('date', e.target.value)}
            />
            {type === 'quote' && (
              <Input
                label="Valable jusqu'au"
                type="date"
                value={document.validUntil || ''}
                onChange={(e) => handleDateChange('validUntil', e.target.value)}
              />
            )}
            <Select
              label="Client"
              value={document.client.id}
              onChange={(e) => handleClientChange(e.target.value)}
              options={[
                { value: '', label: 'Sélectionner un client' },
                ...state.clients.map((client) => ({
                  value: client.id,
                  label: client.name,
                })),
              ]}
            />
          </div>
        </Card>

        <Card className="mb-6">
          <h3 className="text-lg font-medium mb-4">Services</h3>
          <AnimatePresence>
            {document.items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ServiceItemForm
                  item={item}
                  onChange={handleUpdateItem}
                  onDelete={() => handleDeleteItem(item.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="mt-4">
            <Button type="button" variant="secondary" onClick={handleAddItem}>
              <Plus size={20} className="mr-2" />
              Ajouter un service
            </Button>
          </div>
        </Card>

        <Card className="mb-6">
          <div className="flex flex-col items-end">
            <div className="w-64">
              <div className="flex justify-between py-2">
                <span>Total HT</span>
                <span>{document.subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between py-2 text-sm text-gray-600">
                <span>TVA non applicable, art. 293 B du CGI</span>
                <span>0.00 €</span>
              </div>
              <div className="flex justify-between py-2 font-bold border-t">
                <span>Total TTC</span>
                <span>{document.total.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mb-6">
          <Input
            label="Notes"
            as="textarea"
            rows={4}
            value={document.notes}
            onChange={(e) =>
              setDocument((prev) => ({ ...prev, notes: e.target.value }))
            }
          />
        </Card>

        <div className="flex justify-end">
          <Button type="submit">
            {initialData ? 'Mettre à jour' : 'Créer'} {type === 'quote' ? 'le devis' : 'la facture'}
          </Button>
        </div>
      </motion.div>
    </form>
  );
};