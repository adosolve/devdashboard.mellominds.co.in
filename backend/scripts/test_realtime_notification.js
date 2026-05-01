// ⚠️ THIS IS FOR TESTING ONLY - Creates dummy notifications to test real-time functionality
// In production, notifications should be created by actual system events

// Simulate creating a new notification in real-time
async function createNotification() {
  const notifications = [
    {
      title: '🧪 TEST: New User Registration',
      message: '[TEST] A new user just signed up for Premium plan',
      type: 'success'
    },
    {
      title: '🧪 TEST: Payment Received',
      message: '[TEST] Payment of ₹3,500 received successfully',
      type: 'success'
    },
    {
      title: '🧪 TEST: Session Booking',
      message: '[TEST] New therapy session booked for tomorrow',
      type: 'info'
    },
    {
      title: '🧪 TEST: System Alert',
      message: '[TEST] Server maintenance will begin in 1 hour',
      type: 'warning'
    },
    {
      title: '🧪 TEST: Payment Failed',
      message: '[TEST] Payment processing failed - requires attention',
      type: 'error'
    }
  ];

  const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];

  try {
    const response = await fetch('http://localhost:5001/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 7,
        ...randomNotification
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Real-time notification created:', data.notification.title);
      console.log('   Message:', data.notification.message);
      console.log('   Type:', data.notification.type);
      console.log('   → Notification sent to connected clients!\n');
    } else {
      console.error('❌ Failed to create notification');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

console.log('🔔 Real-time Notification Tester');
console.log('================================\n');
console.log('Creating a test notification...\n');

createNotification();
