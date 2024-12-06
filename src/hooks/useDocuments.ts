import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../services/api";
import { showSuccess, showError } from "../utils/notifications";
import { Document } from "../types";

export const useDocuments = () => {
  const queryClient = useQueryClient();

  const { data: documents, isLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      try {
        return await fetchDocuments();
      } catch (error) {
        showError("Erreur lors du chargement des documents");
        throw error;
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: (document: Omit<Document, "id">) => createDocument(document),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      showSuccess("Document créé avec succès");
    },
    onError: () => {
      showError("Erreur lors de la création du document");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      document,
    }: {
      id: string;
      document: Partial<Document>;
    }) => updateDocument(id, document),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      showSuccess("Document mis à jour avec succès");
    },
    onError: () => {
      showError("Erreur lors de la mise à jour du document");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      showSuccess("Document supprimé avec succès");
    },
    onError: () => {
      showError("Erreur lors de la suppression du document");
    },
  });

  return {
    documents,
    isLoading,
    createDocument: createMutation.mutate,
    updateDocument: updateMutation.mutate,
    deleteDocument: deleteMutation.mutate,
  };
};
