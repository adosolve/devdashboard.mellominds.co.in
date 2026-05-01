# Environment Configuration Guide

## 🎯 Overview

All server locations and API endpoints are now centralized in `.env` files for easy configuration and deployment. This allows you to change server URLs in one place without modifying code.

---

## 📁 Environment Files

### Backend Environment File
**Location**: `backend/.env`

```env
# Database Configuration
DB_HOST=187.127.140.201
DB_DATABASE=mello_db
DB_USER=mello_admin
DB_PASSWORD=Mello@dbadmin
DB_PORT=5432

# Backend Server Configuration
PORT=5001
HOST=localhost
BACKEND_URL=http://localhost:5001

# Frontend Configuration (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment File
**Location**: `frontend/.env`

```env
# Frontend Server Configuration
PORT=3000
HOST=localhost

# Backend API Configuration
REACT_APP_BACKEND_URL=http://localhost:5001
REACT_APP_API_URL=http://localhost:5001/api

# Socket.IO Configuration
REACT_APP_SOCKET_URL=http://localhost:5001

# Environment
REACT_APP_ENV=development
```

---

## 🔧 Configuration Details

### Backend Configuration

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `PORT` | Backend server port | 5001 | 5001 |
| `HOST` | Backend server host | localhost | localhost |
| `BACKEND_URL` | Full backend URL | http://localhost:5001 | https://api.example.com |
| `FRONTEND_URL` | Frontend URL (for CORS) | http://localhost:3000 | https://example.com |
| `DB_HOST` | Database host | - | 187.127.140.201 |
| `DB_DATABASE` | Database name | - | mello_db |
| `DB_USER` | Database user | - | mello_admin |
| `DB_PASSWORD` | Database password | - | Mello@dbadmin |
| `DB_PORT` | Database port | 5432 | 5432 |

### Frontend Configuration

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `PORT` | Frontend server port | 3000 | 3000 |
| `HOST` | Frontend server host | localhost | localhost |
| `REACT_APP_BACKEND_URL` | Backend base URL | http://localhost:5001 | https://api.example.com |
| `REACT_APP_API_URL` | API base URL | http://localhost:5001/api | https://api.example.com/api |
| `REACT_APP_SOCKET_URL` | Socket.IO URL | http://localhost:5001 | https://api.example.com |
| `REACT_APP_ENV` | Environment name | development | production |

---

## 🚀 Usage in Code

### Backend (server.js)

```javascript
// Server configuration from .env
const port = process.env.PORT || 5001;
const host = process.env.HOST || 'localhost';

