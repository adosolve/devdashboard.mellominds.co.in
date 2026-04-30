const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

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


// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
