import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCompanySettings, updateCompanySettings } from '../services/api';
import { showSuccess, showError } from '../utils/notifications';
import { CompanySettings } from '../types';

export const useCompanySettings = () => {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['companySettings'],
    queryFn: fetchCompanySettings,
    onError: () => {
      showError('Erreur lors du chargement des paramètres de l\'entreprise');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (newSettings: CompanySettings) => updateCompanySettings(newSettings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companySettings'] });
      showSuccess('Paramètres de l\'entreprise mis à jour avec succès');
    },
    onError: () => {
      showError('Erreur lors de la mise à jour des paramètres');
    },
  });

  return {
    settings,
    isLoading,
    updateSettings: updateMutation.mutate,
  };
};