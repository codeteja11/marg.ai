import axios from 'axios';

// Use same-origin by default so production deployments work without extra env vars.
// If you still set VITE_API_BASE_URL, it will override this.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add interceptors if needed (e.g., for attaching JWT tokens)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Bypass Localtunnel reminder page for API requests
  config.headers['Bypass-Tunnel-Reminder'] = 'true';
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
