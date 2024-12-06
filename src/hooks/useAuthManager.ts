import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginFormData } from "../types/auth";

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export function useAuthManager() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      setIsAuthenticated(Boolean(token && user));
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async (credentials: LoginFormData) => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          throw new Error("Échec de l'authentification");
        }

        const data: AuthResponse = await response.json();

        if (!data.token || !data.user) {
          throw new Error("Réponse du serveur invalide");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsAuthenticated(true);

        navigate("/dashboard", { replace: true });
        return data;
      } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        throw error;
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  }, [navigate]);

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
