import React from 'react';
import './AnalyticsCards.css';

interface AnalyticCardProps {
  title: string;
  value: string;
  variant?: 'default' | 'currency';
}

const AnalyticCard: React.FC<AnalyticCardProps> = ({ title, value, variant = 'default' }) => {
  return (
    <div className="analytic-card">
      <div className="analytic-title">{title}</div>
      <div className={`analytic-value ${variant}`}>{value}</div>
    </div>
  );
};

const AnalyticsCards: React.FC = () => {
  return (
    <div className="analytics-cards">
      <div className="analytics-row">
        <AnalyticCard
          title="Revenue"
          value="₹1,89,000"
          variant="currency"
        />
        <AnalyticCard
          title="Users"
          value="9,000"
        />
        <AnalyticCard
          title="Active Users"
          value="189"
        />
        <AnalyticCard
          title="Inactive Users"
          value="9"
        />
      </div>
      
      <div className="analytics-row">
        <AnalyticCard
          title="Paid Plan Users"
          value="10"
        />
        <AnalyticCard
          title="Free Tier Users"
          value="32"
        />
        <AnalyticCard
          title="No of Users Dependents"
          value="5"
        />
        <AnalyticCard
          title="No of Sessions Booked"
          value="9"
        />
      </div>
    </div>
  );
};

export default AnalyticsCards;