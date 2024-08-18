'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AUTH_URL = 'http://localhost:8080/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter()

  const checkToken = async () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(AUTH_URL);

        const userData = {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
        };

        if (response.status === 200) {
          localStorage.setItem('authStatus', 'valid');
          localStorage.setItem('userData', JSON.stringify(userData));
          setAuthToken(token);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (error) {
        logout();
      }
    } else {
      setAuthToken(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${AUTH_URL}/login`, { email, password });
      const token = response.data.token;

      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userData = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
      };
      
      await checkToken();
      window.location.reload();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);
  
    try {
      const response = await axios.post(`${AUTH_URL}/register`, { username, email, password });
  
      if (response.status === 201) {
        router.push('/auth/login');
      } else {
        throw new Error('Registration failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data.message || error.response.statusText);
        alert(`Registration failed: ${error.response.data.message || 'Please check your input and try again.'}`);
      } else if (error.request) {
        console.error('Network Error:', error.message);
        alert('Network error: Please check your internet connection and try again.');
      } else {
        console.error('Error:', error.message);
        alert('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('authStatus');
    localStorage.removeItem('userData');
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    authToken,
    isAuthenticated,
    user,
    checkToken,
    login,
    logout,
    register,
    loading
  };

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
