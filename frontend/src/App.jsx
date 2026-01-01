import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import store from './store';
import { setCredentials, setLoading } from './store/slices/authSlice';
import { API_BASE_URL, AXIOS_CONFIG } from './utils/constants';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './pages/Profile';

function AppContent() {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`${API_BASE_URL}/v1/auth/me`, AXIOS_CONFIG);
        if (response.data.success) {
          dispatch(setCredentials({ user: response.data.data.user }));
        }
      } catch (error) {
        console.log('Not authenticated');
      } finally {
        dispatch(setLoading(false));
        setIsInitialized(true);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;


