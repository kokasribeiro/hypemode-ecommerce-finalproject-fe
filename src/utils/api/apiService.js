import axios from 'axios';
import { mockAPI } from './mockData.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Check if we're in production and no backend URL is set
const isProduction = import.meta.env.PROD;
const hasBackendURL = import.meta.env.VITE_API_URL;
const useMockData = isProduction && !hasBackendURL;

// Debug logging
console.log('🔍 API Debug:', {
  isProduction,
  hasBackendURL,
  useMockData,
  API_BASE_URL,
});

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Handle response errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log('🔍 API Error:', error);
    console.log('🔍 Error response:', error.response);
    console.log('🔍 Error response data:', error.response?.data);

    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login if needed
      if (window.location.pathname !== '/login') {
        // window.location.href = '/login';
      }
    }

    // Return the full error object so we can access response.data
    return Promise.reject(error);
  },
);

// ==================== AUTH ENDPOINTS ====================

export const authAPI = {
  register: async (userData) => {
    console.log('🚀 API Service - Register attempt:', userData);
    const response = await api.post('/auth/register', userData);
    console.log('📡 API Service - Register response:', response);
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  },

  login: async (email, password, rememberMe = false) => {
    const response = await api.post('/auth/login', { email, password, rememberMe });
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getMe: async () => {
    return await api.get('/auth/me');
  },

  updateProfile: async (profileData) => {
    return await api.put('/auth/profile', profileData);
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  isAdmin: () => {
    const user = authAPI.getCurrentUser();
    return user?.role === 'admin';
  },
};

// ==================== PRODUCT ENDPOINTS ====================

export const productAPI = {
  getAll: async (params = {}) => {
    if (useMockData) {
      console.log('🔄 Using mock data for products (backend not available)');
      return mockAPI.getAll();
    }

    try {
      const queryString = new URLSearchParams(params).toString();
      return await api.get(`/products${queryString ? `?${queryString}` : ''}`);
    } catch (error) {
      console.log('🔄 API failed, falling back to mock data:', error.message);
      return mockAPI.getAll();
    }
  },

  getById: async (id) => {
    if (useMockData) {
      console.log('🔄 Using mock data for product details (backend not available)');
      return mockAPI.getById(id);
    }

    try {
      return await api.get(`/products/${id}`);
    } catch (error) {
      console.log('🔄 API failed, falling back to mock data:', error.message);
      return mockAPI.getById(id);
    }
  },

  create: async (productData) => {
    return await api.post('/products', productData);
  },

  update: async (id, productData) => {
    return await api.put(`/products/${id}`, productData);
  },

  delete: async (id) => {
    return await api.delete(`/products/${id}`);
  },

  search: async (searchTerm) => {
    return await api.get(`/products?search=${encodeURIComponent(searchTerm)}`);
  },

  getByCategory: async (category, params = {}) => {
    return await api.get(`/products?category=${encodeURIComponent(category)}`, { params });
  },

  getFeatured: async () => {
    return await api.get('/products?featured=true');
  },

  getNewArrivals: async () => {
    return await api.get('/products?newArrival=true');
  },

  getBestSellers: async () => {
    return await api.get('/products?bestSeller=true');
  },

  getOnSale: async () => {
    return await api.get('/products?discount=true');
  },
};

// ==================== CART ENDPOINTS ====================

export const cartAPI = {
  get: async () => {
    return await api.get('/cart');
  },

  add: async (productId, quantity = 1, size = null, color = null) => {
    return await api.post('/cart', { productId, quantity, size, color });
  },

  update: async (cartItemId, quantity) => {
    return await api.put(`/cart/${cartItemId}`, { quantity });
  },

  remove: async (cartItemId) => {
    return await api.delete(`/cart/${cartItemId}`);
  },

  clear: async () => {
    return await api.delete('/cart');
  },
};

// ==================== ORDER ENDPOINTS ====================

export const orderAPI = {
  create: async (orderData) => {
    return await api.post('/orders', orderData);
  },

  getAll: async () => {
    return await api.get('/orders');
  },

  getMyOrders: async () => {
    return await api.get('/orders/my-orders');
  },

  getById: async (id) => {
    return await api.get(`/orders/${id}`);
  },

  getAllAdmin: async () => {
    return await api.get('/orders/admin/all');
  },

  updateStatus: async (id, status, trackingNumber = null) => {
    return await api.put(`/orders/${id}/status`, { status, trackingNumber });
  },

  createPaymentIntent: async (orderId) => {
    return await api.post(`/orders/${orderId}/payment`);
  },

  delete: async (orderId) => {
    return await api.delete(`/orders/${orderId}`);
  },
};

// ==================== BACKWARD COMPATIBILITY ====================
// For easy migration from mockapi

export const fetchProducts = async () => {
  try {
    const response = await productAPI.getAll();
    return response.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await productAPI.getById(id);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export default api;
