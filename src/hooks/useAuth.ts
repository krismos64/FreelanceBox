import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LoginFormData, RegisterFormData } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { login, register, setupAxiosInterceptors } from "../services/auth";
import { showSuccess, showError } from "../utils/notifications";

export const useAuthService = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  // Fonction utilitaire pour configurer l'état d'authentification
  const setAuthData = (user: object, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setupAxiosInterceptors(token); // Ajoute le token à toutes les requêtes
  };

  // Gestion de la connexion
  const handleLogin = useCallback(
    async (data: LoginFormData) => {
      try {
        const response = await login(data);

        // Vérifions d'abord que nous avons reçu les données attendues
        if (!response || !response.token || !response.user) {
          throw new Error("La réponse du serveur est incomplète");
        }

        // Sauvegardons d'abord les données localement
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        // Mettons à jour le contexte d'authentification
        dispatch({
          type: "LOGIN",
          payload: {
            user: response.user,
            token: response.token,
          },
        });

        // Effectuons la redirection après avoir confirmé que tout est bien en place
        const isAuthenticated = Boolean(localStorage.getItem("token"));
        if (isAuthenticated) {
          showSuccess("Connexion réussie");
          navigate("/dashboard", { replace: true });
        } else {
          throw new Error("Échec de l'authentification");
        }
      } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        showError("Échec de la connexion. Veuillez réessayer.");
      }
    },
    [dispatch, navigate]
  );

  // Gestion de l'inscription
  const handleRegister = useCallback(
    async (data: RegisterFormData) => {
      try {
        const response = await register(data);
        const { user, token } = response;

        setAuthData(user, token);
        dispatch({ type: "LOGIN", payload: { user, token } });

        showSuccess("Inscription réussie");
        navigate("/dashboard"); // Redirection après inscription
      } catch (error: any) {
        showError(
          error.response?.data?.message || "Erreur lors de l'inscription"
        );
      }
    },
    [dispatch, navigate]
  );

  // Gestion de la déconnexion
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setupAxiosInterceptors(null); // Retirer le token des requêtes
    dispatch({ type: "LOGOUT" });
    navigate("/login"); // Redirection vers la page de connexion
    showSuccess("Déconnexion réussie");
  }, [dispatch, navigate]);

  // Ajout d'une vérification pour récupérer l'utilisateur courant
  const getCurrentUser = useCallback(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null; // Retourne les données utilisateur ou null
  }, []);

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    getCurrentUser, // Ajout de cette méthode pour accéder aux infos utilisateur
  };
};
