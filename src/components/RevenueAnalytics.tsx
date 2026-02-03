import React, { useState } from 'react';
import './RevenueAnalytics.css';

interface RevenueData {
  month: string;
  revenue: number;
  date: Date;
}

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const RevenueAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 6 Months');
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [selectingEndDate, setSelectingEndDate] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Generate more comprehensive revenue data
  const generateRevenueData = (): RevenueData[] => {
    const data: RevenueData[] = [];
    const currentDate = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const baseRevenue = 80000 + Math.random() * 120000;
      data.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        revenue: Math.round(baseRevenue),
        date: date
      });
    }
    return data;
  };

  const [revenueData] = useState<RevenueData[]>(generateRevenueData());

  const getFilteredData = () => {
    if (selectedPeriod === 'Custom' && dateRange.startDate && dateRange.endDate) {
      return revenueData.filter(item => 
        item.date >= dateRange.startDate! && item.date <= dateRange.endDate!
      );
    }
    
    switch (selectedPeriod) {
      case 'Last 3 Months':
        return revenueData.slice(-3);
      case 'Last 6 Months':
        return revenueData.slice(-6);
      case 'Last 12 Months':
        return revenueData;
      case 'This Year':
        const currentYear = new Date().getFullYear();
        return revenueData.filter(item => item.date.getFullYear() === currentYear);
      default:
        return revenueData.slice(-6);
    }
  };

  const filteredData = getFilteredData();
  const maxRevenue = Math.max(...filteredData.map(item => item.revenue));

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const periodOptions = [
    'Last 3 Months',
    'Last 6 Months',
    'Last 12 Months',
    'This Year'
  ];

  const today = new Date();

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
    setIsDateFilterOpen(false);
    setShowCalendar(false);
  };

  const handleCustomDateClick = () => {
    setShowCalendar(true);
    setDateRange({ startDate: null, endDate: null });
    setSelectingEndDate(false);
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      
      if (nextYear < today.getFullYear() || 
          (nextYear === today.getFullYear() && nextMonth <= today.getMonth())) {
        setCurrentMonth(nextMonth);
        setCurrentYear(nextYear);
      }
    }
  };

  const canNavigateNext = () => {
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    return nextYear < today.getFullYear() || 
           (nextYear === today.getFullYear() && nextMonth <= today.getMonth());
  };

  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const totalDays = 42;

    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }

    return days;
  };

  const handleDateClick = (date: Date) => {
    if (date > today) return;

    if (!dateRange.startDate || (dateRange.startDate && dateRange.endDate)) {
      setDateRange({ startDate: date, endDate: null });
      setSelectingEndDate(true);
    } else if (selectingEndDate) {
      if (date >= dateRange.startDate) {
        setDateRange({ ...dateRange, endDate: date });
        setSelectingEndDate(false);
        const startStr = dateRange.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const endStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        setSelectedPeriod(`${startStr} - ${endStr}`);
        setShowCalendar(false);
        setIsDateFilterOpen(false);
      } else {
        setDateRange({ startDate: date, endDate: null });
      }
    }
  };

  const isDateInRange = (date: Date) => {
    if (!dateRange.startDate) return false;
    if (!dateRange.endDate) return date.getTime() === dateRange.startDate.getTime();
    return date >= dateRange.startDate && date <= dateRange.endDate;
  };

  const isDateDisabled = (date: Date) => {
    return date > today;
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="revenue-analytics">
      <div className="analytics-header">
        <div className="header-left">
          <h2>Revenue Analytics</h2>
          <p>Monthly revenue breakdown</p>
        </div>
        <div className="header-right">
          <div className="period-filter">
            <button 
              className="period-filter-button"
              onClick={() => setIsDateFilterOpen(!isDateFilterOpen)}
            >
              <div className="filter-content">
                <img src="/Light-Icon/Iconly/Light-Outline/Chart.svg" alt="Chart" className="chart-icon" />
                <span className="selected-period">{selectedPeriod}</span>
                <img 
                  src="/Light-Icon/Iconly/Light-Outline/Arrow - Down.svg" 
                  alt="Dropdown" 
                  className={`dropdown-arrow ${isDateFilterOpen ? 'open' : ''}`} 
                />
              </div>
            </button>
            
            {isDateFilterOpen && !showCalendar && (
              <div className="period-dropdown">
                <div className="dropdown-header">
                  <button 
                    className="custom-dates-title clickable"
                    onClick={handleCustomDateClick}
                  >
                    Custom Dates
                  </button>
                </div>
                <div className="dropdown-divider"></div>
                <div className="period-options">
                  {periodOptions.map((period) => (
                    <button
                      key={period}
                      className={`period-option ${selectedPeriod === period ? 'selected' : ''}`}
                      onClick={() => handlePeriodSelect(period)}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showCalendar && (
              <div className="calendar-dropdown">
                <div className="calendar-header">
                  <button 
                    className="nav-button"
                    onClick={() => navigateMonth('prev')}
                  >
                    ‹
                  </button>
                  <h3>{monthNames[currentMonth]} {currentYear}</h3>
                  <button 
                    className="nav-button"
                    onClick={() => navigateMonth('next')}
                    disabled={!canNavigateNext()}
                  >
                    ›
                  </button>
                  <button 
                    className="close-calendar"
                    onClick={() => {
                      setShowCalendar(false);
                      setIsDateFilterOpen(false);
                    }}
                  >
                    ✕
                  </button>
                </div>
                
                <div className="calendar-grid">
                  <div className="calendar-weekdays">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="weekday">{day}</div>
                    ))}
                  </div>
                  
                  <div className="calendar-days">
                    {generateCalendarDays().map((date, index) => (
                      <button
                        key={index}
                        className={`calendar-day ${
                          !isCurrentMonth(date) ? 'other-month' : ''
                        } ${
                          isDateInRange(date) ? 'in-range' : ''
                        } ${
                          isDateDisabled(date) ? 'disabled' : ''
                        }`}
                        onClick={() => handleDateClick(date)}
                        disabled={isDateDisabled(date)}
                      >
                        {date.getDate()}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="calendar-footer">
                  <div className="range-info">
                    {dateRange.startDate && !dateRange.endDate && (
                      <span>Select end date</span>
                    )}
                    {dateRange.startDate && dateRange.endDate && (
                      <span>
                        {dateRange.startDate.toLocaleDateString()} - {dateRange.endDate.toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-area">
          <div className="chart-bars">
            {filteredData.map((item, index) => {
              const height = (item.revenue / maxRevenue) * 200;
              return (
                <div key={index} className="bar-container">
                  <div 
                    className="revenue-bar"
                    style={{ height: `${height}px` }}
                  >
                    <div className="bar-tooltip">
                      {formatCurrency(item.revenue)}
                    </div>
                  </div>
                  <div className="bar-label">{item.month}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="revenue-summary">
        <div className="summary-item">
          <span className="summary-label">Total Revenue</span>
          <span className="summary-value">{formatCurrency(filteredData.reduce((sum, item) => sum + item.revenue, 0))}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Average Monthly</span>
          <span className="summary-value">{formatCurrency(Math.round(filteredData.reduce((sum, item) => sum + item.revenue, 0) / filteredData.length))}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Highest Month</span>
          <span className="summary-value">{formatCurrency(maxRevenue)}</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;