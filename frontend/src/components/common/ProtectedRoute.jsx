import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectIsAdmin, selectLoading } from '../../store/slices/authSlice';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isAdmin = useSelector(selectIsAdmin);
    const loading = useSelector(selectLoading);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
