import React, { useState } from 'react';
import './ChangePasswordModal.css';

interface ChangePasswordModalProps {
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    
    // Handle password change logic here
    console.log('Changing password');
    onClose();
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordSubmit = () => {
    // Handle forgot password logic here
    console.log('Forgot password triggered');
    setShowForgotPassword(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content change-password-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Change Password</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="modal-body">
          {!showForgotPassword ? (
            <>
              <div className="form-group">
                <label htmlFor="current-password">Current Password</label>
                <div className="password-input-container">
                  <input
                    id="current-password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter your current password"
                    className={errors.currentPassword ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    <img 
                      src={showCurrentPassword ? "/Light-Icon/Iconly/Light-Outline/Hide.svg" : "/Light-Icon/Iconly/Light-Outline/Show.svg"} 
                      alt={showCurrentPassword ? "Hide" : "Show"} 
                    />
                  </button>
                </div>
                {errors.currentPassword && <div className="error-message">{errors.currentPassword}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="new-password">New Password</label>
                <div className="password-input-container">
                  <input
                    id="new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    className={errors.newPassword ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    <img 
                      src={showNewPassword ? "/Light-Icon/Iconly/Light-Outline/Hide.svg" : "/Light-Icon/Iconly/Light-Outline/Show.svg"} 
                      alt={showNewPassword ? "Hide" : "Show"} 
                    />
                  </button>
                </div>
                {errors.newPassword && <div className="error-message">{errors.newPassword}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm New Password</label>
                <div className="password-input-container">
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <img 
                      src={showConfirmPassword ? "/Light-Icon/Iconly/Light-Outline/Hide.svg" : "/Light-Icon/Iconly/Light-Outline/Show.svg"} 
                      alt={showConfirmPassword ? "Hide" : "Show"} 
                    />
                  </button>
                </div>
                {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
              </div>
              
              <div className="forgot-password-section">
                <button 
                  type="button" 
                  className="forgot-password-link"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>
            </>
          ) : (
            <div className="forgot-password-content">
              <div className="forgot-password-icon">
                <img src="/Light-Icon/Iconly/Light-Outline/Lock.svg" alt="Lock" />
              </div>
              <h3>Forgot Password?</h3>
              <p>We'll send you a reset link to your email address.</p>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="tmichael20@gmail.com"
                  defaultValue="tmichael20@gmail.com"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          {!showForgotPassword ? (
            <button className="save-button" onClick={handleSave}>
              Change Password
            </button>
          ) : (
            <button className="save-button" onClick={handleForgotPasswordSubmit}>
              Send Reset Link
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;