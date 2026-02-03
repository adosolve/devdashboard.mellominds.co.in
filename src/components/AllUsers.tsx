import React, { useState, useMemo, useCallback } from 'react';
import './AllUsers.css';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  planName: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
}

// Mock user data - moved outside component to prevent re-renders
const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 234-567-8901',
    city: 'New York',
    planName: 'Premium',
    status: 'Active',
    joinDate: '2024-01-15'
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    phone: '+1 234-567-8902',
    city: 'Los Angeles',
    planName: 'Free',
    status: 'Active',
    joinDate: '2024-01-20'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '+1 234-567-8903',
    city: 'Chicago',
    planName: 'Basic',
    status: 'Inactive',
    joinDate: '2024-01-10'
  },
  {
    id: 4,
    name: 'Emma Davis',
    email: 'emma.davis@email.com',
    phone: '+1 234-567-8904',
    city: 'Houston',
    planName: 'Premium',
    status: 'Active',
    joinDate: '2024-02-01'
  },
  {
    id: 5,
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 234-567-8905',
    city: 'Phoenix',
    planName: 'Free',
    status: 'Pending',
    joinDate: '2024-02-05'
  },
  {
    id: 6,
    name: 'Lisa Chen',
    email: 'lisa.chen@email.com',
    phone: '+1 234-567-8906',
    city: 'San Francisco',
    planName: 'Premium',
    status: 'Active',
    joinDate: '2024-01-25'
  },
  {
    id: 7,
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1 234-567-8907',
    city: 'Seattle',
    planName: 'Basic',
    status: 'Active',
    joinDate: '2024-01-30'
  },
  {
    id: 8,
    name: 'Jennifer Lopez',
    email: 'jennifer.lopez@email.com',
    phone: '+1 234-567-8908',
    city: 'Miami',
    planName: 'Free',
    status: 'Inactive',
    joinDate: '2024-01-12'
  },
  {
    id: 9,
    name: 'Robert Taylor',
    email: 'robert.taylor@email.com',
    phone: '+1 234-567-8909',
    city: 'Denver',
    planName: 'Premium',
    status: 'Active',
    joinDate: '2024-02-10'
  },
  {
    id: 10,
    name: 'Amanda White',
    email: 'amanda.white@email.com',
    phone: '+1 234-567-8910',
    city: 'Boston',
    planName: 'Basic',
    status: 'Pending',
    joinDate: '2024-02-08'
  },
  {
    id: 11,
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: '+1 234-567-8911',
    city: 'Atlanta',
    planName: 'Free',
    status: 'Active',
    joinDate: '2024-01-18'
  },
  {
    id: 12,
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1 234-567-8912',
    city: 'Dallas',
    planName: 'Premium',
    status: 'Active',
    joinDate: '2024-01-22'
  },
  {
    id: 13,
    name: 'Kevin Anderson',
    email: 'kevin.anderson@email.com',
    phone: '+1 234-567-8913',
    city: 'Portland',
    planName: 'Basic',
    status: 'Inactive',
    joinDate: '2024-01-05'
  },
  {
    id: 14,
    name: 'Rachel Green',
    email: 'rachel.green@email.com',
    phone: '+1 234-567-8914',
    city: 'Las Vegas',
    planName: 'Free',
    status: 'Active',
    joinDate: '2024-02-03'
  },
  {
    id: 15,
    name: 'Thomas Moore',
    email: 'thomas.moore@email.com',
    phone: '+1 234-567-8915',
    city: 'Nashville',
    planName: 'Premium',
    status: 'Pending',
    joinDate: '2024-02-12'
  }
];

