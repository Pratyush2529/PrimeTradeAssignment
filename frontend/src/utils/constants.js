export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AXIOS_CONFIG = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
};
