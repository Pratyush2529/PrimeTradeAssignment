# Backend - PrimeTrade Assignment API

A scalable REST API with authentication, role-based access control, and CRUD operations built with Node.js, Express, and MongoDB.

## 🚀 Features

- ✅ User registration & login with JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control (User vs Admin)
- ✅ CRUD operations for Tasks
- ✅ Input validation & sanitization
- ✅ Rate limiting for API security
- ✅ API versioning (v1)
- ✅ Comprehensive error handling
- ✅ MongoDB with Mongoose ODM

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/primetrade_assignment
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
   JWT_EXPIRE=24h
   FRONTEND_URL=http://localhost:5173
   ```

   **For MongoDB Atlas:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/primetrade_assignment
   ```

4. **Start MongoDB** (if using local MongoDB)
   ```bash
   mongod
   ```

## 🏃 Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

Use **Postman** or any HTTP client to test the API. See the API endpoints section below for all available routes.

## 🔗 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user profile (Protected)

### Tasks (CRUD)
- `POST /api/v1/tasks` - Create a new task (Protected)
- `GET /api/v1/tasks` - Get all tasks for current user (Protected)
- `GET /api/v1/tasks/:id` - Get single task (Protected)
- `PUT /api/v1/tasks/:id` - Update task (Protected)
- `DELETE /api/v1/tasks/:id` - Delete task (Protected)

### Admin
- `GET /api/v1/admin/tasks` - Get all tasks from all users (Admin only)

### Utility
- `GET /api/health` - Health check endpoint
- `GET /` - API information

## 📝 Example API Requests

### Register User
```bash
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "Password123"
}
```

### Login
```bash
POST http://localhost:5000/api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

### Create Task (Protected)
```bash
POST http://localhost:5000/api/v1/tasks
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "priority": "high",
  "status": "pending"
}
```

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js       # MongoDB connection
│   │   └── database.js       # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js # Authentication logic
│   │   └── taskController.js # Task CRUD logic
│   ├── middleware/
│   │   ├── auth.js           # JWT authentication
│   │   ├── roleCheck.js      # Role-based authorization
│   │   ├── errorHandler.js   # Global error handler
│   │   ├── validator.js      # Auth validation
│   │   └── taskValidator.js  # Task validation
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── Task.js           # Task schema
│   ├── routes/
│   │   ├── v1/
│   │   │   ├── auth.js       # Auth routes
│   │   │   └── tasks.js      # Task routes
│   │   └── index.js          # Route aggregator
│   ├── utils/
│   │   └── responseHandler.js # Response utilities
│   └── app.js                # Express app setup
├── .env                      # Environment variables
├── .env.example              # Environment template
├── .gitignore
├── package.json
└── README.md
```

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Express-validator for all inputs
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend origin
- **Error Handling**: No sensitive data in error responses

## 🎯 Role-Based Access Control

### User Role
- Can register and login
- Can create, read, update, and delete their own tasks
- Cannot access other users' tasks

### Admin Role
- All user permissions
- Can view all tasks from all users
- Can update/delete any task

**Note**: To create an admin user, manually update the `role` field in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 📊 Database Schema

### User Schema
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Schema
```javascript
{
  title: String (required),
  description: String,
  status: String (enum: ['pending', 'in_progress', 'completed']),
  priority: String (enum: ['low', 'medium', 'high']),
  userId: ObjectId (ref: 'User', required),
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

You can test the API using:
- **Postman**: Create a collection with all endpoints
- **cURL**: Command-line testing
- **Thunder Client** (VS Code extension)
- **Insomnia**: REST client

## 🚀 Deployment

### Environment Variables for Production
Make sure to set these in your hosting platform:
- `NODE_ENV=production`
- `MONGODB_URI=<your_mongodb_atlas_uri>`
- `JWT_SECRET=<strong_random_secret>`
- `FRONTEND_URL=<your_frontend_url>`

### Recommended Platforms
- **Backend**: Render, Railway, Heroku
- **Database**: MongoDB Atlas

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **express-validator**: Input validation
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **express-rate-limit**: Rate limiting

## 🤝 Contributing

This is an assignment project. For any issues or suggestions, please contact the developer.

## 📄 License

ISC

## 👨‍💻 Author

Created for PrimeTrade Backend Developer Internship Assignment

---

**Happy Coding! 🎉**
