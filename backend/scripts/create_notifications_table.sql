-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(20) DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- Insert some sample notifications for testing
INSERT INTO notifications (user_id, title, message, type, is_read, created_at) VALUES
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
(7, 'Maintenance Complete', 'Scheduled maintenance completed successfully', 'success', true, NOW() - INTERVAL '5 days');
