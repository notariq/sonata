'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

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
        const response = await axios.get(API_URL);

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
      const response = await axios.post(`${API_URL}/login`, { email, password });
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
    setLoading(true); // Set loading to true immediately to indicate the process has started
  
    try {
      const response = await axios.post(`${API_URL}/register`, { username, email, password });
  
      if (response.status === 201) {
        // Registration successful
        router.push('/auth/login');
      } else {
        // Handle unexpected status codes
        throw new Error('Registration failed. Please try again.');
      }
    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        // The request was made, and the server responded with a status code that falls out of the range of 2xx
        console.error('Server Error:', error.response.data.message || error.response.statusText);
        alert(`Registration failed: ${error.response.data.message || 'Please check your input and try again.'}`);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('Network Error:', error.message);
        alert('Network error: Please check your internet connection and try again.');
      } else {
        // Something else happened in making the request that triggered an error
        console.error('Error:', error.message);
        alert('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Ensure loading is set to false after process completion
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
