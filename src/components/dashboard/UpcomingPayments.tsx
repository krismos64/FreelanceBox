import React from 'react';
import { Card } from '../ui/Card';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/dateUtils';

export const UpcomingPayments: React.FC = () => {
  const { state } = useApp();
  const upcomingPayments = state.documents
    .filter(
      (doc) =>
        doc.type === 'invoice' &&
        doc.status !== 'paid' &&
        doc.dueDate &&
        new Date(doc.dueDate) > new Date()
    )
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 5);

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Paiements à venir</h2>
      <div className="space-y-4">
        {upcomingPayments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-800">{doc.number}</p>
              <p className="text-sm text-gray-500">{doc.client.name}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{doc.total.toFixed(2)} €</p>
              <p className="text-sm text-gray-500">
                Échéance : {formatDate(doc.dueDate!)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};