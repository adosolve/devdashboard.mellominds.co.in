import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DateFilter from './DateFilter';
import EditProfileModal from './EditProfileModal';
import ChangePasswordModal from './ChangePasswordModal';
import NotificationModal from './NotificationModal';
import './Header.css';

interface HeaderProps {
  currentPage?: string;
  userRole?: string;
  superAdminName?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  currentPage = 'Dashboard', 
  userRole = 'superadmin',
  superAdminName = 'Totok Michael'
}) => {
  const showDateFilter = userRole === 'superadmin' && currentPage === 'Dashboard';
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(5); // Mock unread count
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
    setShowProfileDropdown(false);
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
    setShowProfileDropdown(false);
  };

  const handleNotificationClick = () => {
    setShowNotifications(true);
  };

  const handleUnreadCountChange = (count: number) => {
    setUnreadNotificationCount(count);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowProfileDropdown(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="page-title">
            {currentPage === 'All Users' ? (
              <>
                <h1>All Users</h1>
                <p>Manage and view all registered users</p>
              </>
            ) : currentPage === 'Payments' ? (
              <>
                <h1>Payments</h1>
                <p>Track and manage payment transactions</p>
              </>
            ) : currentPage === 'Demographic Analytics' ? (
              <>
                <h1>Demographic Analytics</h1>
                <p>User insights and location-based analytics</p>
              </>
            ) : (
              <>
                <h1>Welcome {superAdminName}!</h1>
                <p>SuperAdmin's Dashboard View</p>
              </>
            )}
          </div>
        </div>
        
        <div className="header-right">
          {showDateFilter && <DateFilter />}
          
          <div className="notification-container">
            <button className="notification-btn" onClick={handleNotificationClick}>
              <img src="/Light-Icon/Iconly/Light-Outline/Notification.svg" alt="Notifications" className="header-icon" />
              {unreadNotificationCount > 0 && (
                <span className="notification-badge">{unreadNotificationCount}</span>
              )}
            </button>
          </div>
          
          <div className="user-profile-container" ref={dropdownRef}>
            <div className="user-profile" onClick={handleProfileClick}>
              <div className="user-avatar">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="Totok Michael" />
              </div>
              <div className="user-info">
                <div className="user-name">Totok Michael</div>
                <div className="user-email">tmichael20@gmail.com</div>
              </div>
              <img 
                src="/Light-Icon/Iconly/Light-Outline/Arrow - Down.svg" 
                alt="Dropdown" 
                className={`profile-dropdown-arrow ${showProfileDropdown ? 'open' : ''}`} 
              />
            </div>
            
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <button className="dropdown-item" onClick={handleEditProfile}>
                  <img src="/Light-Icon/Iconly/Light-Outline/Edit.svg" alt="Edit" className="dropdown-icon" />
                  <span>Edit Profile</span>
                </button>
                <button className="dropdown-item" onClick={handleChangePassword}>
                  <img src="/Light-Icon/Iconly/Light-Outline/Lock.svg" alt="Password" className="dropdown-icon" />
                  <span>Change Password</span>
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout-item" onClick={handleLogout}>
                  <img src="/Light-Icon/Iconly/Light-Outline/Logout.svg" alt="Logout" className="dropdown-icon" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {showEditProfile && (
        <EditProfileModal 
          onClose={() => setShowEditProfile(false)}
          currentName="Totok Michael"
          currentEmail="tmichael20@gmail.com"
        />
      )}

      {showChangePassword && (
        <ChangePasswordModal 
          onClose={() => setShowChangePassword(false)}
        />
      )}

      {showNotifications && (
        <NotificationModal 
          onClose={() => setShowNotifications(false)}
          onUnreadCountChange={handleUnreadCountChange}
        />
      )}
    </>
  );
};

export default Header;