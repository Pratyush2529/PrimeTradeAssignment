import express from 'express';
import { register, login, getMe, logout, updateProfile } from '../../controllers/authController.js';
import { registerValidation, loginValidation, updateProfileValidation, validate } from '../../middleware/validator.js';
import { authenticate } from '../../middleware/auth.js';

const router = express.Router();

router.post('/register', registerValidation, validate, register);

router.post('/login', loginValidation, validate, login);

router.get('/me', authenticate, getMe);

router.put('/profile', authenticate, updateProfileValidation, validate, updateProfile);

router.post('/logout', authenticate, logout);

export default router;


