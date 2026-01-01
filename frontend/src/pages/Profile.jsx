import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL, AXIOS_CONFIG } from '../utils/constants';
import { selectUser, setCredentials } from '../store/slices/authSlice';

const Profile = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: user?.username || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.put(
                `${API_BASE_URL}/v1/auth/profile`,
                formData,
                AXIOS_CONFIG
            );

            if (response.data.success) {
                dispatch(setCredentials({ user: response.data.data.user }));
                setSuccess('Profile updated successfully!');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
                    <p className="text-gray-600 mb-8">Update your account information</p>

                    {/* User Info Card */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Account Type</p>
                                <p className="text-lg font-semibold text-gray-900 capitalize">{user?.role}</p>
                            </div>
                            {user?.role === 'admin' && (
                                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-purple-100 text-purple-800">
                                    Admin
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Success Message */}
                    {success && (
                        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                            {success}
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Profile Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="input-field w-full"
                                required
                                minLength={3}
                                maxLength={50}
                                pattern="[a-zA-Z0-9_]+"
                                title="Username can only contain letters, numbers, and underscores"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                3-50 characters. Letters, numbers, and underscores only.
                            </p>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={user?.email || ''}
                                className="input-field w-full bg-gray-100 cursor-not-allowed"
                                disabled
                                readOnly
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Email address cannot be changed.
                            </p>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full sm:w-auto"
                            >
                                {loading ? 'Updating...' : 'Update Profile'}
                            </button>
                        </div>
                    </form>

                    {/* Account Info */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Account Created:</span>
                                <span className="text-gray-900 font-medium">
                                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">User ID:</span>
                                <span className="text-gray-900 font-mono text-xs">{user?.id}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

