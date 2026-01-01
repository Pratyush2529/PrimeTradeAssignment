import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL, AXIOS_CONFIG } from '../../utils/constants';
import { logout as logoutAction, selectUser, selectIsAuthenticated } from '../../store/slices/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const handleLogout = async () => {
        try {
            await axios.post(`${API_BASE_URL}/v1/auth/logout`, {}, AXIOS_CONFIG);
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            dispatch(logoutAction());
        }
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-primary-600">TaskManager</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/profile"
                                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Profile
                                </Link>
                                <div className="flex items-center space-x-3">
                                    <div className="text-sm">
                                        <p className="text-gray-900 font-medium">{user?.username}</p>
                                        <p className="text-gray-500 text-xs">{user?.email}</p>
                                    </div>
                                    {user?.role === 'admin' && (
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                                            Admin
                                        </span>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="btn-secondary text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn-primary text-sm"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
