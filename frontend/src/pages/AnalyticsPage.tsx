import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Analytics from '../components/Analytics';
import '../components/Dashboard.css';

const AnalyticsPage: React.FC = () => {
  const navigate = useNavigate();

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

  return (
    <div className="dashboard">
      <Sidebar currentPage="Demographic Analytics" onPageChange={handlePageChange} />
      <div className="dashboard-main">
        <Header currentPage="Demographic Analytics" />
        <Analytics />
      </div>
    </div>
  );
};

export default AnalyticsPage;
