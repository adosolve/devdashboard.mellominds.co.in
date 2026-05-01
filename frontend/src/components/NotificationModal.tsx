import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { getApiUrl, getSocketUrl } from '../config/api.config';
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
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const notificationsPerPage = 10;

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(getApiUrl('/notifications?userId=7'));
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
          const unreadCount = data.filter((n: Notification) => !n.isRead).length;
          onUnreadCountChange?.(unreadCount);
        } else {
          console.error('Failed to fetch notifications');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
    
    // Connect to Socket.IO
    socketRef.current = io(getSocketUrl());
    socketRef.current.emit('join', 7);
    
    // Listen for new notifications in real-time
    socketRef.current.on('new_notification', (notification: Notification) => {
      setNotifications(prev => {
        const updated = [notification, ...prev];
        const newUnreadCount = updated.filter(n => !n.isRead).length;
        onUnreadCountChange?.(newUnreadCount);
        return updated;
      });
    });
    
    // Listen for notification read updates
    socketRef.current.on('notification_read', ({ id }: { id: number }) => {
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
    });
    
    // Listen for all notifications read
    socketRef.current.on('all_notifications_read', () => {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      onUnreadCountChange?.(0);
    });
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [onUnreadCountChange]);

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

  const handleMarkAsRead = async (id: number) => {
    try {
      const response = await fetch(getApiUrl(`/notifications/${id}/read`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
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
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await fetch(getApiUrl('/notifications/read-all'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 7 })
      });
      
      if (response.ok) {
        setNotifications(prev => {
          const updated = prev.map(notification => ({ ...notification, isRead: true }));
          onUnreadCountChange?.(0);
          return updated;
        });
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '/Light-Icon/Iconly/Light-Outline/Tick-Square.svg';
      case 'warning':
        return '/Light-Icon/Iconly/Light-Outline/Danger-Triangle.svg';
      case 'error':
        return '/Light-Icon/Iconly/Light-Outline/Danger-Circle.svg';
      default:
        return '/Light-Icon/Iconly/Light-Outline/Info-Square.svg';
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
          <img src="/Light-Icon/Iconly/Light-Outline/Arrow---Left.svg" alt="Previous" />
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
          <img src="/Light-Icon/Iconly/Light-Outline/Arrow---Right.svg" alt="Next" />
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
              <img src="/Light-Icon/Iconly/Light-Outline/Close-Square.svg" alt="Close" />
            </button>
          </div>
        </div>

        <div className="notification-list">
          {isLoading ? (
            <div className="no-notifications">
              <p>Loading notifications...</p>
            </div>
          ) : currentNotifications.length > 0 ? (
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