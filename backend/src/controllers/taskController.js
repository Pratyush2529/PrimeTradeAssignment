import Task from '../models/Task.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

/**
 * @desc    Create a new task
 * @route   POST /api/v1/tasks
 * @access  Private
 */
export const createTask = async (req, res, next) => {
    try {
        const { title, description, priority, status } = req.body;

        const task = await Task.create({
            title,
            description,
            priority,
            status,
            userId: req.user._id,
        });

        return successResponse(res, 201, 'Task created successfully', { task });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all tasks for current user
 * @route   GET /api/v1/tasks
 * @access  Private
 */
export const getTasks = async (req, res, next) => {
    try {
        const { status, priority, page = 1, limit = 10 } = req.query;

        // Build filter
        const filter = { userId: req.user._id };
        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        // Pagination
        const skip = (page - 1) * limit;

        // Get tasks
        const tasks = await Task.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count
        const total = await Task.countDocuments(filter);

        return successResponse(res, 200, 'Tasks retrieved successfully', {
            tasks,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalTasks: total,
                tasksPerPage: parseInt(limit),
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single task by ID
 * @route   GET /api/v1/tasks/:id
 * @access  Private
 */
export const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return errorResponse(res, 404, 'Task not found');
        }

        // Check if user owns the task or is admin
        if (task.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return errorResponse(res, 403, 'Access denied. You can only view your own tasks.');
        }

        return successResponse(res, 200, 'Task retrieved successfully', { task });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update task
 * @route   PUT /api/v1/tasks/:id
 * @access  Private
 */
export const updateTask = async (req, res, next) => {
    try {
        const { title, description, priority, status } = req.body;

        const task = await Task.findById(req.params.id);

        if (!task) {
            return errorResponse(res, 404, 'Task not found');
        }

        // Check if user owns the task or is admin
        if (task.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return errorResponse(res, 403, 'Access denied. You can only update your own tasks.');
        }

        // Update fields
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (priority !== undefined) task.priority = priority;
        if (status !== undefined) task.status = status;

        await task.save();

        return successResponse(res, 200, 'Task updated successfully', { task });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete task
 * @route   DELETE /api/v1/tasks/:id
 * @access  Private
 */
export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return errorResponse(res, 404, 'Task not found');
        }

        // Check if user owns the task or is admin
        if (task.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return errorResponse(res, 403, 'Access denied. You can only delete your own tasks.');
        }

        await task.deleteOne();

        return successResponse(res, 200, 'Task deleted successfully', null);
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all tasks (admin only)
 * @route   GET /api/v1/admin/tasks
 * @access  Private/Admin
 */
export const getAllTasks = async (req, res, next) => {
    try {
        const { status, priority, page = 1, limit = 10 } = req.query;

        // Build filter
        const filter = {};
        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        // Pagination
        const skip = (page - 1) * limit;

        // Get tasks with user information
        const tasks = await Task.find(filter)
            .populate('userId', 'username email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count
        const total = await Task.countDocuments(filter);

        return successResponse(res, 200, 'All tasks retrieved successfully', {
            tasks,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalTasks: total,
                tasksPerPage: parseInt(limit),
            },
        });
    } catch (error) {
        next(error);
    }
};
