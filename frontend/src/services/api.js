import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
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
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API calls
export const authAPI = {
    register: (userData) => api.post('/v1/auth/register', userData),
    login: (credentials) => api.post('/v1/auth/login', credentials),
    getMe: () => api.get('/v1/auth/me'),
};

// Task API calls
export const taskAPI = {
    createTask: (taskData) => api.post('/v1/tasks', taskData),
    getTasks: (params) => api.get('/v1/tasks', { params }),
    getTaskById: (id) => api.get(`/v1/tasks/${id}`),
    updateTask: (id, taskData) => api.put(`/v1/tasks/${id}`, taskData),
    deleteTask: (id) => api.delete(`/v1/tasks/${id}`),
    getAllTasks: (params) => api.get('/v1/admin/tasks', { params }), // Admin only
};

export default api;
