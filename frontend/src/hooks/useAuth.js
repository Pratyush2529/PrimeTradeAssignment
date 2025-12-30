import { useDispatch, useSelector } from 'react-redux';
import { authAPI } from '../services/api';
import { setToken, setUser, clearAuth } from '../utils/tokenManager';
import {
    setCredentials,
    setLoading,
    setError,
    clearError,
    logout as logoutAction,
    selectUser,
    selectIsAuthenticated,
    selectIsAdmin,
    selectLoading,
    selectError,
} from '../store/slices/authSlice';

/**
 * Custom hook for authentication with Redux
 */
export const useAuth = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isAdmin = useSelector(selectIsAdmin);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const register = async (userData) => {
        try {
            dispatch(setLoading(true));
            dispatch(clearError());

            const response = await authAPI.register(userData);
            const { token, user } = response.data.data;

            setToken(token);
            setUser(user);
            dispatch(setCredentials({ user, token }));

            return { success: true, data: response.data };
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed';
            dispatch(setError(errorMessage));
            return { success: false, error: errorMessage };
        } finally {
            dispatch(setLoading(false));
        }
    };

    const login = async (credentials) => {
        try {
            dispatch(setLoading(true));
            dispatch(clearError());

            const response = await authAPI.login(credentials);
            const { token, user } = response.data.data;

            setToken(token);
            setUser(user);
            dispatch(setCredentials({ user, token }));

            return { success: true, data: response.data };
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed';
            dispatch(setError(errorMessage));
            return { success: false, error: errorMessage };
        } finally {
            dispatch(setLoading(false));
        }
    };

    const logout = () => {
        clearAuth();
        dispatch(logoutAction());
    };

    return {
        user,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated,
        isAdmin,
    };
};