// CORS configuration from .env
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Server startup
server.listen(port, host, () => {
  console.log(`Server is running on ${process.env.BACKEND_URL}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
});
```

### Frontend (api.config.ts)

```typescript
// Centralized API configuration
const API_CONFIG = {
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001',
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  SOCKET_URL: process.env.REACT_APP_SOCKET_URL || 'http://localhost:5001',
  ENV: process.env.REACT_APP_ENV || 'development',
};

// Helper functions
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.API_URL}${endpoint}`;
};

export const getSocketUrl = (): string => {
  return API_CONFIG.SOCKET_URL;
};
```

### Components Usage

```typescript
import { getApiUrl, getSocketUrl } from '../config/api.config';

// Fetch data
const response = await fetch(getApiUrl('/users'));

// Connect to Socket.IO
const socket = io(getSocketUrl());
```

---

## 🌍 Environment-Specific Configuration

### Development Environment

**backend/.env**
```env
PORT=5001
HOST=localhost
BACKEND_URL=http://localhost:5001
FRONTEND_URL=http://localhost:3000
```

**frontend/.env**
```env
PORT=3000
REACT_APP_BACKEND_URL=http://localhost:5001
REACT_APP_API_URL=http://localhost:5001/api
REACT_APP_SOCKET_URL=http://localhost:5001
REACT_APP_ENV=development
```

### Production Environment

**backend/.env.production**
```env
PORT=5001
HOST=0.0.0.0
BACKEND_URL=https://api.mellominds.com
FRONTEND_URL=https://dashboard.mellominds.com
```

**frontend/.env.production**
```env
REACT_APP_BACKEND_URL=https://api.mellominds.com
REACT_APP_API_URL=https://api.mellominds.com/api
REACT_APP_SOCKET_URL=https://api.mellominds.com
REACT_APP_ENV=production
```

### Staging Environment

**backend/.env.staging**
```env
PORT=5001
HOST=0.0.0.0
BACKEND_URL=https://api-staging.mellominds.com
FRONTEND_URL=https://dashboard-staging.mellominds.com
```

**frontend/.env.staging**
```env
REACT_APP_BACKEND_URL=https://api-staging.mellominds.com
REACT_APP_API_URL=https://api-staging.mellominds.com/api
REACT_APP_SOCKET_URL=https://api-staging.mellominds.com
REACT_APP_ENV=staging
```

---

## 🔄 Deployment Configurations

### Vercel Deployment (Frontend)

**vercel.json**
```json
{
  "env": {
    "REACT_APP_BACKEND_URL": "https://api.mellominds.com",
    "REACT_APP_API_URL": "https://api.mellominds.com/api",
    "REACT_APP_SOCKET_URL": "https://api.mellominds.com",
    "REACT_APP_ENV": "production"
  }
}
```

Or set in Vercel Dashboard:
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add each variable with appropriate values

### Heroku Deployment (Backend)

Set environment variables using Heroku CLI:
```bash
heroku config:set PORT=5001
heroku config:set BACKEND_URL=https://your-app.herokuapp.com
heroku config:set FRONTEND_URL=https://your-frontend.vercel.app
heroku config:set DB_HOST=your-db-host
heroku config:set DB_DATABASE=your-db-name
heroku config:set DB_USER=your-db-user
heroku config:set DB_PASSWORD=your-db-password
```

### AWS/DigitalOcean Deployment

Create `.env` file on server:
```bash
# SSH into server
ssh user@your-server

# Navigate to backend directory
cd /var/www/backend

# Create .env file
nano .env

# Add production variables
PORT=5001
HOST=0.0.0.0
BACKEND_URL=https://api.yourdomain.com
FRONTEND_URL=https://dashboard.yourdomain.com
# ... other variables
```

---

## 📝 API Endpoints Configuration

All API endpoints are centralized in `frontend/src/config/api.config.ts`:

```typescript
ENDPOINTS: {
  // Users
  USERS: '/users',
  USER_BY_ID: (id: number | string) => `/users/${id}`,
  
  // Notifications
  NOTIFICATIONS: '/notifications',
  NOTIFICATION_READ: (id: number | string) => `/notifications/${id}/read`,
  NOTIFICATIONS_READ_ALL: '/notifications/read-all',
  NOTIFICATIONS_UNREAD_COUNT: '/notifications/unread-count',
  
  // Stats
  STATS: '/stats',
  DB_STATUS: '/db-status',
}
```

### Usage Example

```typescript
import API_CONFIG, { getApiUrl } from '../config/api.config';

// Get all users
const usersUrl = getApiUrl(API_CONFIG.ENDPOINTS.USERS);
// Result: http://localhost:5001/api/users

// Get specific user
const userUrl = getApiUrl(API_CONFIG.ENDPOINTS.USER_BY_ID(7));
// Result: http://localhost:5001/api/users/7

// Get notifications
const notificationsUrl = getApiUrl(API_CONFIG.ENDPOINTS.NOTIFICATIONS);
// Result: http://localhost:5001/api/notifications
```

---

## 🔒 Security Best Practices

### 1. Never Commit Sensitive Data

Add to `.gitignore`:
```
# Environment files
.env
.env.local
.env.production
.env.staging
*.env

# Keep example files
!.env.example
```

### 2. Create Example Files

**backend/.env.example**
```env
# Database Configuration
DB_HOST=your_db_host
DB_DATABASE=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_PORT=5432

# Backend Server Configuration
PORT=5001
HOST=localhost
BACKEND_URL=http://localhost:5001

# Frontend Configuration (for CORS)
FRONTEND_URL=http://localhost:3000
```

**frontend/.env.example**
```env
# Frontend Server Configuration
PORT=3000
HOST=localhost

# Backend API Configuration
REACT_APP_BACKEND_URL=http://localhost:5001
REACT_APP_API_URL=http://localhost:5001/api

# Socket.IO Configuration
REACT_APP_SOCKET_URL=http://localhost:5001

# Environment
REACT_APP_ENV=development
```

### 3. Use Different Credentials per Environment

- Development: Local database
- Staging: Staging database
- Production: Production database

### 4. Rotate Secrets Regularly

Change database passwords and API keys periodically.

---

## 🧪 Testing Different Environments

### Test Local Development

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start

# Verify URLs
Backend: http://localhost:5001
Frontend: http://localhost:3000
```

### Test Production Configuration

```bash
# Backend
cd backend
NODE_ENV=production npm start

# Frontend
cd frontend
npm run build
serve -s build
```

### Test with Custom Ports

**backend/.env**
```env
PORT=8080
BACKEND_URL=http://localhost:8080
```

**frontend/.env**
```env
PORT=4000
REACT_APP_BACKEND_URL=http://localhost:8080
REACT_APP_API_URL=http://localhost:8080/api
```

---

## 🔍 Troubleshooting

### Issue: CORS Errors

**Problem**: Frontend can't connect to backend  
**Solution**: Check `FRONTEND_URL` in backend `.env` matches frontend URL

```env
# backend/.env
FRONTEND_URL=http://localhost:3000  # Must match frontend URL
```

### Issue: API Calls Failing

**Problem**: 404 errors on API calls  
**Solution**: Verify `REACT_APP_API_URL` in frontend `.env`

```env
# frontend/.env
REACT_APP_API_URL=http://localhost:5001/api  # Must include /api
```

### Issue: Socket.IO Not Connecting

**Problem**: Real-time notifications not working  
**Solution**: Check `REACT_APP_SOCKET_URL` matches backend URL

```env
# frontend/.env
REACT_APP_SOCKET_URL=http://localhost:5001  # No /api suffix
```

### Issue: Environment Variables Not Loading

**Problem**: Changes to .env not reflected  
**Solution**: Restart both servers

```bash
# Stop servers (Ctrl+C)
# Restart backend
cd backend && npm run dev

# Restart frontend
cd frontend && npm start
```

---

## 📊 Configuration Checklist

### Development Setup

- [ ] Create `backend/.env` with local configuration
- [ ] Create `frontend/.env` with local configuration
- [ ] Set `PORT=5001` for backend
- [ ] Set `PORT=3000` for frontend
- [ ] Set `BACKEND_URL=http://localhost:5001`
- [ ] Set `FRONTEND_URL=http://localhost:3000`
- [ ] Test API calls work
- [ ] Test Socket.IO connections work

### Production Setup

- [ ] Create production `.env` files
- [ ] Use production database credentials
- [ ] Use HTTPS URLs
- [ ] Set `HOST=0.0.0.0` for backend
- [ ] Configure CORS for production domain
- [ ] Test all API endpoints
- [ ] Test real-time features
- [ ] Verify security settings

---

## ✅ Benefits of Centralized Configuration

### 1. **Easy Deployment**
Change URLs in one place for different environments

### 2. **No Code Changes**
Switch between dev/staging/prod without modifying code

### 3. **Security**
Keep sensitive data in `.env` files (not in code)

### 4. **Team Collaboration**
Each developer can have their own local configuration

### 5. **Scalability**
Easy to add new environments or change infrastructure

### 6. **Maintainability**
All configuration in one place, easy to update

---

## 📚 Files Modified

### Backend
- ✅ `backend/.env` - Added server configuration
- ✅ `backend/server.js` - Uses environment variables

### Frontend
- ✅ `frontend/.env` - Created with all configuration
- ✅ `frontend/src/config/api.config.ts` - Centralized API config
- ✅ `frontend/src/components/Header.tsx` - Uses config
- ✅ `frontend/src/components/NotificationModal.tsx` - Uses config
- ✅ `frontend/src/components/AllUsers.tsx` - Uses config
- ✅ `frontend/src/components/UserProfile.tsx` - Uses config
- ✅ `frontend/src/components/RecentUsersTable.tsx` - Uses config
- ✅ `frontend/src/pages/UserProfilePage.tsx` - Uses config

---

## 🎉 Summary

All server locations and API endpoints are now configured through environment variables:

- ✅ Backend server URL configurable
- ✅ Frontend server URL configurable
- ✅ API endpoints centralized
- ✅ Socket.IO URL configurable
- ✅ Database credentials in .env
- ✅ CORS configuration from .env
- ✅ Easy deployment to any environment
- ✅ No hardcoded URLs in code

**Change server locations by editing `.env` files only!**

---

**Configuration Date**: May 1, 2026  
**Status**: Complete ✅  
**Ready for**: Development, Staging, Production
