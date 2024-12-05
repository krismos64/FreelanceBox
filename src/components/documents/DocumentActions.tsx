import React from "react";
import { Eye, Pencil, Trash2, FileDown } from "lucide-react";
import { Button } from "../ui/Button";
import { Document } from "../../types";
import { useApp } from "../../context/AppContext";
import { BlobProvider } from "@react-pdf/renderer";
import { PDFDocument } from "../pdf/PDFDocument";
import { showSuccess } from "../../utils/notifications";

interface DocumentActionsProps {
  document: Document;
  onPreview: () => void;
  onEdit: () => void;
}

export const DocumentActions: React.FC<DocumentActionsProps> = ({
  document,
  onPreview,
  onEdit,
}) => {
  const { dispatch } = useApp();

  const handleDelete = (): void => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce document ?")) {
      dispatch({ type: "DELETE_DOCUMENT", payload: document.id });
      showSuccess("Document supprimé avec succès");
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="secondary" size="sm" onClick={onPreview}>
        <Eye size={16} className="mr-1" />
        Aperçu
      </Button>

      <BlobProvider document={<PDFDocument document={document} />}>
        {({ url, loading }) =>
          loading ? (
            <Button variant="secondary" size="sm" disabled>
              <FileDown size={16} className="mr-1" />
              Chargement...
            </Button>
          ) : (
            url && (
              <a
                href={url || undefined} // Conversion explicite de null à undefined
                download={`${document.number}.pdf`}
                className="no-underline"
              >
                <Button variant="secondary" size="sm">
                  <FileDown size={16} className="mr-1" />
                  PDF
                </Button>
              </a>
            )
          )
        }
      </BlobProvider>

      <Button variant="secondary" size="sm" onClick={onEdit}>
        <Pencil size={16} className="mr-1" />
        Modifier
      </Button>

      <Button variant="danger" size="sm" onClick={handleDelete}>
        <Trash2 size={16} className="mr-1" />
        Supprimer
      </Button>
    </div>
  );
};
