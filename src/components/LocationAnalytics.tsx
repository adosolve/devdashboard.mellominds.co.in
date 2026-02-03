import React, { useState } from 'react';
import './LocationAnalytics.css';

interface LocationData {
  country: string;
  city: string;
  users: number;
  percentage: number;
  flag: string;
}

interface TrendData {
  date: string;
  users: number;
}

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

// Mock location data
const locationData: LocationData[] = [
  { country: 'United States', city: 'New York', users: 2847, percentage: 28.5, flag: '🇺🇸' },
  { country: 'United Kingdom', city: 'London', users: 1923, percentage: 19.2, flag: '🇬🇧' },
  { country: 'Germany', city: 'Berlin', users: 1456, percentage: 14.6, flag: '🇩🇪' },
  { country: 'France', city: 'Paris', users: 1234, percentage: 12.3, flag: '🇫🇷' },
  { country: 'Canada', city: 'Toronto', users: 987, percentage: 9.9, flag: '🇨🇦' },
  { country: 'Australia', city: 'Sydney', users: 756, percentage: 7.6, flag: '🇦🇺' },
];

const LocationAnalytics: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('Last 7 Days');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [selectingEndDate, setSelectingEndDate] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const dateRanges = [
    'Last 7 Days',
    'Last 30 Days',
    'Last 90 Days',
    'Last Year'
  ];

  const countries = ['all', ...Array.from(new Set(locationData.map(item => item.country)))];

  const filteredData = selectedLocation === 'all' 
    ? locationData 
    : locationData.filter(item => item.country === selectedLocation);

  const totalUsers = filteredData.reduce((sum, item) => sum + item.users, 0);

  const today = new Date();

  const handleDateRangeSelect = (range: string) => {
    setSelectedDateRange(range);
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
        setSelectedDateRange(`${startStr} - ${endStr}`);
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

  // Generate trend data based on selected date range
  const generateTrendData = (): TrendData[] => {
    const days = selectedDateRange === 'Last 7 Days' ? 7 : selectedDateRange === 'Last 30 Days' ? 30 : selectedDateRange === 'Last 90 Days' ? 90 : 365;
    const data: TrendData[] = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const baseValue = totalUsers / days;
      const variation = (Math.random() - 0.5) * 0.3;
      const value = Math.floor(baseValue * (1 + variation));
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        users: value
      });
    }
    
    return data;
  };

  const trendData = generateTrendData();
  const maxTrendValue = Math.max(...trendData.map(d => d.users));

  return (
    <div className="location-analytics-card">
      <div className="location-header">
        <div className="filters">
          <div className="filter-group">
            <label>Date Range</label>
            <button 
              className="filter-select-button"
              onClick={() => setIsDateFilterOpen(!isDateFilterOpen)}
            >
              <div className="filter-content">
                <img src="/Light-Icon/Iconly/Light-Outline/Chart.svg" alt="Chart" className="chart-icon" />
                <span className="selected-range">{selectedDateRange}</span>
                <img 
                  src="/Light-Icon/Iconly/Light-Outline/Arrow - Down.svg" 
                  alt="Dropdown" 
                  className={`dropdown-arrow ${isDateFilterOpen ? 'open' : ''}`} 
                />
              </div>
            </button>
            
            {isDateFilterOpen && !showCalendar && (
              <div className="date-dropdown">
                <div className="dropdown-header">
                  <button 
                    className="custom-dates-title clickable"
                    onClick={handleCustomDateClick}
                  >
                    Custom Dates
                  </button>
                </div>
                <div className="dropdown-divider"></div>
                <div className="date-options">
                  {dateRanges.map((range) => (
                    <button
                      key={range}
                      className={`date-option ${selectedDateRange === range ? 'selected' : ''}`}
                      onClick={() => handleDateRangeSelect(range)}
                    >
                      {range}
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
          
          <div className="filter-group">
            <label>Location</label>
            <select 
              value={selectedLocation} 
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Countries</option>
              {countries.slice(1).map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="analytics-content">
        <div className="trend-chart-section">
          <div className="chart-header">
            <h3>User Growth Trend</h3>
            <div className="total-users">
              <span className="total-number">{totalUsers.toLocaleString()}</span>
              <span className="total-label">Total Users</span>
            </div>
          </div>
          
          <div className="trend-chart">
            <div className="chart-container">
              <div className="chart-grid">
                {trendData.map((point, index) => {
                  const height = (point.users / maxTrendValue) * 100;
                  return (
                    <div key={index} className="trend-point">
                      <div 
                        className="trend-bar" 
                        style={{ height: `${height}%` }}
                        title={`${point.date}: ${point.users.toLocaleString()} users`}
                      ></div>
                      <span className="trend-label">{point.date}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="distribution-section">
          <div className="chart-header">
            <h3>Geographic Distribution</h3>
            <span className="location-count">{filteredData.length} locations</span>
          </div>
          
          <div className="simple-bar-chart">
            {filteredData.map((location, index) => (
              <div key={`${location.country}-${location.city}`} className="chart-row">
                <div className="location-info">
                  <span className="rank">#{index + 1}</span>
                  <span className="flag">{location.flag}</span>
                  <div className="location-details">
                    <span className="city">{location.city}</span>
                    <span className="country">{location.country}</span>
                  </div>
                </div>
                <div className="bar-container">
                  <div 
                    className="bar-fill" 
                    style={{ width: `${location.percentage}%` }}
                  ></div>
                </div>
                <div className="location-stats">
                  <span className="user-count">{location.users.toLocaleString()}</span>
                  <span className="percentage">{location.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-cards">
          <div className="summary-card">
            <div className="card-icon">🌍</div>
            <div className="card-content">
              <div className="card-value">{countries.length - 1}</div>
              <div className="card-label">Countries</div>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="card-icon">🏙️</div>
            <div className="card-content">
              <div className="card-value">{locationData.length}</div>
              <div className="card-label">Cities</div>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="card-icon">👑</div>
            <div className="card-content">
              <div className="card-value">{filteredData[0]?.city || 'N/A'}</div>
              <div className="card-label">Top City</div>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="card-icon">📈</div>
            <div className="card-content">
              <div className="card-value">+8.2%</div>
              <div className="card-label">Growth Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationAnalytics;