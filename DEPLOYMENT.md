# Deployment Guide - LEZIT Transports

This guide will help you deploy the LEZIT Transports application to Render.

## Prerequisites

1. A Render account (free tier available)
2. A MongoDB Atlas database
3. Email service credentials (Zoho, Gmail, etc.)
4. Google OAuth credentials (optional)

## Step 1: Prepare Your Repository

1. Ensure your code is pushed to a Git repository (GitHub, GitLab, etc.)
2. Make sure the `render.yaml` file is in the root directory
3. Verify that `.env` files are in `.gitignore`

## Step 2: Set Up MongoDB Atlas

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Add your IP to the whitelist (or use 0.0.0.0/0 for all IPs)

## Step 3: Deploy to Render

### Option A: Using render.yaml (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Blueprint"
3. Connect your Git repository
4. Render will automatically detect the `render.yaml` file
5. Click "Apply" to deploy both services

### Option B: Manual Deployment

#### Deploy Backend First:

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your Git repository
4. Configure the service:
   - **Name**: `lezit-transports-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   SMTP_HOST=your_smtp_host
   SMTP_PORT=465
   SMTP_USER_BOOKING=your_booking_email
   SMTP_PASS_BOOKING=your_booking_password
   SMTP_USER_SUPPORT=your_support_email
   SMTP_PASS_SUPPORT=your_support_password
   EMAIL_FROM=your_from_email
   FRONTEND_URL=https://your-frontend-url.onrender.com
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   SESSION_SECRET=your_session_secret
   ```

#### Deploy Frontend:

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Static Site"
3. Connect your Git repository
4. Configure the service:
   - **Name**: `lezit-transports-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Plan**: Free

5. Add Environment Variables:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   ```

## Step 4: Update CORS Settings

After deployment, update the backend CORS settings to allow your frontend domain:

```typescript
// In backend/src/server.ts
app.use(cors({
  origin: [
    'https://your-frontend-url.onrender.com',
    'http://localhost:3000' // for local development
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Step 5: Seed the Database

After the backend is deployed, you can seed the database with initial data:

1. Go to your backend service in Render
2. Click on "Shell"
3. Run: `npm run seed`

## Step 6: Test Your Deployment

1. Visit your frontend URL
2. Test user registration and login
3. Test service booking functionality
4. Check email notifications

## Environment Variables Reference

### Backend Variables:
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `SMTP_HOST`: SMTP server host
- `SMTP_USER_BOOKING`: Email for booking notifications
- `SMTP_PASS_BOOKING`: Password for booking email
- `SMTP_USER_SUPPORT`: Email for support notifications
- `SMTP_PASS_SUPPORT`: Password for support email
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

### Frontend Variables:
- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_GOOGLE_CLIENT_ID`: Google OAuth client ID

## Troubleshooting

### Common Issues:

1. **Build Failures**: Check the build logs in Render dashboard
2. **Database Connection**: Verify MongoDB URI and network access
3. **CORS Errors**: Update CORS settings to include your frontend domain
4. **Email Issues**: Verify SMTP credentials and settings

### Logs:
- Check Render dashboard for service logs
- Use `render logs` CLI command if you have Render CLI installed

## Security Notes

1. Never commit `.env` files to your repository
2. Use strong, unique secrets for JWT and session
3. Regularly rotate your secrets
4. Use HTTPS in production
5. Set up proper CORS policies

## Cost Optimization

- Free tier includes:
  - 750 hours/month for web services
  - 100GB bandwidth
  - Automatic sleep after 15 minutes of inactivity
- Consider upgrading to paid plans for production use 