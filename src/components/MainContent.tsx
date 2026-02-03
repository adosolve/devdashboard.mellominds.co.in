import React from 'react';
import AnalyticsCards from './AnalyticsCards';
import RecentUsersTable from './RecentUsersTable';
import RevenueAnalytics from './RevenueAnalytics';
import './MainContent.css';

const MainContent: React.FC = () => {
  return (
    <main className="main-content">
      <AnalyticsCards />
      <RecentUsersTable />
      <RevenueAnalytics />
    </main>
  );
};

export default MainContent;