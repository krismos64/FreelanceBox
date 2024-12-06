import axios from "axios";
const API_URL = "http://localhost:3000/api";
const authApi = axios.create({
  baseURL: `${API_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const login = async (data) => {
  const response = await authApi.post("/login", data);
  return response.data;
};
export const register = async (data) => {
  const response = await authApi.post("/register", {
    name: data.name,
    email: data.email,
    password: data.password,
  });
  return response.data;
};
export const getCurrentUser = async (token) => {
  const response = await authApi.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const setupAxiosInterceptors = (token) => {
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
