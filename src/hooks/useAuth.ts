import { useState, useEffect, useCallback } from 'react';
import { AuthState } from '../types';
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

  const API_BASE_URL = 'https://addons.questprotocol.xyz/api';

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

      const { email: userEmail, userId } = response.data;

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

      alert('Logged in successfully!')

      return { success: true };
    } catch (error) {
      console.log(error)
      alert('Invalid credentials')
      return { success: false, error: 'Invalid credentials' };
    }
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/signup`, {
        email,
        password,
      });

      const userInfo = response.data.data;

      if (response.data.success) {
        alert('You are registered successfully, please proceed to login!')
      }

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
      console.log(error)
      alert('Registration failed')
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