import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { setToken, getToken, setUser, getUser, clearAuth } from '../utils/tokenManager';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUserState] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is logged in on mount
    useEffect(() => {
        const initAuth = async () => {
            const token = getToken();
            const savedUser = getUser();

            if (token && savedUser) {
                setUserState(savedUser);
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const register = async (userData) => {
        try {
            setError(null);
            const response = await authAPI.register(userData);
            const { token, user } = response.data.data;

            setToken(token);
            setUser(user);
            setUserState(user);

            return { success: true, data: response.data };
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const login = async (credentials) => {
        try {
            setError(null);
            const response = await authAPI.login(credentials);
            const { token, user } = response.data.data;

            setToken(token);
            setUser(user);
            setUserState(user);

            return { success: true, data: response.data };
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const logout = () => {
        clearAuth();
        setUserState(null);
        setError(null);
    };

    const value = {
        user,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
