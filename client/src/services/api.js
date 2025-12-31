import axios from 'axios';

// Create axios instance
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  register: (name, email, password, role, phone) => 
    api.post('/auth/register', { name, email, password, role, phone }),
  
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  getMe: () => 
    api.get('/auth/me'),
  
  updateProfile: (userData) => 
    api.put('/auth/update', userData),
  
  logout: () => 
    api.post('/auth/logout')
};

// Property API calls
export const propertyAPI = {
  getProperties: (params) => 
    api.get('/properties', { params }),
  
  getPropertyById: (id) => 
    api.get(`/properties/${id}`),
  
  createProperty: (propertyData) => 
    api.post('/properties', propertyData),
  
  updateProperty: (id, propertyData) => 
    api.put(`/properties/${id}`, propertyData),
  
  deleteProperty: (id) => 
    api.delete(`/properties/${id}`),
  
  getMyProperties: () => 
    api.get('/properties/my-properties')
};

// Search API calls
export const searchAPI = {
  searchProperties: (params) => 
    api.get('/search', { params }),
  
  getPropertySuggestions: (query) => 
    api.get('/search/suggestions', { params: { query } }),
  
  getSearchFilters: () => 
    api.get('/search/filters')
};

// Subscription API calls
export const subscriptionAPI = {
  getSubscriptionPlans: () => 
    api.get('/subscriptions/plans'),
  
  createSubscription: (plan, paymentMethodId) => 
    api.post('/subscriptions', { plan, paymentMethodId }),
  
  getMySubscription: () => 
    api.get('/subscriptions/my-subscription'),
  
  checkPropertyAccess: (propertyId) => 
    api.get(`/subscriptions/check-access/${propertyId}`)
};

export default api;