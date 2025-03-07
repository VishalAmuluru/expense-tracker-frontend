/// <reference types="vite/client" />
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api', // Uses VITE_API_URL if set, otherwise defaults to '/api'
  timeout: 10000, // Request timeout in milliseconds
});

// Request interceptor: attach the access token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle errors globally (e.g., 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
      // Optional: add logic to redirect to login, e.g., window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
