import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClients, createClient, updateClient, deleteClient } from '../services/api';
import { showSuccess, showError } from '../utils/notifications';
import { Client } from '../types';

export const useClients = () => {
  const queryClient = useQueryClient();

  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
    onError: () => {
      showError('Erreur lors du chargement des clients');
    },
  });

  const createMutation = useMutation({
    mutationFn: (client: Omit<Client, 'id'>) => createClient(client),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      showSuccess('Client ajouté avec succès');
    },
    onError: () => {
      showError('Erreur lors de l\'ajout du client');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, client }: { id: string; client: Partial<Client> }) => 
      updateClient(id, client),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      showSuccess('Client mis à jour avec succès');
    },
    onError: () => {
      showError('Erreur lors de la mise à jour du client');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      showSuccess('Client supprimé avec succès');
    },
    onError: () => {
      showError('Erreur lors de la suppression du client');
    },
  });

  return {
    clients,
    isLoading,
    createClient: createMutation.mutate,
    updateClient: updateMutation.mutate,
    deleteClient: deleteMutation.mutate,
  };
};