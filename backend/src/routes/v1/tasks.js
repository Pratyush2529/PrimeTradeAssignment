import express from 'express';
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getAllTasks,
} from '../../controllers/taskController.js';
import { authenticate } from '../../middleware/auth.js';
import { authorize } from '../../middleware/roleCheck.js';
import {
    createTaskValidation,
    updateTaskValidation,
    validate,
} from '../../middleware/taskValidator.js';

const router = express.Router();

// POST /api/v1/tasks - Create a new task (Protected)
router.post('/', authenticate, createTaskValidation, validate, createTask);

// GET /api/v1/tasks - Get all tasks for current user (Protected)
router.get('/', authenticate, getTasks);

// GET /api/v1/tasks/:id - Get single task by ID (Protected)
router.get('/:id', authenticate, getTaskById);

// PUT /api/v1/tasks/:id - Update task (Protected)
router.put('/:id', authenticate, updateTaskValidation, validate, updateTask);

// DELETE /api/v1/tasks/:id - Delete task (Protected)
router.delete('/:id', authenticate, deleteTask);

// GET /api/v1/admin/tasks - Get all tasks (Admin only)
router.get('/admin/tasks', authenticate, authorize('admin'), getAllTasks);

export default router;
