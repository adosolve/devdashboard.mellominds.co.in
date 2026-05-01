const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});
const port = process.env.PORT || 5001;
const host = process.env.HOST || 'localhost';

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Database Connection Pool
const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Test Connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Successfully connected to the PostgreSQL database');
    release();
  }
});

// API Routes
app.get('/api/db-status', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    res.json({
      status: 'success',
      message: 'Database connected successfully',
      time: result.rows[0].current_time
    });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database connection failed', details: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
    
    // Map the database columns to the frontend User interface
    const mappedUsers = result.rows.map(row => ({
      id: row.id,
      name: row.user_name || 'Unknown',
      email: row.email || '',
      phone: row.phone || '',
      city: row.city || 'N/A',
      planName: row.plan_name || 'Free',
      // If the user hasn't added the status/join_date columns yet, default them gracefully
      status: row.status || 'Active', 
      joinDate: row.join_date || row.dob || new Date().toISOString()
    }));
    
    res.json(mappedUsers);
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const row = result.rows[0];
    const user = {
      id: row.id,
      name: row.user_name || 'Unknown',
      email: row.email || '',
      phone: row.phone || '',
      city: row.city || 'N/A',
      planName: row.plan_name || 'Free',
      status: row.status || 'Active', 
      joinDate: row.join_date || row.dob || new Date().toISOString()
    };
    
    res.json(user);
  } catch (error) {
    console.error('Fetch user error:', error);
    res.status(500).json({ error: 'Failed to fetch user', details: error.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, city, planName, status } = req.body;
  try {
    const query = `
      UPDATE users 
      SET user_name = $1, email = $2, phone = $3, city = $4, plan_name = $5, status = $6
      WHERE id = $7
      RETURNING *
    `;
    const values = [name, email, phone, city, planName, status, id];
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const row = result.rows[0];
    const updatedUser = {
      id: row.id,
      name: row.user_name || 'Unknown',
      email: row.email || '',
      phone: row.phone || '',
      city: row.city || 'N/A',
      planName: row.plan_name || 'Free',
      status: row.status || 'Active', 
      joinDate: row.join_date || row.dob || new Date().toISOString()
    };
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user', details: error.message });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const clientsResult = await pool.query('SELECT count(*) FROM clients');
    const appointmentsResult = await pool.query('SELECT count(*) FROM appointments');
    
    res.json({
      totalClients: parseInt(clientsResult.rows[0].count, 10) || 0,
      totalAppointments: parseInt(appointmentsResult.rows[0].count, 10) || 0
    });
  } catch (error) {
    console.error('Fetch stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats', details: error.message });
  }
});

// Notifications API Routes
app.get('/api/notifications', async (req, res) => {
  try {
    const { userId = 7 } = req.query; // Default to user 7 for now
    const result = await pool.query(
      `SELECT id, user_id, title, description as message, type, is_read, created_at 
       FROM notifications 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [userId]
    );
    
    // Format the response to match frontend expectations
    const notifications = result.rows.map(row => ({
      id: row.id,
      title: row.title,
      message: row.message,
      type: row.type,
      isRead: row.is_read,
      time: formatTimeAgo(row.created_at)
    }));
    
    res.json(notifications);
  } catch (error) {
    console.error('Fetch notifications error:', error);
    res.status(500).json({ error: 'Failed to fetch notifications', details: error.message });
  }
});

app.put('/api/notifications/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'UPDATE notifications SET is_read = true WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    
    // Emit update to connected clients
    const userId = result.rows[0].user_id;
    io.to(`user_${userId}`).emit('notification_read', { id: parseInt(id) });
    
    res.json({ success: true, notification: result.rows[0] });
  } catch (error) {
    console.error('Mark notification as read error:', error);
    res.status(500).json({ error: 'Failed to mark notification as read', details: error.message });
  }
});

app.put('/api/notifications/read-all', async (req, res) => {
  try {
    const { userId = 7 } = req.body;
    const result = await pool.query(
      'UPDATE notifications SET is_read = true WHERE user_id = $1 AND is_read = false RETURNING *',
      [userId]
    );
    
    // Emit update to connected clients
    io.to(`user_${userId}`).emit('all_notifications_read');
    
    res.json({ success: true, updatedCount: result.rowCount });
  } catch (error) {
    console.error('Mark all notifications as read error:', error);
    res.status(500).json({ error: 'Failed to mark all notifications as read', details: error.message });
  }
});

app.get('/api/notifications/unread-count', async (req, res) => {
  try {
    const { userId = 7 } = req.query;
    const result = await pool.query(
      'SELECT COUNT(*) as count FROM notifications WHERE user_id = $1 AND is_read = false',
      [userId]
    );
    
    res.json({ count: parseInt(result.rows[0].count, 10) });
  } catch (error) {
    console.error('Fetch unread count error:', error);
    res.status(500).json({ error: 'Failed to fetch unread count', details: error.message });
  }
});

// Create new notification (for testing real-time)
app.post('/api/notifications', async (req, res) => {
  try {
    const { userId = 7, title, message, type = 'info' } = req.body;
    
    const result = await pool.query(
      `INSERT INTO notifications (user_id, title, description, type, is_read, created_at) 
       VALUES ($1, $2, $3, $4, false, NOW()) 
       RETURNING id, user_id, title, description as message, type, is_read, created_at`,
      [userId, title, message, type]
    );
    
    const notification = {
      id: result.rows[0].id,
      title: result.rows[0].title,
      message: result.rows[0].message,
      type: result.rows[0].type,
      isRead: result.rows[0].is_read,
      time: formatTimeAgo(result.rows[0].created_at)
    };
    
    // Emit to connected clients in real-time
    io.to(`user_${userId}`).emit('new_notification', notification);
    
    res.json({ success: true, notification });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ error: 'Failed to create notification', details: error.message });
  }
});

// Helper function to format time ago
function formatTimeAgo(date) {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  return `${Math.floor(diffInSeconds / 2592000)} months ago`;
}


// Start Server
server.listen(port, host, () => {
  console.log(`Server is running on ${process.env.BACKEND_URL || `http://${host}:${port}`}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

// Socket.IO Connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Join user-specific room
  socket.on('join', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined their notification room`);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Helper function to emit notification to specific user
function emitNotificationToUser(userId, notification) {
  io.to(`user_${userId}`).emit('new_notification', notification);
}

// Export io for use in routes
module.exports = { io, emitNotificationToUser };
