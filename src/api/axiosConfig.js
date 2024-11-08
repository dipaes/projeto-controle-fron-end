import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar o token de autenticação a cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Log do token
    console.log('URL da API:', config.url); // Log da URL da API
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;
