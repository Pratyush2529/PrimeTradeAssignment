import { errorResponse } from '../utils/responseHandler.js';

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((e) => e.message);
        return errorResponse(res, 400, 'Validation Error', errors);
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return errorResponse(res, 400, `${field} already exists`);
    }

    if (err.name === 'CastError') {
        return errorResponse(res, 400, 'Invalid ID format');
    }

    if (err.name === 'JsonWebTokenError') {
        return errorResponse(res, 401, 'Invalid token');
    }

    if (err.name === 'TokenExpiredError') {
        return errorResponse(res, 401, 'Token expired');
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return errorResponse(res, statusCode, message);
};

export default errorHandler;
