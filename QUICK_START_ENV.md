# 🚀 Quick Start - Environment Configuration

## 📍 Server Locations

All server URLs are configured in `.env` files:

### Backend Location
**File**: `backend/.env`
```env
BACKEND_URL=http://localhost:5001
```

### Frontend Location
**File**: `frontend/.env`
```env
REACT_APP_BACKEND_URL=http://localhost:5001
```

---

## ⚡ Quick Changes

### Change Backend URL

1. **Edit backend/.env**
   ```env
   BACKEND_URL=http://your-new-url
   ```

2. **Edit frontend/.env**
   ```env
   REACT_APP_BACKEND_URL=http://your-new-url
   REACT_APP_API_URL=http://your-new-url/api
   REACT_APP_SOCKET_URL=http://your-new-url
   ```

3. **Restart servers**
   ```bash
   # Stop both servers (Ctrl+C)
   cd backend && npm run dev
   cd frontend && npm start
   ```

---

## 🌍 Environment Templates

### Local Development
```env
# backend/.env
BACKEND_URL=http://localhost:5001
FRONTEND_URL=http://localhost:3000

# frontend/.env
REACT_APP_BACKEND_URL=http://localhost:5001
```

### Production
```env
# backend/.env
BACKEND_URL=https://api.yourdomain.com
FRONTEND_URL=https://dashboard.yourdomain.com

# frontend/.env
REACT_APP_BACKEND_URL=https://api.yourdomain.com
```

---

## 📝 All Environment Variables

### Backend (.env)
```env
# Database
DB_HOST=187.127.140.201
DB_DATABASE=mello_db
DB_USER=mello_admin
DB_PASSWORD=Mello@dbadmin
DB_PORT=5432

# Server
PORT=5001
HOST=localhost
BACKEND_URL=http://localhost:5001
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
# Server
PORT=3000

# API
REACT_APP_BACKEND_URL=http://localhost:5001
REACT_APP_API_URL=http://localhost:5001/api
REACT_APP_SOCKET_URL=http://localhost:5001
REACT_APP_ENV=development
```

---

## ✅ Current Status

- **Backend**: http://localhost:5001 ✅
- **Frontend**: http://localhost:3000 ✅
- **Configuration**: Centralized in .env files ✅
- **Ready for**: Development, Staging, Production ✅

---

## 📚 Full Documentation

See `ENV_CONFIGURATION_GUIDE.md` for complete details.

---

**Last Updated**: May 1, 2026
