import React from 'react';
import './StatsCards.css';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend: 'up' | 'down';
  variant: 'primary' | 'secondary';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, trend, variant }) => {
  return (
    <div className={`stat-card ${variant}`}>
      <div className="stat-header">
        <h3 className="stat-title">{title}</h3>
        <div className="stat-icon">
          <img src="/Light-Icon/Iconly/Light-Outline/Arrow - Up.svg" alt="Trend" />
        </div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-subtitle">
        <img src="/Light-Icon/Iconly/Light-Outline/Arrow - Up.svg" alt="Increase" className="trend-icon" />
        {subtitle}
      </div>
    </div>
  );
};

const StatsCards: React.FC = () => {
  return (
    <div className="stats-cards">
      <StatCard
        title="Total Projects"
        value="24"
        subtitle="Increased from last month"
        trend="up"
        variant="primary"
      />
      <StatCard
        title="Ended Projects"
        value="10"
        subtitle="Increased from last month"
        trend="up"
        variant="secondary"
      />
      <StatCard
        title="Running Projects"
        value="12"
        subtitle="Increased from last month"
        trend="up"
        variant="secondary"
      />
      <StatCard
        title="Pending Project"
        value="2"
        subtitle="On Discuss"
        trend="up"
        variant="secondary"
      />
    </div>
  );
};

export default StatsCards;