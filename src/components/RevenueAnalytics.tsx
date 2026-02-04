import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import './RevenueAnalytics.css';

interface RevenueData {
  month: string;
  revenue: number;
  growth: number;
}

const RevenueAnalytics: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Last 12 Months');
  const [showCustomCalendar, setShowCustomCalendar] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [tempStartDate, setTempStartDate] = useState('');
  const [tempEndDate, setTempEndDate] = useState('');

  // Mock data - replace with real data from API
  const revenueData: RevenueData[] = [
    { month: 'Jan', revenue: 45000, growth: 12 },
    { month: 'Feb', revenue: 52000, growth: 15.5 },
    { month: 'Mar', revenue: 48000, growth: -7.7 },
    { month: 'Apr', revenue: 61000, growth: 27.1 },
    { month: 'May', revenue: 55000, growth: -9.8 },
    { month: 'Jun', revenue: 67000, growth: 21.8 },
    { month: 'Jul', revenue: 72000, growth: 7.5 },
    { month: 'Aug', revenue: 69000, growth: -4.2 },
    { month: 'Sep', revenue: 78000, growth: 13.0 },
    { month: 'Oct', revenue: 85000, growth: 9.0 },
    { month: 'Nov', revenue: 92000, growth: 8.2 },
    { month: 'Dec', revenue: 98000, growth: 6.5 }
  ];

  const periodOptions = [
    'Last 6 Months',
    'Last 12 Months',
    'Last 24 Months',
    'This Year',
    'Last Year',
    'Custom Range'
  ];

  // Calculate metrics
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const highestRevenue = Math.max(...revenueData.map(item => item.revenue));
  const highestRevenueMonth = revenueData.find(item => item.revenue === highestRevenue)?.month;
  const averageGrowth = revenueData.reduce((sum, item) => sum + item.growth, 0) / revenueData.length;

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
    setIsFilterOpen(false);
    
    if (period === 'Custom Range') {
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
      setSelectedPeriod('Last 12 Months');
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
    return 'Custom Range';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${label} 2024`}</p>
          <p className="tooltip-value">
            Revenue: <span className="tooltip-amount">{formatCurrency(data.revenue)}</span>
          </p>
          <p className="tooltip-growth">
            Growth: <span className={`growth-value ${data.growth >= 0 ? 'positive' : 'negative'}`}>
              {data.growth >= 0 ? '+' : ''}{data.growth.toFixed(1)}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="revenue-analytics">
      <div className="revenue-header">
        <h2 className="revenue-title">Revenue Analytics</h2>
        <div className="revenue-filter">
          <button 
            className="filter-button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <img src="/Light-Icon/Iconly/Light-Outline/Chart.svg" alt="Chart" className="filter-icon" />
            <span className="filter-text">
              {selectedPeriod === 'Custom Range' && (customStartDate || customEndDate) 
                ? getCustomDateLabel() 
                : selectedPeriod}
            </span>
            <img 
              src="/Light-Icon/Iconly/Light-Outline/Arrow - Down.svg" 
              alt="Dropdown" 
              className={`filter-arrow ${isFilterOpen ? 'open' : ''}`} 
            />
          </button>
          
          {isFilterOpen && (
            <div className="filter-dropdown">
              <div className="filter-options">
                {periodOptions.map((period) => (
                  <button
                    key={period}
                    className={`filter-option ${selectedPeriod === period ? 'selected' : ''}`}
                    onClick={() => handlePeriodSelect(period)}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          )}

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
                    <label htmlFor="revenue-start-date">Start Date</label>
                    <input
                      id="revenue-start-date"
                      type="date"
                      value={tempStartDate}
                      onChange={(e) => setTempStartDate(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="date-input"
                    />
                  </div>
                  
                  <div className="date-input-group">
                    <label htmlFor="revenue-end-date">End Date</label>
                    <input
                      id="revenue-end-date"
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

      <div className="revenue-chart-container">
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={revenueData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a8edea" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a8edea" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" opacity={0.5} />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#a8edea"
                strokeWidth={3}
                fill="url(#revenueGradient)"
                dot={{ fill: '#a8edea', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#a8edea', strokeWidth: 2, fill: '#ffffff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="revenue-metrics">
        <div className="metrics-grid">
          <div className="metric-card total-revenue">
            <div className="metric-icon">
              <img src="/Light-Icon/Iconly/Light-Outline/Wallet.svg" alt="Total Revenue" />
            </div>
            <div className="metric-content">
              <h3 className="metric-title">Total Revenue</h3>
              <p className="metric-value">{formatCurrency(totalRevenue)}</p>
              <p className="metric-subtitle">Generated in 2024</p>
            </div>
          </div>

          <div className="metric-card highest-revenue">
            <div className="metric-icon">
              <img src="/Light-Icon/Iconly/Light-Outline/Star.svg" alt="Highest Revenue" />
            </div>
            <div className="metric-content">
              <h3 className="metric-title">Highest Revenue Month</h3>
              <p className="metric-value">{formatCurrency(highestRevenue)}</p>
              <p className="metric-subtitle">
                <span className="highlight-month">{highestRevenueMonth} 2024</span> - Peak performance
              </p>
            </div>
          </div>

          <div className="metric-card average-growth">
            <div className="metric-icon">
              <img src="/Light-Icon/Iconly/Light-Outline/Graph.svg" alt="Average Growth" />
            </div>
            <div className="metric-content">
              <h3 className="metric-title">Average Growth</h3>
              <p className={`metric-value ${averageGrowth >= 0 ? 'positive' : 'negative'}`}>
                {averageGrowth >= 0 ? '+' : ''}{averageGrowth.toFixed(1)}%
              </p>
              <p className="metric-subtitle">Monthly growth rate</p>
            </div>
          </div>

          <div className="metric-card monthly-average">
            <div className="metric-icon">
              <img src="/Light-Icon/Iconly/Light-Outline/Calendar.svg" alt="Monthly Average" />
            </div>
            <div className="metric-content">
              <h3 className="metric-title">Monthly Average</h3>
              <p className="metric-value">{formatCurrency(totalRevenue / revenueData.length)}</p>
              <p className="metric-subtitle">Average per month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;