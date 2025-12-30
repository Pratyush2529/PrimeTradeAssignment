import { createSlice } from '@reduxjs/toolkit';
import { getToken, getUser } from '../../utils/tokenManager';

const initialState = {
    user: getUser(),
    token: getToken(),
    isAuthenticated: !!getToken(),
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },
});

export const { setCredentials, setLoading, setError, clearError, logout } = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsAdmin = (state) => state.auth.user?.role === 'admin';
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
