import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Client } from '../../types';
import { useApp } from '../../context/AppContext';

interface ClientActionsProps {
  client: Client;
  onEdit: () => void;
}

export const ClientActions: React.FC<ClientActionsProps> = ({ client, onEdit }) => {
  const { state, dispatch } = useApp();

  const handleDelete = () => {
    // Vérifier si le client est utilisé dans des documents
    const isClientUsed = state.documents.some((doc) => doc.client.id === client.id);

    if (isClientUsed) {
      alert('Ce client ne peut pas être supprimé car il est utilisé dans des documents.');
      return;
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      dispatch({ type: 'DELETE_CLIENT', payload: client.id });
    }
  };

  return (
    <div className="flex gap-2">
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