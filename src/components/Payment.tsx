import React, { useState, useMemo, useCallback } from 'react';
import './Payment.css';

interface Payment {
  id: number;
  userName: string;
  email: string;
  phone: string;
  paymentDate: string;
  planName: string;
  planDuration: string;
  status: 'Success' | 'Failed' | 'Pending';
  amount: number;
}

// Mock payment data
const mockPayments: Payment[] = [
  {
    id: 1,
    userName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 234-567-8901',
    paymentDate: '2024-02-10',
    planName: 'Premium',
    planDuration: '12 months',
    status: 'Success',
    amount: 2999
  },
  {
    id: 2,
    userName: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    phone: '+1 234-567-8902',
    paymentDate: '2024-02-09',
    planName: 'Basic',
    planDuration: '6 months',
    status: 'Failed',
    amount: 1499
  },
  {
    id: 3,
    userName: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '+1 234-567-8903',
    paymentDate: '2024-02-08',
    planName: 'Premium',
    planDuration: '3 months',
    status: 'Success',
    amount: 899
  },
  {
    id: 4,
    userName: 'Emma Davis',
    email: 'emma.davis@email.com',
    phone: '+1 234-567-8904',
    paymentDate: '2024-02-07',
    planName: 'Basic',
    planDuration: '12 months',
    status: 'Failed',
    amount: 2499
  },
  {
    id: 5,
    userName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 234-567-8905',
    paymentDate: '2024-02-06',
    planName: 'Premium',
    planDuration: '1 month',
    status: 'Pending',
    amount: 299
  },
  {
    id: 6,
    userName: 'Lisa Chen',
    email: 'lisa.chen@email.com',
    phone: '+1 234-567-8906',
    paymentDate: '2024-02-05',
    planName: 'Premium',
    planDuration: '6 months',
    status: 'Success',
    amount: 1799
  },
  {
    id: 7,
    userName: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1 234-567-8907',
    paymentDate: '2024-02-04',
    planName: 'Basic',
    planDuration: '3 months',
    status: 'Failed',
    amount: 749
  },
  {
    id: 8,
    userName: 'Jennifer Lopez',
    email: 'jennifer.lopez@email.com',
    phone: '+1 234-567-8908',
    paymentDate: '2024-02-03',
    planName: 'Premium',
    planDuration: '12 months',
    status: 'Success',
    amount: 2999
  },
  {
    id: 9,
    userName: 'Robert Taylor',
    email: 'robert.taylor@email.com',
    phone: '+1 234-567-8909',
    paymentDate: '2024-02-02',
    planName: 'Basic',
    planDuration: '1 month',
    status: 'Failed',
    amount: 249
  },
  {
    id: 10,
    userName: 'Amanda White',
    email: 'amanda.white@email.com',
    phone: '+1 234-567-8910',
    paymentDate: '2024-02-01',
    planName: 'Premium',
    planDuration: '6 months',
    status: 'Success',
    amount: 1799
  },
  {
    id: 11,
    userName: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: '+1 234-567-8911',
    paymentDate: '2024-01-31',
    planName: 'Basic',
    planDuration: '12 months',
    status: 'Pending',
    amount: 2499
  },
  {
    id: 12,
    userName: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1 234-567-8912',
    paymentDate: '2024-01-30',
    planName: 'Premium',
    planDuration: '3 months',
    status: 'Failed',
    amount: 899
  }
];

const PaymentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Payment');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState('All Time');
  const [planDurationFilter, setPlanDurationFilter] = useState('All Durations');
  const [showCustomCalendar, setShowCustomCalendar] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [tempStartDate, setTempStartDate] = useState('');
  const [tempEndDate, setTempEndDate] = useState('');
  const paymentsPerPage = 10;

  const tabs = [
    { id: 'All Payment', label: 'All Payment', count: mockPayments.length },
    { id: 'Payment Failed', label: 'Payment Failed', count: mockPayments.filter(p => p.status === 'Failed').length }
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

  const planDurationOptions = [
    { value: 'All Durations', label: 'All Durations' },
    { value: '1 month', label: '1 Month' },
    { value: '3 months', label: '3 Months' },
    { value: '6 months', label: '6 Months' },
    { value: '12 months', label: '12 Months' }
  ];

  // Helper function to filter by date
  const filterByDate = useCallback((payments: Payment[], filter: string) => {
    if (filter === 'All Time') return payments;
    
    if (filter === 'Custom Date') {
      if (!customStartDate && !customEndDate) return payments;
      
      return payments.filter(payment => {
        const paymentDate = new Date(payment.paymentDate);
        const startDate = customStartDate ? new Date(customStartDate) : new Date('1900-01-01');
        const endDate = customEndDate ? new Date(customEndDate) : new Date();
        
        return paymentDate >= startDate && paymentDate <= endDate;
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
        return payments;
    }
    
    return payments.filter(payment => new Date(payment.paymentDate) >= filterDate);
  }, [customStartDate, customEndDate]);

  // Filter payments based on active tab and search term
  const filteredPayments = useMemo(() => {
    let filtered = mockPayments;

    // Filter by date first
    filtered = filterByDate(filtered, dateFilter);

    // Filter by tab
    switch (activeTab) {
      case 'Payment Failed':
        filtered = filtered.filter(payment => payment.status === 'Failed');
        break;
      default:
        break;
    }

    // Filter by plan duration
    if (planDurationFilter !== 'All Durations') {
      filtered = filtered.filter(payment => payment.planDuration === planDurationFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.planDuration.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [activeTab, searchTerm, dateFilter, planDurationFilter, filterByDate]);

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);
  const startIndex = (currentPage - 1) * paymentsPerPage;
  const endIndex = startIndex + paymentsPerPage;
  const currentPayments = filteredPayments.slice(startIndex, endIndex);

  // Reset to first page when tab or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, dateFilter, planDurationFilter]);

  const handleAction = (action: string, paymentId: number, userName: string) => {
    console.log(`${action} action for payment ${paymentId} (User: ${userName})`);
    // Handle different actions here
    switch (action) {
      case 'view':
        alert(`Viewing payment details for ${userName}`);
        break;
      case 'retry':
        alert(`Retrying payment for ${userName}`);
        break;
      case 'refund':
        if (window.confirm(`Are you sure you want to refund payment for ${userName}?`)) {
          alert(`Refunded payment for ${userName}`);
        }
        break;
      case 'download':
        alert(`Downloading receipt for ${userName}`);
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
      case 'Success':
        return 'status-success';
      case 'Failed':
        return 'status-failed';
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
      default:
        return '';
    }
  };

  const formatAmount = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
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
    <div className="payment-page">
      <div className="search-and-tabs-section">
        <div className="search-and-filter-container">
          <div className="search-container">
            <img src="/Light-Icon/Iconly/Light-Outline/Search.svg" alt="Search" className="search-icon" />
            <input
              type="text"
              placeholder="Search payments by user name, email, or plan..."
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

          <div className="plan-duration-filter-container">
            <img src="/Light-Icon/Iconly/Light-Outline/Time Circle.svg" alt="Duration Filter" className="duration-filter-icon" />
            <select
              value={planDurationFilter}
              onChange={(e) => setPlanDurationFilter(e.target.value)}
              className="duration-filter-select"
            >
              {planDurationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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

      <div className="payments-table-container">
        <div className="table-header">
          <h3>{activeTab}</h3>
          <div className="table-info">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredPayments.length)} of {filteredPayments.length} payments
          </div>
        </div>

        <div className="table-wrapper">
          <table className="payments-table">
            <thead>
              <tr>
                <th>User's Name</th>
                <th>Contact Info</th>
                <th>Payment Date</th>
                <th>Plan Name</th>
                <th>Plan Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPayments.length > 0 ? (
                currentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      <div className="user-info">
                        <div className="user-details">
                          <div className="user-name">{payment.userName}</div>
                          <div className="payment-amount">{formatAmount(payment.amount)}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div className="contact-email">{payment.email}</div>
                        <div className="contact-phone">{payment.phone}</div>
                      </div>
                    </td>
                    <td>
                      <div className="payment-date">
                        <img src="/Light-Icon/Iconly/Light-Outline/Calendar.svg" alt="Calendar" className="calendar-icon" />
                        <span>{new Date(payment.paymentDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`plan-badge ${getPlanBadgeClass(payment.planName)}`}>
                        {payment.planName}
                      </span>
                    </td>
                    <td>
                      <div className="plan-duration">
                        <img src="/Light-Icon/Iconly/Light-Outline/Time Circle.svg" alt="Duration" className="duration-icon" />
                        <span>{payment.planDuration}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td>
                      <div className="actions-dropdown">
                        <button className="actions-btn">
                          <img src="/Light-Icon/Iconly/Light-Outline/More Circle.svg" alt="Actions" />
                        </button>
                        <div className="actions-menu">
                          <button onClick={() => handleAction('view', payment.id, payment.userName)}>
                            <img src="/Light-Icon/Iconly/Light-Outline/Show.svg" alt="View" />
                            View Details
                          </button>
                          <button onClick={() => handleAction('download', payment.id, payment.userName)}>
                            <img src="/Light-Icon/Iconly/Light-Outline/Download.svg" alt="Download" />
                            Download Receipt
                          </button>
                          {payment.status === 'Failed' && (
                            <button onClick={() => handleAction('retry', payment.id, payment.userName)}>
                              <img src="/Light-Icon/Iconly/Light-Outline/Arrow - Right Circle.svg" alt="Retry" />
                              Retry Payment
                            </button>
                          )}
                          {payment.status === 'Success' && (
                            <button 
                              onClick={() => handleAction('refund', payment.id, payment.userName)}
                              className="refund-action"
                            >
                              <img src="/Light-Icon/Iconly/Light-Outline/Paper Negative.svg" alt="Refund" />
                              Refund
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="no-payments">
                    <div className="no-payments-content">
                      <img src="/Light-Icon/Iconly/Light-Outline/Wallet.svg" alt="No payments" />
                      <p>No payments found matching your criteria</p>
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

export default PaymentPage;