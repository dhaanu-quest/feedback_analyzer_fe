import { useState, useEffect, useCallback } from 'react';
import { User, AuthState } from '../types';
import axios from 'axios';

export function useAuth() {
  const initialAuthState = (): AuthState => {
    const storedData = localStorage.getItem('auth');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        return {
          user: {
            email: parsedData.email,
            userId: parsedData.userId,
          },
          isAuthenticated: true,
        };
      } catch (error) {
        console.error('Error parsing auth data from localStorage:', error);
      }
    }
    return { user: null, isAuthenticated: false };
  };

  const initialUserData = (): { userId: string; email: string } | null => {
    const storedData = localStorage.getItem('auth');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        return {
          email: parsedData.email,
          userId: parsedData.userId,
        };
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
    return null;
  };

  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const [userData, setUserData] = useState<{ userId: string; email: string } | null>(initialUserData);

  const API_BASE_URL = 'http://localhost:8080/api';

  useEffect(() => {
    if (userData) {
      localStorage.setItem('auth', JSON.stringify(userData));
    } else {
      localStorage.removeItem('auth');
    }
  }, [userData]);

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

      setUserData({
        email: userEmail,
        userId: userId,
      });

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

      setUserData({
        email: userInfo.email,
        userId: userInfo.userId,
      });

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
    setUserData(null);

    return { success: true };
  };

  const logout = useCallback(() => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
    setUserData(null);
    localStorage.removeItem('auth');
  }, []);

  return {
    ...authState,
    userData,
    login,
    register,
    logout,
    skip,
  };
}