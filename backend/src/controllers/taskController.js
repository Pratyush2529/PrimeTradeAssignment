import Task from '../models/Task.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

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

export const getTasks = async (req, res, next) => {
    try {
        const { status, priority, page = 1, limit = 10 } = req.query;

        const filter = { userId: req.user._id };
        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        const skip = (page - 1) * limit;

        const tasks = await Task.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

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

export const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return errorResponse(res, 404, 'Task not found');
        }

        if (task.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return errorResponse(res, 403, 'Access denied. You can only view your own tasks.');
        }

        return successResponse(res, 200, 'Task retrieved successfully', { task });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const { title, description, priority, status } = req.body;

        const task = await Task.findById(req.params.id);

        if (!task) {
            return errorResponse(res, 404, 'Task not found');
        }

        if (task.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return errorResponse(res, 403, 'Access denied. You can only update your own tasks.');
        }

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

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return errorResponse(res, 404, 'Task not found');
        }

        if (task.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return errorResponse(res, 403, 'Access denied. You can only delete your own tasks.');
        }

        await task.deleteOne();

        return successResponse(res, 200, 'Task deleted successfully', null);
    } catch (error) {
        next(error);
    }
};

