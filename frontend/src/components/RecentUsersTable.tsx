import React from 'react';
import { getApiUrl } from '../config/api.config';
import './RecentUsersTable.css';

interface UserData {
  id: number;
  name: string;
  planName: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joiningDate: string;
}

interface RecentUsersTableProps {
  onUserSelect: (user: UserData) => void;
  refreshKey?: number;
}

const RecentUsersTable: React.FC<RecentUsersTableProps> = ({ onUserSelect, refreshKey }) => {
  const [users, setUsers] = React.useState<UserData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(getApiUrl('/users'))
      .then(res => res.json())
      .then(data => {
        // Map backend joinDate to joiningDate and format it
        const recentUsers = data.slice(-5).map((u: any) => ({
          ...u,
          joiningDate: new Date(u.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }));
        setUsers(recentUsers);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch recent users:', err);
        setIsLoading(false);
      });
  }, [refreshKey]);

  return (
    <div className="recent-users-table">
      <div className="table-header-section">
        <h2>Recent Users</h2>
        <button className="view-all-btn">View All</button>
      </div>
      
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User's Name</th>
              <th>Plan Name</th>
              <th>Contact Info</th>
              <th>Status</th>
              <th>Joining Date</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '1rem' }}>
                  Loading recent users...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div 
                    className="user-cell clickable-user"
                    onClick={() => onUserSelect(user)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="user-name">{user.name}</span>
                  </div>
                </td>
                <td>
                  <span className="plan-name">
                    {user.planName.toLowerCase() === 'free' ? 'Free Tier' : user.planName}
                  </span>
                </td>
                <td>
                  <div className="contact-info">
                    <div className="email">{user.email}</div>
                    <div className="phone">{user.phone}</div>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <span className="joining-date">{user.joiningDate}</span>
                </td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '1rem' }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsersTable;