import express from 'express';
import { getAllTasks, updateAnyTask, deleteAnyTask } from '../../controllers/adminController.js';
import { authenticate } from '../../middleware/auth.js';
import { authorize } from '../../middleware/roleCheck.js';
import { updateTaskValidation, validate } from '../../middleware/taskValidator.js';

const router = express.Router();

router.get('/tasks', authenticate, authorize('admin'), getAllTasks);

router.put('/tasks/:id', authenticate, authorize('admin'), updateTaskValidation, validate, updateAnyTask);

router.delete('/tasks/:id', authenticate, authorize('admin'), deleteAnyTask);

export default router;
