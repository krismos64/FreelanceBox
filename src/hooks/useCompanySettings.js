import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCompanySettings, updateCompanySettings } from "../services/api";
import { showSuccess, showError } from "../utils/notifications";
export const useCompanySettings = () => {
    const queryClient = useQueryClient();
    // Récupération des paramètres de l'entreprise
    const { data: settings, isLoading, isError, refetch, } = useQuery({
        queryKey: ["companySettings"],
        queryFn: async () => {
            try {
                return await fetchCompanySettings();
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
                showError(`Erreur lors du chargement des paramètres : ${errorMessage}`);
                throw error;
            }
        },
        enabled: true,
    });
    // Fonction pour mettre à jour les paramètres
    const updateSettings = async (newSettings) => {
        try {
            const updatedSettings = {
                ...settings,
                ...newSettings,
            };
            await updateCompanySettings(updatedSettings); // Effectue la mise à jour
            queryClient.setQueryData(["companySettings"], updatedSettings); // Met à jour localement avec les nouvelles données
            showSuccess("Paramètres de l'entreprise mis à jour avec succès");
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
            showError(`Erreur lors de la mise à jour : ${errorMessage}`);
        }
    };
    return {
        settings: settings || {
            // Valeurs par défaut
            name: "",
            address: "",
            postalCode: "",
            city: "",
            phone: "",
            email: "",
            website: "",
            siret: "",
        },
        isLoading,
        isError,
        refetchSettings: refetch, // Pour forcer un rafraîchissement si nécessaire
        updateSettings,
    };
};