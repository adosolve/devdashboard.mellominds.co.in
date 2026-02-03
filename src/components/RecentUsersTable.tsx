import React from 'react';
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

const RecentUsersTable: React.FC = () => {
  const users: UserData[] = [
    {
      id: 1,
      name: "Alexandra Deff",
      planName: "Premium Plan",
      email: "alex.deff@email.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      joiningDate: "Dec 15, 2024"
    },
    {
      id: 2,
      name: "Edwin Adenike",
      planName: "Basic Plan",
      email: "edwin.a@email.com",
      phone: "+1 (555) 234-5678",
      status: "Active",
      joiningDate: "Nov 28, 2024"
    },
    {
      id: 3,
      name: "Isaac Oluwatemiloun",
      planName: "Pro Plan",
      email: "isaac.o@email.com",
      phone: "+1 (555) 345-6789",
      status: "Pending",
      joiningDate: "Dec 20, 2024"
    },
    {
      id: 4,
      name: "David Oshodi",
      planName: "Premium Plan",
      email: "david.oshodi@email.com",
      phone: "+1 (555) 456-7890",
      status: "Inactive",
      joiningDate: "Oct 10, 2024"
    },
    {
      id: 5,
      name: "Sarah Johnson",
      planName: "Free Plan",
      email: "sarah.j@email.com",
      phone: "+1 (555) 567-8901",
      status: "Active",
      joiningDate: "Jan 05, 2025"
    }
  ];

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
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <span className="user-name">{user.name}</span>
                  </div>
                </td>
                <td>
                  <span className="plan-name">{user.planName}</span>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsersTable;