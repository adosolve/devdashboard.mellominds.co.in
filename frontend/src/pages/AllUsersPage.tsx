import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AllUsers from '../components/AllUsers';
import '../components/Dashboard.css';

const AllUsersPage: React.FC = () => {
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
      <Sidebar currentPage="All Users" onPageChange={handlePageChange} />
      <div className="dashboard-main">
        <Header currentPage="All Users" />
        <AllUsers onUserSelect={handleUserSelect} refreshKey={refreshKey} />
      </div>
    </div>
  );
};

export default AllUsersPage;
