import React from 'react';
import AnalyticsCards from './AnalyticsCards';
import RecentUsersTable from './RecentUsersTable';
import './MainContent.css';

interface MainContentProps {
  onUserSelect: (user: any) => void;
  refreshKey?: number;
}

const MainContent: React.FC<MainContentProps> = ({ onUserSelect, refreshKey }) => {
  return (
    <main className="main-content">
      <AnalyticsCards />
      <RecentUsersTable onUserSelect={onUserSelect} refreshKey={refreshKey} />
    </main>
  );
};

export default MainContent;