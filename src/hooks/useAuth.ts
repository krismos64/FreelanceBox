import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginFormData, RegisterFormData } from '../types/auth';
import { useAuth } from '../context/AuthContext';
import { login, register, setupAxiosInterceptors } from '../services/auth';
import { showSuccess, showError } from '../utils/notifications';

export const useAuthService = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleLogin = useCallback(async (data: LoginFormData) => {
    try {
      const response = await login(data);
      const { user, token } = response;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setupAxiosInterceptors(token);
      dispatch({ type: 'LOGIN', payload: { user, token } });
      
      showSuccess('Connexion réussie');
      navigate('/');
    } catch (error: any) {
      showError(error.response?.data?.message || 'Erreur lors de la connexion');
    }
  }, [dispatch, navigate]);

  const handleRegister = useCallback(async (data: RegisterFormData) => {
    try {
      await register(data);
      showSuccess('Compte créé avec succès');
      navigate('/login');
    } catch (error: any) {
      showError(error.response?.data?.message || 'Erreur lors de la création du compte');
    }
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setupAxiosInterceptors(null);
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
    showSuccess('Déconnexion réussie');
  }, [dispatch, navigate]);

  return {
    handleLogin,
    handleRegister,
    handleLogout,
  };
};