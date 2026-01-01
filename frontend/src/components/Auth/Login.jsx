import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL, AXIOS_CONFIG } from '../../utils/constants';
import { setCredentials, setLoading, setError, clearError, selectLoading, selectError } from '../../store/slices/authSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [localError, setLocalError] = useState('');

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

        try {
            dispatch(setLoading(true));
            dispatch(clearError());

            const response = await axios.post(
                `${API_BASE_URL}/v1/auth/login`,
                formData,
                AXIOS_CONFIG
            );
            const { user } = response.data.data;

            dispatch(setCredentials({ user }));
            navigate('/dashboard');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed';
            setLocalError(errorMessage);
            dispatch(setError(errorMessage));

            // Handle 401 redirect
            if (err.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="card">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Sign in to your account
                        </p>
                    </div>

                    {(error || localError) && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {localError || error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
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
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
