// import axios from 'axios';
// import { toast } from 'react-toastify';

// const api = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     withCredentials: true,
// });

// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const message = error.response?.data?.message || 'An error occurred.';
//         toast.error(message);
//         return Promise.reject(error);
//     }
// );


// export default api;




import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/app/stores/auth.store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // can leave, but not used if using header auth
});

// Attach token if present
api.interceptors.request.use((config) => {
  // Retrieve token from persistent store
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
