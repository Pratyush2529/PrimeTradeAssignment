import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL, AXIOS_CONFIG } from '../../utils/constants';
import { setCredentials, setLoading, setError, clearError, selectLoading, selectError } from '../../store/slices/authSlice';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [localError, setLocalError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setLocalError('');
        dispatch(clearError());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        setSuccess('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setLocalError('Passwords do not match');
            return;
        }

        // Validate password strength
        if (formData.password.length < 6) {
            setLocalError('Password must be at least 6 characters');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
        if (!passwordRegex.test(formData.password)) {
            setLocalError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
            return;
        }

        try {
            dispatch(setLoading(true));
            dispatch(clearError());

            const { confirmPassword, ...registerData } = formData;
            const response = await axios.post(
                `${API_BASE_URL}/v1/auth/register`,
                registerData,
                AXIOS_CONFIG
            );
            const { user } = response.data.data;

            dispatch(setCredentials({ user }));
            setSuccess('Registration successful! Redirecting...');

            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed';
            setLocalError(errorMessage);
            dispatch(setError(errorMessage));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="card">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Sign up to get started
                        </p>
                    </div>

                    {(error || localError) && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {localError || error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="johndoe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="••••••••"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Must be at least 6 characters with uppercase, lowercase, and number
                            </p>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
