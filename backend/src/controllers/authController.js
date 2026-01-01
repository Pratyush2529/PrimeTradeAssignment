import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';


const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '24h',
    });
};

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return errorResponse(res, 400, 'Email already registered');
            }
            if (existingUser.username === username) {
                return errorResponse(res, 400, 'Username already taken');
            }
        }

        const user = await User.create({
            username,
            email,
            password,
        });

        const token = generateToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return successResponse(res, 201, 'User registered successfully', {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return errorResponse(res, 401, 'Invalid email or password');
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return errorResponse(res, 401, 'Invalid email or password');
        }

        const token = generateToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return successResponse(res, 200, 'Login successful', {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        return successResponse(res, 200, 'User profile retrieved', {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
        });

        return successResponse(res, 200, 'Logout successful');
    } catch (error) {
        next(error);
    }
};


export const updateProfile = async (req, res, next) => {
    try {
        const { username } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return errorResponse(res, 404, 'User not found');
        }

        if (username && username !== user.username) {
            const usernameExists = await User.findOne({ username, _id: { $ne: userId } });
            if (usernameExists) {
                return errorResponse(res, 400, 'Username already taken');
            }
            user.username = username;
        }

        await user.save();

        return successResponse(res, 200, 'Profile updated successfully', {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};


