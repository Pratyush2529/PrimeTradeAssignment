# PrimeTrade Backend Developer Assignment

A full-stack task management application with RESTful API, JWT authentication, role-based access control, and a modern React frontend.

## 📌 Project Overview

This project demonstrates a scalable REST API with authentication and role-based access control, along with a functional frontend UI for testing and interaction. Built as part of the PrimeTrade Backend Developer Internship assignment.

## 🚀 Features

### Backend
- ✅ User registration & login with JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control (User vs Admin)
- ✅ CRUD operations for Tasks
- ✅ Input validation & sanitization
- ✅ Rate limiting for API security
- ✅ API versioning (v1)
- ✅ Comprehensive error handling
- ✅ MongoDB with Mongoose ODM

### Frontend
- ✅ User authentication (Login/Register)
- ✅ Protected routes with JWT
- ✅ Task CRUD operations
- ✅ Task filtering by status and priority
- ✅ Real-time task statistics
- ✅ Responsive design with TailwindCSS
- ✅ Modern UI/UX

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd PrimeTradeAssignment
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install

# Frontend will use backend at http://localhost:5000/api

# Start frontend development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📚 API Documentation

Use **Postman** or any HTTP client to test the API. All endpoints are documented in the backend README file.

## 🗂️ Project Structure

```
PrimeTradeAssignment/
├── backend/                    # Node.js/Express backend
│   ├── src/
│   │   ├── config/            # Database config
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Auth, validation, error handling
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   ├── utils/             # Helper functions
│   │   └── app.js             # Express app setup
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── README.md
│
└── frontend/                   # React/Vite frontend
    ├── src/
    │   ├── components/        # React components
    │   ├── context/           # Auth context
    │   ├── pages/             # Page components
    │   ├── services/          # API services
    │   ├── utils/             # Helper functions
    │   ├── App.jsx            # Main app
    │   └── main.jsx           # Entry point
    ├── .env                   # Environment variables
    ├── package.json
    └── README.md
```

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

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Express-validator for all inputs
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend origin
- **Error Handling**: No sensitive data in error responses
- **Role-Based Access**: User and Admin roles

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

## 🚀 Deployment

### Backend Deployment (Render/Railway/Heroku)
1. Set environment variables:
   - `NODE_ENV=production`
   - `MONGODB_URI=<your_mongodb_atlas_uri>`
   - `JWT_SECRET=<strong_random_secret>`
   - `FRONTEND_URL=<your_frontend_url>`

2. Deploy backend
3. Note the backend URL

### Frontend Deployment (Vercel/Netlify)
1. Set environment variable:
   - `VITE_API_URL=<your_backend_url>/api`

2. Build and deploy:
   ```bash
   npm run build
   ```

## 📦 Tech Stack

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT & Bcrypt
- Express Validator

### Frontend
- React 18
- Vite
- TailwindCSS
- React Router DOM
- Axios

## 🧪 Testing

### Backend Testing
Use **Postman** or any HTTP client to test the API endpoints.

### Frontend Testing
1. Register a new user
2. Login with credentials
3. Create, edit, and delete tasks
4. Test filtering by status and priority

## 📝 Scalability Notes

See `SCALABILITY.md` for detailed notes on:
- Microservices architecture
- Caching strategies
- Load balancing
- Database optimization
- Horizontal scaling

## 🤝 Contributing

This is an assignment project. For any issues or suggestions, please contact the developer.

## 📄 License

ISC

## 👨‍💻 Author

Created for PrimeTrade Backend Developer Internship Assignment

## 📧 Submission

**Email To**: 
- saami@bajarangs.com
- nagasai@bajarangs.com
- chetan@bajarangs.com

**CC**: sonika@primetrade.ai

**Subject**: Backend Developer Task - [Your Name]

---

**Happy Coding! 🎉**
