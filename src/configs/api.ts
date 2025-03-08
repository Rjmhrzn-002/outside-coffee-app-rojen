import axios, {AxiosResponse} from 'axios';
import {useAuthStore} from './useAppStore';

const {token, isAuthenticated, logout} = useAuthStore.getState();

// Create axios instance
const apiClient = axios.create({
  baseURL: 'https://fake-coffee-brand-api.vercel.app',
  timeout: 15000,
  headers: {'Content-Type': 'application/json'},
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  config => {
    if (token && isAuthenticated) {
      // config.headers.Authorization = `Bearer ${token}`;
      // In presence of Backend services, we could append Bearer Token to the request headers
    }
    return config;
  },
  error => Promise.reject(error),
);

// Add response interceptor for handling 401 errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  },
);

// Response and error handling functions
const handleResponse = (response: AxiosResponse) => {
  return response.data;
};

const handleError = async (error: any) => {
  if (error instanceof Error) {
    console.error('Error fetching data:', error.message);
  } else if (error.response) {
    console.error(
      `API error: ${error.response.status} - ${error.response.data}`,
    );
  } else {
    console.error('Unknown error occurred:', error);
  }
  throw error;
};

// api service function (GET)
export const getRequest = async (endpoint: string) => {
  try {
    const response = await apiClient.get(endpoint);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export default apiClient;
