import React, { useState, useEffect, useRef } from 'react';
import './NotificationModal.css';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
}

interface NotificationModalProps {
  onClose: () => void;
  onUnreadCountChange?: (count: number) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ onClose, onUnreadCountChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const notificationsPerPage = 10;

  // Mock notification data
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: 1,
        title: 'New User Registration',
        message: 'John Doe has registered for a Premium plan',
        time: '2 minutes ago',
        type: 'success',
        isRead: false
      },
      {
        id: 2,
        title: 'Payment Received',
        message: 'Payment of ₹2,500 received from Sarah Wilson',
        time: '15 minutes ago',
        type: 'success',
        isRead: false
      },
      {
        id: 3,
        title: 'Session Booking',
        message: 'New session booked by Michael Brown for tomorrow',
        time: '1 hour ago',
        type: 'info',
        isRead: true
      },
      {
        id: 4,
        title: 'System Update',
        message: 'System maintenance scheduled for tonight at 2 AM',
        time: '2 hours ago',
        type: 'warning',
        isRead: true
      },
      {
        id: 5,
        title: 'Payment Failed',
        message: 'Payment failed for user Emma Davis - requires attention',
        time: '3 hours ago',
        type: 'error',
        isRead: false
      },
      {
        id: 6,
        title: 'New Feature Release',
        message: 'Analytics dashboard v2.0 is now available',
        time: '5 hours ago',
        type: 'info',
        isRead: true
      },
      {
        id: 7,
        title: 'User Feedback',
        message: 'Positive feedback received from Alex Johnson',
        time: '1 day ago',
        type: 'success',
        isRead: true
      },
      {
        id: 8,
        title: 'Subscription Expiry',
        message: 'Premium subscription expires in 3 days for Lisa Chen',
        time: '1 day ago',
        type: 'warning',
        isRead: false
      },
      {
        id: 9,
        title: 'Server Alert',
        message: 'High CPU usage detected on server #2',
        time: '2 days ago',
        type: 'error',
        isRead: true
      },
      {
        id: 10,
        title: 'Monthly Report',
        message: 'Monthly analytics report is ready for download',
        time: '2 days ago',
        type: 'info',
        isRead: true
      },
      {
        id: 11,
        title: 'New Team Member',
        message: 'David Kim has joined as a support specialist',
        time: '3 days ago',
        type: 'success',
        isRead: true
      },
      {
        id: 12,
        title: 'Backup Completed',
        message: 'Daily backup completed successfully',
        time: '3 days ago',
        type: 'success',
        isRead: true
      },
      {
        id: 13,
        title: 'Security Alert',
        message: 'Multiple failed login attempts detected',
        time: '4 days ago',
        type: 'error',
        isRead: false
      },
      {
        id: 14,
        title: 'Feature Request',
        message: 'New feature request submitted by premium users',
        time: '4 days ago',
        type: 'info',
        isRead: true
      },
      {
        id: 15,
        title: 'Maintenance Complete',
        message: 'Scheduled maintenance completed successfully',
        time: '5 days ago',
        type: 'success',
        isRead: true
      },
      {
        id: 16,
        title: 'User Milestone',
        message: 'Congratulations! You have reached 1000 active users',
        time: '1 week ago',
        type: 'success',
        isRead: true
      },
      {
        id: 17,
        title: 'API Update',
        message: 'API v3.0 documentation is now available',
        time: '1 week ago',
        type: 'info',
        isRead: true
      },
      {
        id: 18,
        title: 'Performance Alert',
        message: 'Database query performance has improved by 25%',
        time: '1 week ago',
        type: 'success',
        isRead: true
      },
      {
        id: 19,
        title: 'User Survey',
        message: 'Annual user satisfaction survey results available',
        time: '2 weeks ago',
        type: 'info',
        isRead: true
      },
      {
        id: 20,
        title: 'Holiday Notice',
        message: 'Office will be closed for holiday season',
        time: '2 weeks ago',
        type: 'warning',
        isRead: true
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const totalPages = Math.ceil(notifications.length / notificationsPerPage);
  const startIndex = (currentPage - 1) * notificationsPerPage;
  const endIndex = startIndex + notificationsPerPage;
  const currentNotifications = notifications.slice(startIndex, endIndex);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => {
      const updated = prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      );
      const newUnreadCount = updated.filter(n => !n.isRead).length;
      onUnreadCountChange?.(newUnreadCount);
      return updated;
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(notification => ({ ...notification, isRead: true }));
      onUnreadCountChange?.(0);
      return updated;
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '/Light-Icon/Iconly/Light-Outline/Tick Square.svg';
      case 'warning':
        return '/Light-Icon/Iconly/Light-Outline/Danger Triangle.svg';
      case 'error':
        return '/Light-Icon/Iconly/Light-Outline/Danger Circle.svg';
      default:
        return '/Light-Icon/Iconly/Light-Outline/Info Square.svg';
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <img src="/Light-Icon/Iconly/Light-Outline/Arrow - Left.svg" alt="Previous" />
        </button>
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <img src="/Light-Icon/Iconly/Light-Outline/Arrow - Right.svg" alt="Next" />
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="notification-modal-overlay">
      <div className="notification-modal" ref={modalRef}>
        <div className="notification-header">
          <div className="notification-title">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount}</span>
            )}
          </div>
          <div className="notification-actions">
            {unreadCount > 0 && (
              <button 
                className="mark-all-read-btn"
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </button>
            )}
            <button className="close-btn" onClick={onClose}>
              <img src="/Light-Icon/Iconly/Light-Outline/Close Square.svg" alt="Close" />
            </button>
          </div>
        </div>

        <div className="notification-list">
          {currentNotifications.length > 0 ? (
            currentNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="notification-icon">
                  <img 
                    src={getNotificationIcon(notification.type)} 
                    alt={notification.type}
                    className={`icon-${notification.type}`}
                  />
                </div>
                <div className="notification-content">
                  <div className="notification-text">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                  </div>
                  <div className="notification-time">
                    {notification.time}
                  </div>
                </div>
                {!notification.isRead && <div className="unread-dot"></div>}
              </div>
            ))
          ) : (
            <div className="no-notifications">
              <img src="/Light-Icon/Iconly/Light-Outline/Notification.svg" alt="No notifications" />
              <p>No notifications found</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="notification-pagination">
            <div className="pagination-info">
              Showing {startIndex + 1}-{Math.min(endIndex, notifications.length)} of {notifications.length}
            </div>
            <div className="pagination-controls">
              {renderPagination()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;