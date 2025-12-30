import express from 'express';
import { register, login, getMe } from '../../controllers/authController.js';
import { registerValidation, loginValidation, validate } from '../../middleware/validator.js';
import { authenticate } from '../../middleware/auth.js';

const router = express.Router();

// POST /api/v1/auth/register - Register a new user
router.post('/register', registerValidation, validate, register);

// POST /api/v1/auth/login - Login user
router.post('/login', loginValidation, validate, login);

// GET /api/v1/auth/me - Get current user profile (Protected)
router.get('/me', authenticate, getMe);

export default router;

