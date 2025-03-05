import axios from 'axios';
import {useAuthStore} from './useAppStore';

const API_BASE_URL = 'https://fake-coffee-api.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {'Content-Type': 'application/json'},
});

api.interceptors.request.use(
  async config => {
    const token = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);

    if (error.response?.status === 401) {
      useAuthStore.getState().logout(); // Clear token
    }

    return Promise.reject(error);
  },
);

export default api;
