// API Configuration
// All API endpoints and URLs are configured here from environment variables

const API_CONFIG = {
  // Backend Base URL
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001',
  
  // API Base URL
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  
  // Socket.IO URL
  SOCKET_URL: process.env.REACT_APP_SOCKET_URL || 'http://localhost:5001',
  
  // Environment
  ENV: process.env.REACT_APP_ENV || 'development',
  
  // API Endpoints
  ENDPOINTS: {
    // Users
    USERS: '/users',
    USER_BY_ID: (id: number | string) => `/users/${id}`,
    
    // Notifications
    NOTIFICATIONS: '/notifications',
    NOTIFICATION_READ: (id: number | string) => `/notifications/${id}/read`,
    NOTIFICATIONS_READ_ALL: '/notifications/read-all',
    NOTIFICATIONS_UNREAD_COUNT: '/notifications/unread-count',
    
    // Stats
    STATS: '/stats',
    DB_STATUS: '/db-status',
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.API_URL}${endpoint}`;
};

// Helper function to get backend URL
export const getBackendUrl = (): string => {
  return API_CONFIG.BACKEND_URL;
};

// Helper function to get Socket.IO URL
export const getSocketUrl = (): string => {
  return API_CONFIG.SOCKET_URL;
};

export default API_CONFIG;
