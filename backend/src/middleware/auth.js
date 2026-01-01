import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { errorResponse } from '../utils/responseHandler.js';


export const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return errorResponse(res, 401, 'No token provided. Authorization denied.');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return errorResponse(res, 401, 'User not found. Authorization denied.');
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return errorResponse(res, 401, 'Invalid token');
        }
        if (error.name === 'TokenExpiredError') {
            return errorResponse(res, 401, 'Token expired');
        }
        return errorResponse(res, 500, 'Server error during authentication');
    }
};
