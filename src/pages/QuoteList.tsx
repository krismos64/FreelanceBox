import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { DocumentFilters } from "../components/documents/DocumentFilters";
import { StatusBadge } from "../components/documents/StatusBadge";
import { DocumentActions } from "../components/documents/DocumentActions";
import { DocumentPreview } from "../components/documents/DocumentPreview";
import { useApp } from "../context/AppContext";
import { formatDate } from "../utils/dateUtils";
import { Document } from "../types";

const QuoteList: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateSort, setDateSort] = useState<"asc" | "desc">("desc");
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);

  const quotes = state.documents
    .filter((doc) => doc.type === "quote")
    .filter((doc) => statusFilter === "all" || doc.status === statusFilter)
    .filter(
      (doc) =>
        doc.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.client.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateSort === "asc" ? dateA - dateB : dateB - dateA;
    });

  const handleStatusChange = (
    documentId: string,
    newStatus: Document["status"]
  ) => {
    const document = state.documents.find((doc) => doc.id === documentId);
    if (document) {
      dispatch({
        type: "UPDATE_DOCUMENT",
        payload: { ...document, status: newStatus },
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Devis</h1>
        <Button onClick={() => navigate("/quotes/new")}>
          <Plus size={20} className="mr-2" />
          Nouveau devis
        </Button>
      </div>

      <DocumentFilters
        onStatusChange={setStatusFilter}
        onSearch={setSearchTerm}
        onDateSort={setDateSort}
        type="quote"
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Numéro</th>
                <th className="text-left py-3 px-4">Client</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Valable jusqu'au</th>
                <th className="text-right py-3 px-4">Montant</th>
                <th className="text-center py-3 px-4">Statut</th>
                <th className="text-right py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{quote.number}</td>
                  <td className="py-3 px-4">{quote.client.name}</td>
                  <td className="py-3 px-4">{formatDate(quote.date)}</td>
                  <td className="py-3 px-4">{formatDate(quote.validUntil!)}</td>
                  <td className="py-3 px-4 text-right">
                    {quote.total.toFixed(2)} €
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      <StatusBadge
                        status={quote.status}
                        type="quote"
                        onStatusChange={(newStatus) =>
                          handleStatusChange(quote.id, newStatus)
                        }
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end">
                      <DocumentActions
                        document={quote}
                        onPreview={() => setPreviewDocument(quote)}
                        onEdit={() => navigate(`/quotes/${quote.id}/edit`)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {previewDocument && (
        <DocumentPreview
          document={previewDocument}
          onClose={() => setPreviewDocument(null)}
        />
      )}
    </div>
  );
};

export default QuoteList;
