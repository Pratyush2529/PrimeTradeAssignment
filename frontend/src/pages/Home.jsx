import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/slices/authSlice';

const Home = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Task Management
                        <span className="block text-primary-600 mt-2">Made Simple</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        Organize your work, track your progress, and achieve your goals with our
                        powerful task management system.
                    </p>

                    <div className="flex justify-center gap-4">
                        {isAuthenticated ? (
                            <Link
                                to="/dashboard"
                                className="btn-primary text-lg px-8 py-3"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    className="btn-primary text-lg px-8 py-3"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    to="/login"
                                    className="btn-secondary text-lg px-8 py-3"
                                >
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Features */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="card text-center">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-primary-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Easy Task Creation
                        </h3>
                        <p className="text-gray-600">
                            Create and organize tasks with just a few clicks. Set priorities and track status.
                        </p>
                    </div>

                    <div className="card text-center">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-primary-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Secure & Private
                        </h3>
                        <p className="text-gray-600">
                            Your data is protected with JWT authentication and role-based access control.
                        </p>
                    </div>

                    <div className="card text-center">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-primary-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Track Progress
                        </h3>
                        <p className="text-gray-600">
                            Monitor your productivity with visual stats and filter tasks by status and priority.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
