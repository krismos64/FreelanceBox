import React from 'react';
import { Eye, Pencil, Trash2, FileText, FileDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { Document } from '../../types';
import { useApp } from '../../context/AppContext';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFDocument } from '../pdf/PDFDocument';
import { useNavigate } from 'react-router-dom';
import { showSuccess } from '../../utils/notifications';

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
  const navigate = useNavigate();

  const handleDelete = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      dispatch({ type: 'DELETE_DOCUMENT', payload: document.id });
      showSuccess('Document supprimé avec succès');
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="secondary" size="sm" onClick={onPreview}>
        <Eye size={16} className="mr-1" />
        Aperçu
      </Button>

      <PDFDownloadLink
        document={<PDFDocument document={document} />}
        fileName={`${document.number}.pdf`}
        className="no-underline"
      >
        {({ loading, error }) => (
          <Button variant="secondary" size="sm" disabled={loading}>
            <FileDown size={16} className="mr-1" />
            {loading ? 'Chargement...' : 'PDF'}
          </Button>
        )}
      </PDFDownloadLink>

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