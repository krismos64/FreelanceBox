import React from 'react';
import { Card } from '../ui/Card';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/dateUtils';
import { Link } from 'react-router-dom';

export const RecentDocuments: React.FC = () => {
  const { state } = useApp();
  const recentDocs = state.documents
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Documents récents</h2>
      <div className="space-y-4">
        {recentDocs.map((doc) => (
          <Link
            key={doc.id}
            to={`/${doc.type === 'quote' ? 'quotes' : 'invoices'}/${doc.id}/edit`}
            className="block hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">{doc.number}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{doc.client.name}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800 dark:text-white">{doc.total.toFixed(2)} €</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(doc.date)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
};