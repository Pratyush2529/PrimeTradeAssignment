import express from 'express';
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} from '../../controllers/taskController.js';
import { authenticate } from '../../middleware/auth.js';
import {
    createTaskValidation,
    updateTaskValidation,
    validate,
} from '../../middleware/taskValidator.js';

const router = express.Router();

router.post('/', authenticate, createTaskValidation, validate, createTask);

router.get('/', authenticate, getTasks);

router.get('/:id', authenticate, getTaskById);

router.put('/:id', authenticate, updateTaskValidation, validate, updateTask);

router.delete('/:id', authenticate, deleteTask);

export default router;
