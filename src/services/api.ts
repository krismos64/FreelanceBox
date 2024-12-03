import axios from 'axios';
import { Client, Document, CompanySettings } from '../types';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Clients
export const fetchClients = async () => {
  const response = await api.get('/clients');
  return response.data;
};

export const createClient = async (client: Omit<Client, 'id'>) => {
  const response = await api.post('/clients', client);
  return response.data;
};

export const updateClient = async (id: string, client: Partial<Client>) => {
  const response = await api.put(`/clients/${id}`, client);
  return response.data;
};

export const deleteClient = async (id: string) => {
  await api.delete(`/clients/${id}`);
};

// Documents
export const fetchDocuments = async () => {
  const response = await api.get('/documents');
  return response.data;
};

export const createDocument = async (document: Omit<Document, 'id'>) => {
  const response = await api.post('/documents', document);
  return response.data;
};

export const updateDocument = async (id: string, document: Partial<Document>) => {
  const response = await api.put(`/documents/${id}`, document);
  return response.data;
};

export const deleteDocument = async (id: string) => {
  await api.delete(`/documents/${id}`);
};

// Company Settings
export const fetchCompanySettings = async () => {
  const response = await api.get('/settings');
  return response.data;
};

export const updateCompanySettings = async (settings: CompanySettings) => {
  const response = await api.put('/settings', settings);
  return response.data;
};

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;