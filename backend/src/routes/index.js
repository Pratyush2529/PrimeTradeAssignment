import express from 'express';
import authRoutes from './v1/auth.js';
import taskRoutes from './v1/tasks.js';

const router = express.Router();

// API v1 routes
router.use('/v1/auth', authRoutes);
router.use('/v1/tasks', taskRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString(),
    });
});

export default router;
