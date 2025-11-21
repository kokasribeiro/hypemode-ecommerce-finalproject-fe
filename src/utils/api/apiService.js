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

// Monitor localStorage changes for debugging
if (typeof window !== 'undefined') {
  const originalSetItem = localStorage.setItem;
  const originalRemoveItem = localStorage.removeItem;

  localStorage.setItem = function (key, value) {
    if (key === 'token') {
      console.log('📝 localStorage.setItem("token"):', value.substring(0, 30) + '...');
      console.trace('Set token from:');
    }
    originalSetItem.apply(this, arguments);
  };

  localStorage.removeItem = function (key) {
    if (key === 'token') {
      console.warn('🗑️ localStorage.removeItem("token") called!');
      console.trace('Remove token from:');
    }
    originalRemoveItem.apply(this, arguments);
  };
}

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Token added to request:', config.url, '- Token:', token.substring(0, 20) + '...');
    } else {
      console.log('⚠️ No token found for request:', config.url);
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
    try {
      console.log('🚀 API Service - Register attempt:', userData);
      const response = await api.post('/auth/register', userData);
      console.log('📡 API Service - Register response:', response);

      // The interceptor returns response.data, so response IS the backend response
      if (response && response.data && response.data.token && response.data.user) {
        const token = response.data.token;
        const user = response.data.user;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        console.log('✅ Register - Token saved:', localStorage.getItem('token') ? 'YES' : 'NO');
        console.log('✅ Register - User saved:', localStorage.getItem('user') ? 'YES' : 'NO');

        // Dispatch custom event to notify components that user registered/logged in
        window.dispatchEvent(new Event('userChanged'));
      }
      return response;
    } catch (error) {
      console.error('❌ Register API error:', error);
      throw error;
    }
  },

  login: async (email, password, rememberMe = false) => {
    try {
      console.log('🔐 Login attempt:', { email, rememberMe });
      const response = await api.post('/auth/login', { email, password, rememberMe });

      console.log('📡 Login response:', response);
      console.log('📡 response.success:', response.success);
      console.log('📡 response.data:', response.data);

      // The interceptor returns response.data, so response IS the backend response
      // Backend returns: { success: true, data: { user, token } }
      if (response && response.success && response.data && response.data.token && response.data.user) {
        const token = response.data.token;
        const user = response.data.user;

        console.log('💾 SAVING TOKEN:', token.substring(0, 30) + '...');
        console.log('💾 SAVING USER:', user.email);

        // Clear any existing data first
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Save to localStorage SYNCHRONOUSLY
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Force a small delay to ensure write completes
        await new Promise((resolve) => setTimeout(resolve, 50));

        // Verify it was saved
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        console.log('✅ Token saved?', savedToken === token ? 'YES ✓' : 'NO ✗');
        console.log('✅ User saved?', savedUser ? 'YES ✓' : 'NO ✗');

        if (savedToken === token && savedUser) {
          console.log('✅✅✅ LOGIN SUCCESSFUL - Token and user CONFIRMED saved!');
          console.log('🔑 Saved token:', savedToken.substring(0, 40) + '...');

          // Dispatch custom event to notify components (like Navbar) that user logged in
          window.dispatchEvent(new Event('userChanged'));
        } else {
          console.error('❌ FAILED to save to localStorage!');
          console.error('Expected token:', token.substring(0, 40));
          console.error('Saved token:', savedToken ? savedToken.substring(0, 40) : 'NULL');
        }
      } else {
        console.error('❌ Invalid response structure:', response);
      }

      return response;
    } catch (error) {
      console.error('❌ Login API error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Dispatch custom event to notify components that user logged out
    window.dispatchEvent(new Event('userChanged'));
  },

  getMe: async () => {
    return await api.get('/auth/me');
  },

  updateProfile: async (profileData) => {
    return await api.put('/auth/profile', profileData);
  },

  changePassword: async (passwordData) => {
    return await api.put('/auth/change-password', passwordData);
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

    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/products${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id) => {
    if (useMockData) {
      console.log('🔄 Using mock data for product details (backend not available)');
      return mockAPI.getById(id);
    }

    return await api.get(`/products/${id}`);
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
  const response = await productAPI.getAll();
  return response.data || [];
};

export const fetchProductById = async (id) => {
  const response = await productAPI.getById(id);
  return response.data;
};

export default api;
