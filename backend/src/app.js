import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import { seedAdminUser } from './config/seedAdmin.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

connectDB().then(() => {
    seedAdminUser();
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to PrimeTrade Assignment API',
        version: '1.0.0',
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
