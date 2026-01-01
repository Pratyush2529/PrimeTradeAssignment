import express from 'express';
import authRoutes from './v1/auth.js';
import taskRoutes from './v1/tasks.js';
import adminRoutes from './v1/admin.js';

const router = express.Router();

router.use('/v1/auth', authRoutes);
router.use('/v1/tasks', taskRoutes);
router.use('/v1/admin', adminRoutes);

export default router;
