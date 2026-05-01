const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

async function insertSampleNotifications() {
  try {
    console.log('Checking existing notifications...');
    
    const countResult = await pool.query('SELECT COUNT(*) FROM notifications WHERE user_id = 7');
    const existingCount = parseInt(countResult.rows[0].count, 10);
    
    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing notifications. Skipping insert.`);
      await pool.end();
      return;
    }
    
    console.log('Inserting sample notifications...');
    
    await pool.query(`
      INSERT INTO notifications (user_id, title, description, type, is_read, created_at) VALUES
      (7, 'New User Registration', 'John Doe has registered for a Premium plan', 'success', false, NOW() - INTERVAL '2 minutes'),
      (7, 'Payment Received', 'Payment of ₹2,500 received from Sarah Wilson', 'success', false, NOW() - INTERVAL '15 minutes'),
      (7, 'Session Booking', 'New session booked by Michael Brown for tomorrow', 'info', true, NOW() - INTERVAL '1 hour'),
      (7, 'System Update', 'System maintenance scheduled for tonight at 2 AM', 'warning', true, NOW() - INTERVAL '2 hours'),
      (7, 'Payment Failed', 'Payment failed for user Emma Davis - requires attention', 'error', false, NOW() - INTERVAL '3 hours'),
      (7, 'New Feature Release', 'Analytics dashboard v2.0 is now available', 'info', true, NOW() - INTERVAL '5 hours'),
      (7, 'User Feedback', 'Positive feedback received from Alex Johnson', 'success', true, NOW() - INTERVAL '1 day'),
      (7, 'Subscription Expiry', 'Premium subscription expires in 3 days for Lisa Chen', 'warning', false, NOW() - INTERVAL '1 day'),
      (7, 'Server Alert', 'High CPU usage detected on server #2', 'error', true, NOW() - INTERVAL '2 days'),
      (7, 'Monthly Report', 'Monthly analytics report is ready for download', 'info', true, NOW() - INTERVAL '2 days'),
      (7, 'New Team Member', 'David Kim has joined as a support specialist', 'success', true, NOW() - INTERVAL '3 days'),
      (7, 'Backup Completed', 'Daily backup completed successfully', 'success', true, NOW() - INTERVAL '3 days'),
      (7, 'Security Alert', 'Multiple failed login attempts detected', 'error', false, NOW() - INTERVAL '4 days'),
      (7, 'Feature Request', 'New feature request submitted by premium users', 'info', true, NOW() - INTERVAL '4 days'),
      (7, 'Maintenance Complete', 'Scheduled maintenance completed successfully', 'success', true, NOW() - INTERVAL '5 days'),
      (7, 'User Milestone', 'Congratulations! You have reached 1000 active users', 'success', true, NOW() - INTERVAL '1 week'),
      (7, 'API Update', 'API v3.0 documentation is now available', 'info', true, NOW() - INTERVAL '1 week'),
      (7, 'Performance Alert', 'Database query performance has improved by 25%', 'success', true, NOW() - INTERVAL '1 week'),
      (7, 'User Survey', 'Annual user satisfaction survey results available', 'info', true, NOW() - INTERVAL '2 weeks'),
      (7, 'Holiday Notice', 'Office will be closed for holiday season', 'warning', true, NOW() - INTERVAL '2 weeks')
    `);
    
    console.log('✅ Sample notifications inserted successfully!');
    
    const result = await pool.query('SELECT COUNT(*) FROM notifications WHERE user_id = 7');
    console.log(`Total notifications for user 7: ${result.rows[0].count}`);
    
  } catch (error) {
    console.error('❌ Error inserting notifications:', error);
  } finally {
    await pool.end();
  }
}

insertSampleNotifications();
