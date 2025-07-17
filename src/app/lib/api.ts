import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/app/stores/auth.store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response error handling
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const msg = error.response?.data?.message || 'An error occurred.';
    toast.error(msg);
    return Promise.reject(error);
  }
);

export default api;
