import React from 'react';
import { Euro, FileText, CheckCircle } from 'lucide-react';
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { RecentDocuments } from '../components/dashboard/RecentDocuments';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { PageTransition } from '../components/PageTransition';

const Dashboard: React.FC = () => {
  const { state } = useApp();

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

  const pendingQuotes = state.documents.filter(
    (doc) => doc.type === 'quote' && doc.status === 'Envoyé'
  ).length;

  const paidInvoices = state.documents.filter(
    (doc) => doc.type === 'invoice' && doc.status === 'Payé'
  ).length;

  const formattedDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Tableau de bord</h1>
        </div>

        <Card>
          <p className="text-lg text-gray-800 dark:text-gray-200">
            Bonjour, nous sommes le {formattedDate}. 
            <br />
            Votre chiffre d'affaires du mois est de {monthlyRevenue.toFixed(2)} €.
          </p>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Chiffre d'affaires mensuel"
            value={`${monthlyRevenue.toFixed(2)} €`}
            icon={<Euro className="text-green-500" size={24} />}
            trend="Ce mois"
          />
          <DashboardCard
            title="Devis en attente"
            value={pendingQuotes.toString()}
            icon={<FileText className="text-blue-500" size={24} />}
            trend="En attente de réponse"
          />
          <DashboardCard
            title="Factures payées"
            value={paidInvoices.toString()}
            icon={<CheckCircle className="text-green-500" size={24} />}
            trend="Total"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentDocuments />
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;