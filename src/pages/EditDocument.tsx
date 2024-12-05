import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DocumentForm } from "../components/documents/DocumentForm";
import { useApp } from "../context/AppContext";

interface EditDocumentProps {
  type: string;
}

const EditDocument: React.FC<EditDocumentProps> = ({ type }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useApp();

  const document = state.documents.find((doc) => doc.id === id);

  if (!document) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Document non trouvé
        </h1>
        <p className="text-gray-600 mb-4">
          Le document que vous essayez de modifier n'existe pas.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800"
        >
          Retourner à la liste
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Modifier {type === "quote" ? "le devis" : "la facture"}{" "}
        {document.number}
      </h1>
      <DocumentForm type={type as "quote" | "invoice"} initialData={document} />
    </div>
  );
};

export default EditDocument;
