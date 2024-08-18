import axios from "axios";

const API_LOGIN_URL = 'http://localhost:8080/auth/login';
const API_REGISTER_URL = 'http://localhost:8080/auth/register';

export const login = async (email, password) => {
  try {
    const response = await axios.post(API_LOGIN_URL, { email, password });
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    return response.data.user;
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(API_LOGIN_URL, { username, email, password });
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    return response.data.user;
  } catch (error) {
    console.error('Registration error', error);
    throw error;
  }
};
