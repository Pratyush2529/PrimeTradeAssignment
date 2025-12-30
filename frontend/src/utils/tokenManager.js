/**
 * Store JWT token in localStorage
 */
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

/**
 * Get JWT token from localStorage
 */
export const getToken = () => {
    return localStorage.getItem('token');
};

/**
 * Remove JWT token from localStorage
 */
export const removeToken = () => {
    localStorage.removeItem('token');
};

/**
 * Store user data in localStorage
 */
export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Get user data from localStorage
 */
export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

/**
 * Remove user data from localStorage
 */
export const removeUser = () => {
    localStorage.removeItem('user');
};

/**
 * Clear all auth data
 */
export const clearAuth = () => {
    removeToken();
    removeUser();
};
