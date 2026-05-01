import React from 'react';
import './RecentUsers.css';

interface UserProps {
  name: string;
  planName: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'Pending';
  avatar: string;
}

const UserRow: React.FC<UserProps> = ({ name, planName, email, phone, status, avatar }) => {
  return (
    <div className="user-row">
      <div className="user-info">
        <div className="user-avatar">
          <img src={avatar} alt={name} />
        </div>
        <div className="user-details">
          <h4>{name}</h4>
          <p className="user-plan">{planName}</p>
        </div>
      </div>
      <div className="user-contact">
        <p className="user-email">{email}</p>
        <p className="user-phone">{phone}</p>
      </div>
      <div className={`status-badge ${status.toLowerCase()}`}>
        {status}
      </div>
    </div>
  );
};

const RecentUsers: React.FC = () => {
  return (
    <div className="recent-users">
      <div className="users-header">
        <h3>Recent Users</h3>
        <button className="view-all-btn">View All</button>
      </div>
      
      <div className="users-table">
        <div className="table-header">
          <div className="header-cell user-col">User</div>
          <div className="header-cell contact-col">Contact</div>
          <div className="header-cell status-col">Status</div>
        </div>
        
        <div className="users-list">
          <UserRow
            name="Alexandra Deff"
            planName="Premium Plan"
            email="alex.deff@email.com"
            phone="+1 (555) 123-4567"
            status="Active"
            avatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
          />
          <UserRow
            name="Edwin Adenike"
            planName="Basic Plan"
            email="edwin.a@email.com"
            phone="+1 (555) 234-5678"
            status="Active"
            avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
          />
          <UserRow
            name="Isaac Oluwatemiloun"
            planName="Pro Plan"
            email="isaac.o@email.com"
            phone="+1 (555) 345-6789"
            status="Pending"
            avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face"
          />
          <UserRow
            name="David Oshodi"
            planName="Premium Plan"
            email="david.oshodi@email.com"
            phone="+1 (555) 456-7890"
            status="Inactive"
            avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
          />
        </div>
      </div>
    </div>
  );
};

export default RecentUsers;