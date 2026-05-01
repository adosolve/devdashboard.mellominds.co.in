/**
 * REAL NOTIFICATION EXAMPLES
 * 
 * This shows how to create notifications from actual system events.
 * Copy these patterns into your actual application code.
 */

// Example 1: When a new booking is created
async function onBookingCreated(bookingData) {
  const { clientName, therapistId, sessionDate } = bookingData;
  
  await fetch('http://localhost:5001/api/notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: therapistId,
      title: 'New Booking',
      message: `You have received a new booking from ${clientName}`,
      type: 'new_booking'
    })
  });
}

// Example 2: When a client transfer is requested
async function onClientTransferRequest(transferData) {
  const { clientName, fromTherapist, toTherapistId } = transferData;
  
  await fetch('http://localhost:5001/api/notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: toTherapistId,
      title: 'Client Transfer Request',
      message: `${fromTherapist} wants to transfer client "${clientName}" to you. Please review and approve or reject.`,
      type: 'transfer_request'
    })
  });
}

// Example 3: When a transfer is successful
async function onTransferSuccess(transferData) {
  const { clientName, toTherapistId } = transferData;
  
  await fetch('http://localhost:5001/api/notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: toTherapistId,
      title: 'Client Transfer Successful',
      message: `Client "${clientName}" has been successfully transferred to your account.`,
      type: 'transfer_success'
    })
  });
}

// Example 4: When a session is cancelled
async function onSessionCancelled(cancellationData) {
  const { clientName, therapistId, reason } = cancellationData;
  
  await fetch('http://localhost:5001/api/notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: therapistId,
      title: 'Session Cancelled',
      message: `${clientName} has cancelled their session. Reason: ${reason}`,
      type: 'cancellation'
    })
  });
}

// Example 5: When a new user registers (for admin)
async function onUserRegistration(userData) {
  const { userName, planName, adminUserId } = userData;
  
  await fetch('http://localhost:5001/api/notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: adminUserId,
      title: 'New User Registration',
      message: `${userName} has registered for ${planName} plan`,
      type: 'user_registration'
    })
  });
}

// Example 6: When payment is received (for admin)
async function onPaymentReceived(paymentData) {
  const { amount, userName, adminUserId } = paymentData;
  
  await fetch('http://localhost:5001/api/notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: adminUserId,
      title: 'Payment Received',
      message: `Payment of ₹${amount} received from ${userName}`,
      type: 'payment_success'
    })
  });
}

console.log('📚 Real Notification Examples');
console.log('==============================\n');
console.log('Copy these functions into your application code:');
console.log('1. onBookingCreated() - When a booking is made');
console.log('2. onClientTransferRequest() - When transfer is requested');
console.log('3. onTransferSuccess() - When transfer completes');
console.log('4. onSessionCancelled() - When session is cancelled');
console.log('5. onUserRegistration() - When user signs up');
console.log('6. onPaymentReceived() - When payment is processed');
console.log('\nThese will create REAL notifications from actual events!');
