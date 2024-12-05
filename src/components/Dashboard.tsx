import React from "react";
import { Euro, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { DashboardCard } from "./dashboard/DashboardCard";
import { RecentDocuments } from "./dashboard/RecentDocuments";
import { UpcomingPayments } from "./dashboard/UpcomingPayments";
import { useApp } from "../context/AppContext";

const Dashboard: React.FC = () => {
  const { state } = useApp();

  const totalRevenue = state.documents
    .filter((doc) => doc.type === "invoice" && doc.status === "Payé")
    .reduce((sum, doc) => sum + doc.total, 0);

  const pendingQuotes = state.documents.filter(
    (doc) => doc.type === "quote" && doc.status === "Envoyé"
  ).length;

  const paidInvoices = state.documents.filter(
    (doc) => doc.type === "invoice" && doc.status === "Payé"
  ).length;

  const latePayments = state.documents.filter(
    (doc) =>
      doc.type === "invoice" &&
      doc.status !== "Payé" &&
      doc.dueDate &&
      new Date(doc.dueDate) < new Date()
  ).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Chiffre d'affaires"
          value={`${totalRevenue.toFixed(2)} €`}
          icon={<Euro className="text-green-500" />}
          trend="Ce mois"
        />
        <DashboardCard
          title="Devis en attente"
          value={pendingQuotes.toString()}
          icon={<FileText className="text-blue-500" />}
          trend="En attente de réponse"
        />
        <DashboardCard
          title="Factures payées"
          value={paidInvoices.toString()}
          icon={<CheckCircle className="text-green-500" />}
          trend="Total"
        />
        <DashboardCard
          title="Paiements en retard"
          value={latePayments.toString()}
          icon={<AlertCircle className="text-red-500" />}
          trend="À relancer"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDocuments />
        <UpcomingPayments />
      </div>
    </div>
  );
};

export default Dashboard;
