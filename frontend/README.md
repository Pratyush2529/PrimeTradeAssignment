# Frontend - Task Manager UI

A modern, responsive React application for task management with authentication and real-time updates.

## 🚀 Features

- ✅ User authentication (Login/Register)
- ✅ Protected routes with JWT
- ✅ Task CRUD operations
- ✅ Task filtering by status and priority
- ✅ Real-time task statistics
- ✅ Responsive design with TailwindCSS
- ✅ Modern UI/UX with smooth transitions

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)

## 🛠️ Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📱 Application Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx          # Login page
│   │   │   └── Register.jsx       # Registration page
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx      # Main dashboard
│   │   ├── Tasks/
│   │   │   ├── TaskList.jsx       # Task list display
│   │   │   ├── TaskItem.jsx       # Individual task card
│   │   │   └── TaskForm.jsx       # Create/Edit task form
│   │   └── common/
│   │       ├── Navbar.jsx         # Navigation bar
│   │       └── ProtectedRoute.jsx # Route protection
│   ├── context/
│   │   └── AuthContext.jsx        # Authentication context
│   ├── pages/
│   │   └── Home.jsx               # Landing page
│   ├── services/
│   │   └── api.js                 # API service layer
│   ├── utils/
│   │   └── tokenManager.js       # Token management
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── .env                           # Environment variables
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
└── package.json
```

## 🎨 Features Overview

### Authentication
- **Register**: Create a new account with username, email, and password
- **Login**: Sign in with email and password
- **Protected Routes**: Automatic redirect to login if not authenticated
- **Token Management**: Secure JWT token storage in localStorage

### Dashboard
- **Task Statistics**: Visual cards showing total, pending, in-progress, and completed tasks
- **Task Filtering**: Filter tasks by status and priority
- **Create Task**: Modal form to create new tasks
- **Edit Task**: Update existing tasks
- **Delete Task**: Remove tasks with confirmation

### Task Management
- **Priority Levels**: Low, Medium, High
- **Status Tracking**: Pending, In Progress, Completed
- **Color-Coded Badges**: Visual indicators for status and priority
- **Timestamps**: Creation and update dates for each task

## 🔒 Security Features

- JWT token authentication
- Protected routes
- Automatic token refresh handling
- Secure API communication
- Input validation on forms

## 🎯 User Flow

1. **Landing Page** → View features and benefits
2. **Register** → Create account
3. **Login** → Authenticate
4. **Dashboard** → View task statistics
5. **Create Task** → Add new tasks
6. **Manage Tasks** → Edit, update status, delete
7. **Filter Tasks** → Find specific tasks
8. **Logout** → End session

## 📦 Dependencies

- **react**: UI library
- **react-router-dom**: Routing
- **axios**: HTTP client
- **tailwindcss**: Utility-first CSS framework
- **vite**: Build tool

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables for Production
Make sure to set:
- `VITE_API_URL`: Your production backend URL

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
}
```

### Styles
Global styles are in `src/index.css`. Custom component classes use Tailwind's `@layer components`.

## 🐛 Troubleshooting

### API Connection Issues
- Ensure backend is running on the correct port
- Check `.env` file has correct `VITE_API_URL`
- Verify CORS is configured on backend

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

## 📄 License

ISC

## 👨‍💻 Author

Created for PrimeTrade Backend Developer Internship Assignment

---

**Happy Coding! 🎉**
