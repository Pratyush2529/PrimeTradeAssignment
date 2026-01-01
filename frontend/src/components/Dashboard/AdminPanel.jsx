import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, AXIOS_CONFIG } from '../../utils/constants';

const AdminPanel = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [editForm, setEditForm] = useState({ title: '', description: '', status: '', priority: '' });

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const fetchAllTasks = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${API_BASE_URL}/v1/admin/tasks`,
                AXIOS_CONFIG
            );
            setAllTasks(response.data.data.tasks || []);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch all tasks');
            console.error('Error fetching all tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (task) => {
        setEditingTask(task);
        setEditForm({
            title: task.title,
            description: task.description || '',
            status: task.status,
            priority: task.priority
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `${API_BASE_URL}/v1/admin/tasks/${editingTask._id}`,
                editForm,
                AXIOS_CONFIG
            );
            setEditingTask(null);
            fetchAllTasks();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update task');
        }
    };

    const handleDelete = async (taskId, taskTitle) => {
        if (!window.confirm(`Are you sure you want to delete "${taskTitle}"?`)) {
            return;
        }

        try {
            await axios.delete(
                `${API_BASE_URL}/v1/admin/tasks/${taskId}`,
                AXIOS_CONFIG
            );
            fetchAllTasks();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete task');
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            in_progress: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getPriorityColor = (priority) => {
        const colors = {
            low: 'bg-gray-100 text-gray-800',
            medium: 'bg-yellow-100 text-yellow-800',
            high: 'bg-red-100 text-red-800',
        };
        return colors[priority] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Panel - All Users' Tasks</h2>
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Panel - All Users' Tasks</h2>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        👑 Admin Panel - All Users' Tasks
                    </h2>
                    <span className="text-sm text-gray-600">
                        Total: {allTasks.length} tasks
                    </span>
                </div>

                {allTasks.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No tasks found in the system
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Task
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Priority
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {allTasks.map((task) => (
                                    <tr key={task._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {task.title}
                                            </div>
                                            {task.description && (
                                                <div className="text-sm text-gray-500 truncate max-w-md">
                                                    {task.description}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {task.userId?.username || 'Unknown'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {task.userId?.email || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                                                {task.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                                                {task.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(task.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleEditClick(task)}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task._id, task.title)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {editingTask && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Edit Task (Owner: {editingTask.userId?.username})
                        </h3>
                        <form onSubmit={handleEditSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.title}
                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                        className="input-field w-full"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={editForm.description}
                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                        className="input-field w-full"
                                        rows="3"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Status
                                        </label>
                                        <select
                                            value={editForm.status}
                                            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                            className="input-field w-full"
                                            required
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Priority
                                        </label>
                                        <select
                                            value={editForm.priority}
                                            onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                                            className="input-field w-full"
                                            required
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setEditingTask(null)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminPanel;

