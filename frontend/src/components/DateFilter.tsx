import React, { useState } from 'react';
import './DateFilter.css';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const DateFilter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Dec 2025');
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [selectingEndDate, setSelectingEndDate] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const dateOptions = [
    'Dec 2025',
    'Nov 2025',
    'Oct 2025',
    'Sep 2025',
    'Aug 2025',
    'Jul 2025'
  ];

  const today = new Date();

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setIsOpen(false);
    setShowCalendar(false);
  };

  const handleCustomDateClick = () => {
    setShowCalendar(true);
    setDateRange({ startDate: null, endDate: null });
    setSelectingEndDate(false);
    // Reset to current month/year when opening calendar
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
      // Prevent navigating to future months
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
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const totalDays = 42; // 6 weeks * 7 days

    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }

    return days;
  };

  const handleDateClick = (date: Date) => {
    // Prevent future date selection
    if (date > today) return;

    if (!dateRange.startDate || (dateRange.startDate && dateRange.endDate)) {
      // Start new selection
      setDateRange({ startDate: date, endDate: null });
      setSelectingEndDate(true);
    } else if (selectingEndDate) {
      // Select end date
      if (date >= dateRange.startDate) {
        setDateRange({ ...dateRange, endDate: date });
        setSelectingEndDate(false);
        // Update selected date display
        const startStr = dateRange.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const endStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        setSelectedDate(`${startStr} - ${endStr}`);
        setShowCalendar(false);
        setIsOpen(false);
      } else {
        // If end date is before start date, make it the new start date
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
    <div className="date-filter">
      <div className="date-filter-container">
        <button 
          className="date-filter-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="date-filter-content">
            <img src="/Light-Icon/Iconly/Light-Outline/Chart.svg" alt="Chart" className="chart-icon" />
            <span className="selected-date">{selectedDate}</span>
            <img 
              src="/Light-Icon/Iconly/Light-Outline/Arrow---Down.svg" 
              alt="Dropdown" 
              className={`dropdown-arrow ${isOpen ? 'open' : ''}`} 
            />
          </div>
        </button>
        
        {isOpen && !showCalendar && (
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
              {dateOptions.map((date) => (
                <button
                  key={date}
                  className={`date-option ${selectedDate === date ? 'selected' : ''}`}
                  onClick={() => handleDateSelect(date)}
                >
                  {date}
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
                  setIsOpen(false);
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
  );
};

export default DateFilter;