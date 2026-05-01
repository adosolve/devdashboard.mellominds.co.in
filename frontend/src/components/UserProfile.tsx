import React, { useState } from 'react';
import { getApiUrl } from '../config/api.config';
import './UserProfile.css';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  planName: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate?: string;
  joiningDate?: string;
}

interface UserProfileProps {
  user: User;
  onBack: () => void;
  onUserUpdated?: (user: User) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onBack, onUserUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<User>(user);
  const [isSaving, setIsSaving] = useState(false);

  const handleAction = (action: string) => {
    switch (action) {
      case 'edit':
        setIsEditing(true);
        setEditForm(user); // reset form to current user data
        break;
      case 'suspend':
        if (window.confirm(`Are you sure you want to suspend ${user.name}'s account?`)) {
          const suspendUser = async () => {
            try {
              const suspendedData = { ...user, status: 'Inactive' };
              const response = await fetch(getApiUrl(`/users/${user.id}`), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(suspendedData)
              });
              if (response.ok) {
                const updatedUser = await response.json();
                if (onUserUpdated) onUserUpdated(updatedUser);
                setEditForm(updatedUser);
                alert(`${user.name}'s account has been suspended.`);
              } else {
                alert('Failed to suspend user.');
              }
            } catch (error) {
              console.error(error);
              alert('Error suspending user.');
            }
          };
          suspendUser();
        }
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
          alert(`Deleted ${user.name}`);
        }
        break;
      default:
        break;
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(getApiUrl(`/users/${user.id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (response.ok) {
        const updatedUser = await response.json();
        if (onUserUpdated) onUserUpdated(updatedUser);
        setIsEditing(false);
      } else {
        alert('Failed to update user. Please try again.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('An error occurred while saving the changes.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm(user);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  const getPlanBadgeClass = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'premium': return 'plan-premium';
      case 'basic': return 'plan-basic';
      case 'free': return 'plan-free';
      default: return '';
    }
  };

  // Handle both joinDate (from AllUsers) and joiningDate (from RecentUsersTable)
  const displayDate = user.joiningDate 
    ? user.joiningDate 
    : (user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'N/A');

  return (
    <div className="user-profile-container">
      <button className="back-button" onClick={onBack}>
        <img src="/Light-Icon/Iconly/Light-Outline/Arrow---Left.svg" alt="Back" />
        Back to Dashboard
      </button>

      <div className="profile-header-card">
        <div className="profile-avatar">
          {editForm.name.charAt(0).toUpperCase() || '?'}
        </div>
        <div className="profile-title-section">
          {isEditing ? (
            <input 
              type="text" 
              name="name"
              className="edit-input name-input" 
              value={editForm.name} 
              onChange={handleChange} 
            />
          ) : (
            <h2>{user.name}</h2>
          )}
          
          {isEditing ? (
            <select name="status" className="edit-select" value={editForm.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          ) : (
            <span className={`status-badge ${getStatusBadgeClass(user.status)}`}>
              {user.status}
            </span>
          )}
        </div>
      </div>

      <div className="profile-content-grid">
        <div className="profile-details-card">
          <h3>User Details</h3>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <div className="detail-value">
                <img src="/Light-Icon/Iconly/Light-Outline/Message.svg" alt="Email" />
                {isEditing ? (
                  <input type="email" name="email" className="edit-input" value={editForm.email} onChange={handleChange} />
                ) : (
                  user.email
                )}
              </div>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Phone</span>
              <div className="detail-value">
                <img src="/Light-Icon/Iconly/Light-Outline/Call.svg" alt="Phone" />
                {isEditing ? (
                  <input type="text" name="phone" className="edit-input" value={editForm.phone} onChange={handleChange} />
                ) : (
                  user.phone
                )}
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Location</span>
              <div className="detail-value">
                <img src="/Light-Icon/Iconly/Light-Outline/Location.svg" alt="Location" />
                {isEditing ? (
                  <input type="text" name="city" className="edit-input" value={editForm.city} onChange={handleChange} />
                ) : (
                  user.city
                )}
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Subscription Plan</span>
              <div className="detail-value">
                {isEditing ? (
                  <select name="planName" className="edit-select" value={editForm.planName} onChange={handleChange}>
                    <option value="Free">Free Tier</option>
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                  </select>
                ) : (
                  <span className={`plan-badge ${getPlanBadgeClass(user.planName)}`}>
                    {user.planName.toLowerCase() === 'free' ? 'Free Tier' : user.planName}
                  </span>
                )}
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Joining Date</span>
              <div className="detail-value">
                <img src="/Light-Icon/Iconly/Light-Outline/Calendar.svg" alt="Calendar" />
                {displayDate}
              </div>
            </div>
          </div>
        </div>

        <div className="profile-actions-card">
          <h3>Quick Actions</h3>
          <div className="actions-list">
            {isEditing ? (
              <>
                <button className="action-btn save-btn" onClick={handleSave} disabled={isSaving}>
                  <img src="/Light-Icon/Iconly/Light-Outline/Tick-Square.svg" alt="Save" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button className="action-btn cancel-btn" onClick={handleCancel} disabled={isSaving}>
                  <img src="/Light-Icon/Iconly/Light-Outline/Close-Square.svg" alt="Cancel" />
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button className="action-btn edit-btn" onClick={() => handleAction('edit')}>
                  <img src="/Light-Icon/Iconly/Light-Outline/Edit.svg" alt="Edit" />
                  Edit User Information
                </button>
                <button className="action-btn suspend-btn" onClick={() => handleAction('suspend')}>
                  <img src="/Light-Icon/Iconly/Light-Outline/Close-Square.svg" alt="Suspend" />
                  Suspend Account
                </button>
                <button className="action-btn delete-btn" onClick={() => handleAction('delete')}>
                  <img src="/Light-Icon/Iconly/Light-Outline/Delete.svg" alt="Delete" />
                  Delete User
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
