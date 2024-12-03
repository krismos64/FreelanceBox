import React from 'react';
import { Card } from '../components/ui/Card';
import { useApp } from '../context/AppContext';

const Stats: React.FC = () => {
  const { state } = useApp();

  // Nombre total de clients
  const totalClients = state.clients.length;

  // Chiffre d'affaires total (factures payées uniquement)
  const totalRevenue = state.documents
    .filter((doc) => doc.type === 'invoice' && doc.status === 'Payé')
    .reduce((sum, doc) => sum + doc.total, 0);

  // Chiffre d'affaires mensuel
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyRevenue = state.documents
    .filter((doc) => {
      const docDate = new Date(doc.date);
      return (
        doc.type === 'invoice' &&
        doc.status === 'Payé' &&
        docDate.getMonth() === currentMonth &&
        docDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, doc) => sum + doc.total, 0);

  // Chiffre d'affaires annuel
  const yearlyRevenue = state.documents
    .filter((doc) => {
      const docDate = new Date(doc.date);
      return (
        doc.type === 'invoice' &&
        doc.status === 'Payé' &&
        docDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, doc) => sum + doc.total, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Statistiques</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-medium mb-2">Nombre de clients</h3>
          <p className="text-3xl font-bold text-blue-600">{totalClients}</p>
        </Card>

        <Card>
          <h3 className="text-lg font-medium mb-2">Chiffre d'affaires total</h3>
          <p className="text-3xl font-bold text-green-600">{totalRevenue.toFixed(2)} €</p>
          <p className="text-sm text-gray-500 mt-1">Total des factures payées</p>
        </Card>

        <Card>
          <h3 className="text-lg font-medium mb-2">Chiffre d'affaires mensuel</h3>
          <p className="text-3xl font-bold text-purple-600">{monthlyRevenue.toFixed(2)} €</p>
          <p className="text-sm text-gray-500 mt-1">
            {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-medium mb-2">Chiffre d'affaires annuel</h3>
          <p className="text-3xl font-bold text-orange-600">{yearlyRevenue.toFixed(2)} €</p>
          <p className="text-sm text-gray-500 mt-1">Année {currentYear}</p>
        </Card>
      </div>
    </div>
  );
};

export default Stats;