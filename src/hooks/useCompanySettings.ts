import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCompanySettings, updateCompanySettings } from '../services/api';
import { showSuccess, showError } from '../utils/notifications';
import { CompanySettings } from '../types';

export const useCompanySettings = () => {
  const queryClient = useQueryClient();

  // Correction de la configuration de useQuery
  const { data: settings, isLoading, isError } = useQuery({
    queryKey: ['companySettings'],
    queryFn: fetchCompanySettings,
    onError: (error: any) => {
      showError(
        `Erreur lors du chargement des paramètres : ${
          error.message || 'Inconnue'
        }`
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: (newSettings: CompanySettings) =>
      updateCompanySettings(newSettings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companySettings'] });
      showSuccess("Paramètres de l'entreprise mis à jour avec succès");
    },
    onError: (error: any) => {
      showError(
        `Erreur lors de la mise à jour : ${error.message || 'Inconnue'}`
      );
    },
  });

  return {
    settings,
    isLoading,
    isError,
    updateSettings: updateMutation.mutate,
  };
};