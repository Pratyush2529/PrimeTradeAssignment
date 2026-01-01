# 🚀 Deployment Guide

## Backend Deployment (Render)

### Step 1: Sign Up for Render

1. Go to https://render.com
2. Sign up with GitHub (recommended)
3. Authorize Render to access your repositories

### Step 2: Create New Web Service

1. Click **New +** → **Web Service**
2. Connect your GitHub repository: `Pratyush2529/PrimeTradeAssignment`
3. Render will detect your repository

### Step 3: Configure Web Service

**Basic Settings:**
- **Name**: `primetrade-backend` (or any name you prefer)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select **Free** (sufficient for this project)

### Step 4: Add Environment Variables

Click **Advanced** → **Add Environment Variable**

Add these variables:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=24h
FRONTEND_URL=https://your-frontend-url.vercel.app
```

**Important:**
- Use your MongoDB Atlas connection string (not localhost)
- Generate a strong JWT_SECRET
- FRONTEND_URL will be updated after deploying frontend

### Step 5: Deploy

1. Click **Create Web Service**
2. Render will start building and deploying
3. Wait 2-5 minutes for deployment
4. You'll get a URL like: `https://primetrade-backend.onrender.com`

### Step 6: Test Backend

Visit: `https://your-backend-url.onrender.com`

You should see:
```json
{
  "success": true,
  "message": "Welcome to PrimeTrade Assignment API",
  "version": "1.0.0"
}
```

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

Update the API URL for production:

**File:** `frontend/src/utils/constants.js`

```javascript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://your-backend-url.onrender.com/api'
    : 'http://localhost:5000/api');
```

### Step 2: Create `.env.production` (Optional)

**File:** `frontend/.env.production`

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Step 3: Sign Up for Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel

### Step 4: Deploy Frontend

1. Click **Add New** → **Project**
2. Import `Pratyush2529/PrimeTradeAssignment`
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 5: Add Environment Variable

**Environment Variables:**
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Step 6: Deploy

1. Click **Deploy**
2. Wait 1-2 minutes
3. You'll get a URL like: `https://primetrade-assignment.vercel.app`

### Step 7: Update Backend CORS

Go back to Render → Your Backend Service → Environment

Update:
```
FRONTEND_URL=https://your-frontend-url.vercel.app
```

Click **Save Changes** (backend will redeploy)

---

## Post-Deployment Checklist

### Backend (Render)
- [ ] Service is running
- [ ] Root endpoint returns welcome message
- [ ] MongoDB connection successful
- [ ] Environment variables set correctly

### Frontend (Vercel)
- [ ] Site loads without errors
- [ ] Can register new user
- [ ] Can login
- [ ] Can create tasks
- [ ] Admin login works

### Integration
- [ ] Frontend can communicate with backend
- [ ] CORS configured correctly
- [ ] Cookies work across domains

---

## Troubleshooting

### Backend Issues

**"Application failed to respond"**
- Check logs in Render dashboard
- Verify MongoDB connection string
- Ensure PORT is set to 5000

**"CORS error"**
- Update FRONTEND_URL in Render environment variables
- Make sure it matches your Vercel URL exactly

### Frontend Issues

**"Network Error" or "Failed to fetch"**
- Check VITE_API_URL is correct
- Verify backend is running
- Check browser console for errors

**"Cookies not working"**
- This is expected with free Render (goes to sleep)
- For production, upgrade to paid tier or use different host

---

## Important Notes

### Render Free Tier Limitations
- Service goes to sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- For demo purposes, this is fine
- Wake it up before showing to reviewers

### MongoDB Atlas
- Make sure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0)
- Or add Render's IP addresses to whitelist

### Security
- Never commit `.env` files
- Use strong JWT_SECRET in production
- Keep MongoDB credentials secure

---

## Testing Deployed Application

1. **Visit your Vercel URL**
2. **Register a new user**
3. **Login and create tasks**
4. **Test admin features** (admin@example.com / Admin123)
5. **Share the URL with reviewers!**

---

## Update Your Submission Email

Add this to your email:

```
Live Demo:
Frontend: https://your-frontend-url.vercel.app
Backend API: https://your-backend-url.onrender.com

Note: The backend may take 30-60 seconds to wake up on first request (free tier limitation).
```

---

**Deployment complete! Your project is now live! 🎉**
