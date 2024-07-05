// src/api.js
import axios from 'axios';
import config from '../config/config';
import { Cookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';

const cookies = new Cookies();
const apiClient = axios.create({
  baseURL: config.BASE_SERVER_URL,
});
// const location = useLocation();
// const driver = location.pathname.includes('driver');

// Request interceptor to add JWT token to headers
// Function to get the current path
const getCurrentPath = () => {
  return window.location.pathname;
};

// Request interceptor to add JWT token to headers
apiClient.interceptors.request.use(
  (config) => {
    let token = '';
    const currentPath = getCurrentPath();

    // if (currentPath.includes('driver') && !currentPath.includes('add-driver')) {
    //   token = cookies.get('driver_token'); // Adjust based on your auth logic
    // } else {
      token = cookies.get('token'); // Adjust based on your auth logic
    // }

    console.log(config, "config");
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

// export const post = (endpoint, data) => {
//   return apiClient.post(endpoint, data);
// };
export const post = (endpoint, data, queryParams = {}) => {
  return apiClient.post(endpoint, data, { params: queryParams });
};
export const put = (endpoint, data) => {
  return apiClient.put(endpoint, data);
};

export const del = (endpoint) => {
  return apiClient.delete(endpoint);
};
