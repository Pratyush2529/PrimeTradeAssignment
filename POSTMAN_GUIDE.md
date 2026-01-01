# API Testing with Postman

Hey! I've set up a Postman collection to make it easier to test all the API endpoints. Here's how you can get started.

## Getting Started

### Import the Collection

Just import the `PrimeTradeAssignment.postman_collection.json` file into Postman:

1. Open Postman
2. Click Import (top left)
3. Drag the JSON file or browse to select it
4. That's it!

The base URL is already configured as `http://localhost:5000/api`, so you're good to go.

### Before Testing

Make sure the backend server is running:
```bash
cd backend
npm run dev
```

---

## Testing the API

### Authentication

**Register a new user:**
```
POST /v1/auth/register
```
Body:
```json
{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "Pass123"
}
```

**Login:**
```
POST /v1/auth/login
```
Body:
```json
{
    "email": "john@example.com",
    "password": "Pass123"
}
```

The authentication uses httpOnly cookies, so Postman handles it automatically. Once you login, the cookie is set and you're authenticated for all subsequent requests.


**Test if you're logged in:**
```
GET /v1/auth/me
```
This returns your user profile if authentication is working.

**For admin testing:**
```
POST /v1/auth/login
```
Body:
```json
{
    "email": "admin@example.com",
    "password": "Admin123"
}
```

---

### Task Management

**Create a task:**
```
POST /v1/tasks
```
Body:
```json
{
    "title": "Complete project documentation",
    "description": "Write README and API docs",
    "status": "pending",
    "priority": "high"
}
```

Valid values:
- **status**: `pending`, `in_progress`, `completed`
- **priority**: `low`, `medium`, `high`

**Get your tasks:**
```
GET /v1/tasks
```

**Filter tasks:**
```
GET /v1/tasks?status=pending&priority=high&page=1&limit=10
```

**Update a task:**
```
PUT /v1/tasks/:id
```
Replace `:id` with the actual task ID.

**Delete a task:**
```
DELETE /v1/tasks/:id
```

---

### Admin Features

These endpoints require admin login.

**Get all users' tasks:**
```
GET /v1/admin/tasks
```

**Update any task:**
```
PUT /v1/admin/tasks/:id
```

**Delete any task:**
```
DELETE /v1/admin/tasks/:id
```

---

## Notes

### About Cookies

I'm using httpOnly cookies for authentication, which is more secure than localStorage. Postman automatically handles these cookies - once you login, all subsequent requests will include the authentication cookie.

To view cookies in Postman:
1. Click "Cookies" link below the Send button
2. You'll see the `token` cookie for localhost

### Logout

```
POST /v1/auth/logout
```
This clears the authentication cookie.

---

## Common Issues

**"No token provided"**  
Make sure you've logged in first. The cookie is set automatically after login/register.

**"Access denied"**  
For admin endpoints, you need to login as admin. For regular endpoints, just make sure you're authenticated.

**Connection errors**  
Check that the backend server is running on port 5000.

---

## All Endpoints

| Method | Endpoint | Auth Required | Admin Only |
|--------|----------|---------------|------------|
| POST | `/v1/auth/register` | No | No |
| POST | `/v1/auth/login` | No | No |
| GET | `/v1/auth/me` | Yes | No |
| PUT | `/v1/auth/profile` | Yes | No |
| POST | `/v1/auth/logout` | Yes | No |
| POST | `/v1/tasks` | Yes | No |
| GET | `/v1/tasks` | Yes | No |
| GET | `/v1/tasks/:id` | Yes | No |
| PUT | `/v1/tasks/:id` | Yes | No |
| DELETE | `/v1/tasks/:id` | Yes | No |
| GET | `/v1/admin/tasks` | Yes | Yes |
| PUT | `/v1/admin/tasks/:id` | Yes | Yes |
| DELETE | `/v1/admin/tasks/:id` | Yes | Yes |

---

That's it! The collection should make testing much easier.

