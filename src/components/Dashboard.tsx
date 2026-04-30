import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';
import AllUsers from './AllUsers';
import Payment from './Payment';
import Analytics from './Analytics';
import UserProfile from './UserProfile';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setSelectedUser(null);
  };

  const renderContent = () => {
    if (selectedUser) {
      return (
        <UserProfile 
          user={selectedUser} 
          onBack={() => setSelectedUser(null)} 
          onUserUpdated={(updatedUser) => {
            setSelectedUser(updatedUser);
            setRefreshKey(prev => prev + 1);
          }}
        />
      );
    }

    switch (currentPage) {
      case 'All Users':
        return <AllUsers onUserSelect={setSelectedUser} refreshKey={refreshKey} />;
      case 'Payments':
        return <Payment />;
      case 'Demographic Analytics':
        return <Analytics />;
      case 'Dashboard':
      default:
        return <MainContent onUserSelect={setSelectedUser} refreshKey={refreshKey} />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
      <div className="dashboard-main">
        <Header currentPage={currentPage} />
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;