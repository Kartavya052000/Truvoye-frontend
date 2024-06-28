// src/api.js
import axios from 'axios';
import config from '../config/config';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const apiClient = axios.create({
  baseURL: config.BASE_SERVER_URL,
});

// Request interceptor to add JWT token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = cookies.get('token'); // Adjust based on your auth logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error status codes
    if (error.response && error.response.status === 401) {
      // Unauthorized, maybe redirect to login or handle token refresh
    }
    return Promise.reject(error);
  }
);

export const get = (endpoint, params) => {
  return apiClient.get(endpoint, { params });
};

export const post = (endpoint, data) => {
  return apiClient.post(endpoint, data);
};

export const put = (endpoint, data) => {
  return apiClient.put(endpoint, data);
};

export const del = (endpoint) => {
  return apiClient.delete(endpoint);
};
