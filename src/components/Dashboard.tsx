import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';
import AllUsers from './AllUsers';
import Payment from './Payment';
import Analytics from './Analytics';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('Dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'All Users':
        return <AllUsers />;
      case 'Payments':
        return <Payment />;
      case 'Demographic Analytics':
        return <Analytics />;
      case 'Dashboard':
      default:
        return <MainContent />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="dashboard-main">
        <Header currentPage={currentPage} />
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;