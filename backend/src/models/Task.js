import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Task title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [1000, 'Description cannot exceed 1000 characters'],
        },
        status: {
            type: String,
            enum: ['pending', 'in_progress', 'completed'],
            default: 'pending',
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium',
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
        },
    },
    {
        timestamps: true,
    }
);

taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ userId: 1, createdAt: -1 });

taskSchema.methods.toJSON = function () {
    const task = this.toObject();
    delete task.__v;
    return task;
};

const Task = mongoose.model('Task', taskSchema);

export default Task;
