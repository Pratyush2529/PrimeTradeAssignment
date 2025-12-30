import { useState, useEffect } from 'react';
import { taskAPI } from '../../services/api';
import TaskList from '../Tasks/TaskList';
import TaskForm from '../Tasks/TaskForm';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState({ status: '', priority: '' });

    useEffect(() => {
        fetchTasks();
    }, [filter]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const params = {};
            if (filter.status) params.status = filter.status;
            if (filter.priority) params.priority = filter.priority;

            const response = await taskAPI.getTasks(params);
            setTasks(response.data.data.tasks);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = () => {
        setEditingTask(null);
        setShowForm(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            await taskAPI.deleteTask(taskId);
            fetchTasks();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete task');
        }
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingTask(null);
        fetchTasks();
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    const getTaskStats = () => {
        const total = tasks.length;
        const pending = tasks.filter((t) => t.status === 'pending').length;
        const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
        const completed = tasks.filter((t) => t.status === 'completed').length;
        return { total, pending, inProgress, completed };
    };

    const stats = getTaskStats();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome, {user?.username}!
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Manage your tasks efficiently
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <h3 className="text-sm font-medium opacity-90">Total Tasks</h3>
                        <p className="text-3xl font-bold mt-2">{stats.total}</p>
                    </div>
                    <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
                        <h3 className="text-sm font-medium opacity-90">Pending</h3>
                        <p className="text-3xl font-bold mt-2">{stats.pending}</p>
                    </div>
                    <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                        <h3 className="text-sm font-medium opacity-90">In Progress</h3>
                        <p className="text-3xl font-bold mt-2">{stats.inProgress}</p>
                    </div>
                    <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                        <h3 className="text-sm font-medium opacity-90">Completed</h3>
                        <p className="text-3xl font-bold mt-2">{stats.completed}</p>
                    </div>
                </div>

                {/* Actions and Filters */}
                <div className="card mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <button
                            onClick={handleCreateTask}
                            className="btn-primary"
                        >
                            + Create New Task
                        </button>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <select
                                value={filter.status}
                                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                                className="input-field"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>

                            <select
                                value={filter.priority}
                                onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
                                className="input-field"
                            >
                                <option value="">All Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Task Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <TaskForm
                                task={editingTask}
                                onSuccess={handleFormSuccess}
                                onCancel={handleFormCancel}
                            />
                        </div>
                    </div>
                )}

                {/* Task List */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <TaskList
                        tasks={tasks}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
