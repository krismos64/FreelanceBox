import axios from 'axios';
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
export const createClient = async (client) => {
    const response = await api.post('/clients', client);
    return response.data;
};
export const updateClient = async (id, client) => {
    const response = await api.put(`/clients/${id}`, client);
    return response.data;
};
export const deleteClient = async (id) => {
    await api.delete(`/clients/${id}`);
};
// Documents
export const fetchDocuments = async () => {
    const response = await api.get('/documents');
    return response.data;
};
export const createDocument = async (document) => {
    const response = await api.post('/documents', document);
    return response.data;
};
export const updateDocument = async (id, document) => {
    const response = await api.put(`/documents/${id}`, document);
    return response.data;
};
export const deleteDocument = async (id) => {
    await api.delete(`/documents/${id}`);
};
// Company Settings
export const fetchCompanySettings = async () => {
    const response = await api.get('/settings');
    return response.data;
};
export const updateCompanySettings = async (settings) => {
    const response = await api.put('/settings', settings);
    return response.data;
};
// Intercepteur pour gérer les erreurs
api.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
export default api;