const AllUsers: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Users');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState('All Time');
  const [showCustomCalendar, setShowCustomCalendar] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [tempStartDate, setTempStartDate] = useState('');
  const [tempEndDate, setTempEndDate] = useState('');
  const usersPerPage = 10;

  const tabs = [
    { id: 'All Users', label: 'All Users', count: mockUsers.length },
    { id: 'Free Tier', label: 'Free Tier', count: mockUsers.filter(u => u.planName === 'Free').length },
    { id: 'Paid Users', label: 'Paid Users', count: mockUsers.filter(u => u.planName !== 'Free').length },
    { id: 'Active Users', label: 'Active Users', count: mockUsers.filter(u => u.status === 'Active').length },
    { id: 'Inactive Users', label: 'Inactive Users', count: mockUsers.filter(u => u.status === 'Inactive').length }
  ];

  const dateFilterOptions = [
    { value: 'All Time', label: 'All Time' },
    { value: 'Last 7 Days', label: 'Last 7 Days' },
    { value: 'Last 30 Days', label: 'Last 30 Days' },
    { value: 'Last 3 Months', label: 'Last 3 Months' },
    { value: 'Last 6 Months', label: 'Last 6 Months' },
    { value: 'This Year', label: 'This Year' },
    { value: 'Custom Date', label: 'Custom Date' }
  ];

  // Helper function to filter by date
  const filterByDate = useCallback((users: User[], filter: string) => {
    if (filter === 'All Time') return users;
    
    if (filter === 'Custom Date') {
      if (!customStartDate && !customEndDate) return users;
      
      return users.filter(user => {
        const userDate = new Date(user.joinDate);
        const startDate = customStartDate ? new Date(customStartDate) : new Date('1900-01-01');
        const endDate = customEndDate ? new Date(customEndDate) : new Date();
        
        return userDate >= startDate && userDate <= endDate;
      });
    }
    
    const now = new Date();
    const filterDate = new Date();
    
    switch (filter) {
      case 'Last 7 Days':
        filterDate.setDate(now.getDate() - 7);
        break;
      case 'Last 30 Days':
        filterDate.setDate(now.getDate() - 30);
        break;
      case 'Last 3 Months':
        filterDate.setMonth(now.getMonth() - 3);
        break;
      case 'Last 6 Months':
        filterDate.setMonth(now.getMonth() - 6);
        break;
      case 'This Year':
        filterDate.setMonth(0, 1); // January 1st of current year
        break;
      default:
        return users;
    }
    
    return users.filter(user => new Date(user.joinDate) >= filterDate);
  }, [customStartDate, customEndDate]);

  // Filter users based on active tab and search term
  const filteredUsers = useMemo(() => {
    let filtered = mockUsers;

    // Filter by date first
    filtered = filterByDate(filtered, dateFilter);

    // Filter by tab
    switch (activeTab) {
      case 'Free Tier':
        filtered = filtered.filter(user => user.planName === 'Free');
        break;
      case 'Paid Users':
        filtered = filtered.filter(user => user.planName !== 'Free');
        break;
      case 'Active Users':
        filtered = filtered.filter(user => user.status === 'Active');
        break;
      case 'Inactive Users':
        filtered = filtered.filter(user => user.status === 'Inactive');
        break;
      default:
        break;
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.planName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [activeTab, searchTerm, dateFilter, filterByDate]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to first page when tab or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, dateFilter, customStartDate, customEndDate]);

  const handleAction = (action: string, userId: number, userName: string) => {
    console.log(`${action} action for user ${userName} (ID: ${userId})`);
    // Handle different actions here
    switch (action) {
      case 'view':
        alert(`Viewing details for ${userName}`);
        break;
      case 'edit':
        alert(`Editing ${userName}`);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
          alert(`Deleted ${userName}`);
        }
        break;
      case 'suspend':
        alert(`Suspended ${userName}`);
        break;
      default:
        break;
    }
  };

  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
    if (value === 'Custom Date') {
      setShowCustomCalendar(true);
      setTempStartDate(customStartDate);
      setTempEndDate(customEndDate);
    } else {
      setShowCustomCalendar(false);
      setCustomStartDate('');
      setCustomEndDate('');
    }
  };

  const handleApplyCustomDate = () => {
    setCustomStartDate(tempStartDate);
    setCustomEndDate(tempEndDate);
    setShowCustomCalendar(false);
  };

  const handleCancelCustomDate = () => {
    setShowCustomCalendar(false);
    setTempStartDate('');
    setTempEndDate('');
    if (!customStartDate && !customEndDate) {
      setDateFilter('All Time');
    }
  };

  const getCustomDateLabel = () => {
    if (customStartDate && customEndDate) {
      return `${new Date(customStartDate).toLocaleDateString()} - ${new Date(customEndDate).toLocaleDateString()}`;
    } else if (customStartDate) {
      return `From ${new Date(customStartDate).toLocaleDateString()}`;
    } else if (customEndDate) {
      return `Until ${new Date(customEndDate).toLocaleDateString()}`;
    }
    return 'Custom Date';
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Inactive':
        return 'status-inactive';
      case 'Pending':
        return 'status-pending';
      default:
        return '';
    }
  };

  const getPlanBadgeClass = (planName: string) => {
    switch (planName) {
      case 'Premium':
        return 'plan-premium';
      case 'Basic':
        return 'plan-basic';
      case 'Free':
        return 'plan-free';
      default:
        return '';
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

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
          onClick={() => setCurrentPage(currentPage - 1)}
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
          onClick={() => setCurrentPage(i)}
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
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <img src="/Light-Icon/Iconly/Light-Outline/Arrow - Right.svg" alt="Next" />
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="all-users-page">
      <div className="search-and-tabs-section">
        <div className="search-and-filter-container">
          <div className="search-container">
            <img src="/Light-Icon/Iconly/Light-Outline/Search.svg" alt="Search" className="search-icon" />
            <input
              type="text"
              placeholder="Search users by name, email, city, or plan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="date-filter-container">
            <img src="/Light-Icon/Iconly/Light-Outline/Calendar.svg" alt="Date Filter" className="date-filter-icon" />
            <select
              value={dateFilter}
              onChange={(e) => handleDateFilterChange(e.target.value)}
              className="date-filter-select"
            >
              {dateFilterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value === 'Custom Date' && (customStartDate || customEndDate) 
                    ? getCustomDateLabel() 
                    : option.label}
                </option>
              ))}
            </select>

            {showCustomCalendar && (
              <div className="custom-date-modal">
                <div className="custom-date-content">
                  <div className="custom-date-header">
                    <h3>Select Date Range</h3>
                    <button 
                      className="close-custom-date"
                      onClick={handleCancelCustomDate}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="date-inputs">
                    <div className="date-input-group">
                      <label htmlFor="start-date">Start Date</label>
                      <input
                        id="start-date"
                        type="date"
                        value={tempStartDate}
                        onChange={(e) => setTempStartDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        className="date-input"
                      />
                    </div>
                    
                    <div className="date-input-group">
                      <label htmlFor="end-date">End Date</label>
                      <input
                        id="end-date"
                        type="date"
                        value={tempEndDate}
                        onChange={(e) => setTempEndDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        min={tempStartDate}
                        className="date-input"
                      />
                    </div>
                  </div>
                  
                  <div className="custom-date-actions">
                    <button 
                      className="cancel-btn"
                      onClick={handleCancelCustomDate}
                    >
                      Cancel
                    </button>
                    <button 
                      className="apply-btn"
                      onClick={handleApplyCustomDate}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-label">{tab.label}</span>
              <span className="tab-count">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="users-table-container">
        <div className="table-header">
          <h3>{activeTab}</h3>
          <div className="table-info">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
          </div>
        </div>

        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>User's Name</th>
                <th>Contact Info</th>
                <th>Location</th>
                <th>Plan Name</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-info">
                        <div className="user-details">
                          <div className="user-name">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div className="contact-email">{user.email}</div>
                        <div className="contact-phone">{user.phone}</div>
                      </div>
                    </td>
                    <td>
                      <div className="location">
                        <img src="/Light-Icon/Iconly/Light-Outline/Location.svg" alt="Location" className="location-icon" />
                        <span>{user.city}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`plan-badge ${getPlanBadgeClass(user.planName)}`}>
                        {user.planName}
                      </span>
                    </td>
                    <td>
                      <div className="joining-date">
                        <img src="/Light-Icon/Iconly/Light-Outline/Calendar.svg" alt="Calendar" className="calendar-icon" />
                        <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <div className="actions-dropdown">
                        <button className="actions-btn">
                          <img src="/Light-Icon/Iconly/Light-Outline/More Circle.svg" alt="Actions" />
                        </button>
                        <div className="actions-menu">
                          <button onClick={() => handleAction('view', user.id, user.name)}>
                            <img src="/Light-Icon/Iconly/Light-Outline/Show.svg" alt="View" />
                            View Details
                          </button>
                          <button onClick={() => handleAction('edit', user.id, user.name)}>
                            <img src="/Light-Icon/Iconly/Light-Outline/Edit.svg" alt="Edit" />
                            Edit User
                          </button>
                          <button onClick={() => handleAction('suspend', user.id, user.name)}>
                            <img src="/Light-Icon/Iconly/Light-Outline/Close Square.svg" alt="Suspend" />
                            Suspend
                          </button>
                          <button 
                            onClick={() => handleAction('delete', user.id, user.name)}
                            className="delete-action"
                          >
                            <img src="/Light-Icon/Iconly/Light-Outline/Delete.svg" alt="Delete" />
                            Delete User
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="no-users">
                    <div className="no-users-content">
                      <img src="/Light-Icon/Iconly/Light-Outline/3 User.svg" alt="No users" />
                      <p>No users found matching your criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="table-pagination">
            <div className="pagination-info">
              Page {currentPage} of {totalPages}
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

export default AllUsers;