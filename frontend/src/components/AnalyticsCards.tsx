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
  const [users, setUsers] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState({ totalClients: 0, totalAppointments: 0 });
  const [isLoading, setIsLoading] = React.useState(true);
  const [isStatsLoading, setIsStatsLoading] = React.useState(true);

  React.useEffect(() => {
    // Fetch users
    fetch('http://localhost:5001/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch analytics users:', err);
        setIsLoading(false);
      });

    // Fetch dashboard stats
    fetch('http://localhost:5001/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setIsStatsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch dashboard stats:', err);
        setIsStatsLoading(false);
      });
  }, []);

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const inactiveUsers = users.filter(u => u.status === 'Inactive').length;
  const freeUsers = users.filter(u => u.planName.toLowerCase() === 'free').length;
  const paidUsers = users.filter(u => u.planName.toLowerCase() !== 'free').length;

  return (
    <div className="analytics-cards">
      <div className="analytics-row">
        <AnalyticCard
          title="Users"
          value={isLoading ? "..." : totalUsers.toLocaleString()}
        />
        <AnalyticCard
          title="Active Users"
          value={isLoading ? "..." : activeUsers.toLocaleString()}
        />
        <AnalyticCard
          title="Inactive Users"
          value={isLoading ? "..." : inactiveUsers.toLocaleString()}
        />
        <AnalyticCard
          title="Paid Plan Users"
          value={isLoading ? "..." : paidUsers.toLocaleString()}
        />
      </div>
      
      <div className="analytics-row">
        <AnalyticCard
          title="Free Tier Users"
          value={isLoading ? "..." : freeUsers.toLocaleString()}
        />
        <AnalyticCard
          title="No of Users Dependents"
          value={isStatsLoading ? "..." : stats.totalClients.toLocaleString()}
        />
        <AnalyticCard
          title="No of Sessions Booked"
          value={isStatsLoading ? "..." : stats.totalAppointments.toLocaleString()}
        />
      </div>
    </div>
  );
};

export default AnalyticsCards;