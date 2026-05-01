import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import '../components/Dashboard.css';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePageChange = (page: string) => {
    switch (page) {
      case 'All Users':
        navigate('/users');
        break;
      case 'Demographic Analytics':
        navigate('/analytics');
        break;
      case 'Dashboard':
      default:
        navigate('/dashboard');
        break;
    }
  };

  const handleUserSelect = (user: any) => {
    const slug = user.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/users/${user.id}/${slug}`);
  };

  return (
    <div className="dashboard">
      <Sidebar currentPage="Dashboard" onPageChange={handlePageChange} />
      <div className="dashboard-main">
        <Header currentPage="Dashboard" />
        <MainContent onUserSelect={handleUserSelect} refreshKey={refreshKey} />
      </div>
    </div>
  );
};

export default DashboardPage;
