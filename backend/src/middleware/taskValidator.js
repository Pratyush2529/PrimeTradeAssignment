import { body, validationResult } from 'express-validator';
import { errorResponse } from '../utils/responseHandler.js';


export const createTaskValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Task title is required')
        .isLength({ max: 200 })
        .withMessage('Title cannot exceed 200 characters'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Description cannot exceed 1000 characters'),

    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Priority must be low, medium, or high'),

    body('status')
        .optional()
        .isIn(['pending', 'in_progress', 'completed'])
        .withMessage('Status must be pending, in_progress, or completed'),
];


export const updateTaskValidation = [
    body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Task title cannot be empty')
        .isLength({ max: 200 })
        .withMessage('Title cannot exceed 200 characters'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Description cannot exceed 1000 characters'),

    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Priority must be low, medium, or high'),

    body('status')
        .optional()
        .isIn(['pending', 'in_progress', 'completed'])
        .withMessage('Status must be pending, in_progress, or completed'),
];

export const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return errorResponse(res, 400, 'Validation failed', errorMessages);
    }

    next();
};
