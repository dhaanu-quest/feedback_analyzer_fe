import { useState, useCallback } from 'react';
import { User, AuthState } from '../types';
import axios from 'axios';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const API_BASE_URL = 'http://localhost:8080/api';

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/signin`, {
        email,
        password,
      });

      const { email: userEmail, token, userId } = response.data;

      setAuthState({
        user: {
          email: userEmail,
          userId: userId,
        },
        isAuthenticated: true,
      });

      localStorage.setItem('auth', JSON.stringify({ email: userEmail, token, userId }));

      return { success: true };
    } catch (error) {

      return { success: false, error: 'Invalid credentials' };
    }
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/signup`, {
        email,
        password,
      });

      const { userInfo } = response.data;

      setAuthState({
        user: {
          email: userInfo.email,
          userId: userInfo.userId,
        },
        isAuthenticated: true,
      });

      localStorage.setItem('auth', JSON.stringify({ userInfo }));

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  }, []);

  const skip = async () => {
    setAuthState({
      user: null,
      isAuthenticated: true,
    });
    
    return { success: true }
  }

  const logout = useCallback(() => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem('auth');
  }, []);

  return {
    ...authState,
    login,
    register,
    logout,
    skip
  };
}