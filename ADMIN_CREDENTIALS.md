# Default Admin Credentials

## 🔐 Admin Login Details

The backend server automatically creates a default admin user on startup if it doesn't already exist.

### Credentials:
- **Email**: `admin@example.com`
- **Password**: `Admin123`
- **Role**: `admin`

## 📝 How to Login as Admin

1. Navigate to `http://localhost:5173/login`
2. Enter the credentials above
3. Click "Sign In"
4. You will be logged in with admin privileges

## 🔧 Admin Features

As an admin, you have access to:
- All regular user features (create, view, edit, delete your own tasks)
- **Admin-only endpoint**: `GET /api/v1/admin/tasks` - View all tasks from all users

## ⚙️ Technical Details

- The admin user is created by the `seedAdmin.js` script
- The script runs automatically after database connection
- If the admin user already exists, it will not create a duplicate
- The password is hashed using bcrypt before storage

## 🔒 Security Note

**IMPORTANT**: This is for development/testing purposes only. In production:
- Remove or disable the admin seeding script
- Use environment variables for admin credentials
- Implement proper admin user management
- Never commit hardcoded credentials to version control
