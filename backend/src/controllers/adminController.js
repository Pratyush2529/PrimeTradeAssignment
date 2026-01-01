import Task from '../models/Task.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

export const getAllTasks = async (req, res, next) => {
    try {
        const { status, priority, page = 1, limit = 10 } = req.query;

        const filter = {};
        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        const skip = (page - 1) * limit;

        const tasks = await Task.find(filter)
            .populate('userId', 'username email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

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

export const updateAnyTask = async (req, res, next) => {
    try {
        const { title, description, priority, status } = req.body;

        const task = await Task.findById(req.params.id).populate('userId', 'username email');

        if (!task) {
            return errorResponse(res, 404, 'Task not found');
        }

        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (priority !== undefined) task.priority = priority;
        if (status !== undefined) task.status = status;

        await task.save();

        await task.populate('userId', 'username email');

        return successResponse(res, 200, `Task updated successfully (Owner: ${task.userId.username})`, { task });
    } catch (error) {
        next(error);
    }
};

export const deleteAnyTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id).populate('userId', 'username email');

        if (!task) {
            return errorResponse(res, 404, 'Task not found');
        }

        const taskOwner = task.userId.username;
        await task.deleteOne();

        return successResponse(res, 200, `Task deleted successfully (Owner: ${taskOwner})`, null);
    } catch (error) {
        next(error);
    }
};
