import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, AXIOS_CONFIG } from '../../utils/constants';

const TaskForm = ({ task, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                priority: task.priority || 'medium',
                status: task.status || 'pending',
            });
        }
    }, [task]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (task) {
                // Update existing task
                await axios.put(
                    `${API_BASE_URL}/v1/tasks/${task._id}`,
                    formData,
                    AXIOS_CONFIG
                );
            } else {
                // Create new task
                await axios.post(
                    `${API_BASE_URL}/v1/tasks`,
                    formData,
                    AXIOS_CONFIG
                );
            }
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {task ? 'Edit Task' : 'Create New Task'}
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter task title"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className="input-field resize-none"
                        placeholder="Enter task description (optional)"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                            Priority
                        </label>
                        <select
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="input-field"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="input-field"
                        >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 btn-secondary"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
