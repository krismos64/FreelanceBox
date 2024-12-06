import axios, { AxiosInstance } from "axios";
import { LoginFormData, RegisterFormData } from "../types/auth";

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const API_URL = process.env.VITE_API_URL || "http://localhost:3000/api";

const authApi: AxiosInstance = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (
  credentials: LoginFormData
): Promise<AuthResponse> => {
  try {
    const response = await authApi.post<AuthResponse>("/login", credentials);

    if (!response.data.token || !response.data.user) {
      throw new Error("Réponse du serveur invalide");
    }

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    setupAxiosInterceptors(response.data.token);

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    throw error;
  }
};

export const register = async (
  userData: RegisterFormData
): Promise<AuthResponse> => {
  try {
    const response = await authApi.post<AuthResponse>("/register", userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    throw error;
  }
};

export const setupAxiosInterceptors = (token: string): void => {
  authApi.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  authApi.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};
