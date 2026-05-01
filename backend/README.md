# MelloMinds Dashboard - Backend API

Backend API server for MelloMinds Dashboard built with Express.js, PostgreSQL, and Socket.IO.

## 🚀 Features

- RESTful API endpoints
- PostgreSQL database integration
- Real-time notifications via Socket.IO
- CORS enabled for frontend communication
- Environment-based configuration

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## 🔧 Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file in the backend directory:
```env
DB_HOST=your_database_host
DB_DATABASE=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_PORT=5432
PORT=5001
```

3. Setup database:
```bash
# Check database connection
node scripts/check_table.js

# Setup notifications table (if needed)
node scripts/setup_notifications.js
```

## 🏃 Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5001`

## 📡 API Endpoints

### Users
- `GET /api/users` - Get all users
- `PUT /api/users/:id` - Update user
- `GET /api/stats` - Get dashboard statistics

### Notifications
- `GET /api/notifications?userId=:id` - Get user notifications
- `GET /api/notifications/unread-count?userId=:id` - Get unread count
- `POST /api/notifications` - Create new notification
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all as read

### Health Check
- `GET /api/db-status` - Check database connection

## 🔌 Socket.IO Events

### Client → Server
- `join` - Join user-specific notification room

### Server → Client
- `new_notification` - New notification created
- `notification_read` - Notification marked as read
- `all_notifications_read` - All notifications marked as read

## 📁 Project Structure

```
backend/
├── server.js           # Main server file
├── package.json        # Dependencies
├── .env               # Environment variables
└── scripts/           # Database and utility scripts
    ├── check_table.js
    ├── check_users_schema.js
    ├── setup_notifications.js
    └── test_realtime_notification.js
```

## 🧪 Testing

### Test real-time notifications:
```bash
node scripts/test_realtime_notification.js
```

### Check database schema:
```bash
node scripts/check_users_schema.js
```

## 🚀 Deployment

### Deploy to Railway/Render/Heroku:

1. Set environment variables in your hosting platform
2. Deploy the `backend` folder
3. Run `npm install` and `npm start`

### Environment Variables Required:
- `DB_HOST`
- `DB_DATABASE`
- `DB_USER`
- `DB_PASSWORD`
- `DB_PORT`
- `PORT` (optional, defaults to 5001)

## 📝 Notes

- CORS is configured to allow requests from `http://localhost:3000` (frontend)
- Socket.IO is configured for real-time bidirectional communication
- Database connection pool is used for efficient query handling
- All API responses are in JSON format

## 🔒 Security

- Environment variables for sensitive data
- CORS configured for specific origins
- SQL injection prevention via parameterized queries
- Input validation on all endpoints

## 📞 Support

For issues or questions, please contact the development team.
