import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_COC_API_BASE_URL || '/api', // Using proxy default
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_COC_API_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
