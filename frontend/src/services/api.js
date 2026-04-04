import axios from 'axios';

// Base URL configuration - change based on environment variables if needed
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3500/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // For sending cookies if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: add auth token if present
api.interceptors.request.use(
  (config) => {
    // We can pull token from localStorage or via an injected function from AuthContext
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401s (token expiry)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and maybe redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // window.location.href = '/login'; // Optional: force redirect on 401
    }
    return Promise.reject(error);
  }
);
