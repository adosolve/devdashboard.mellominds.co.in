import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UserProfile from '../components/UserProfile';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from '../components/NotFound';
import { getApiUrl } from '../config/api.config';
import '../components/Dashboard.css';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  planName: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate?: string;
  joiningDate?: string;
}

const UserProfilePage: React.FC = () => {
  const { userId, slug } = useParams<{ userId: string; slug: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(getApiUrl(`/users/${userId}`));
        
        if (!response.ok) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const userData = await response.json();
        
        // Verify slug matches user name
        const expectedSlug = userData.name.toLowerCase().replace(/\s+/g, '-');
        if (slug !== expectedSlug) {
          // Redirect to correct slug
          navigate(`/users/${userId}/${expectedSlug}`, { replace: true });
          return;
        }

        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setNotFound(true);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, slug, navigate]);

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

  const handleBack = () => {
    navigate(-1);
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUser(updatedUser);
    
    // Update URL if name changed
    const newSlug = updatedUser.name.toLowerCase().replace(/\s+/g, '-');
    if (newSlug !== slug) {
      navigate(`/users/${updatedUser.id}/${newSlug}`, { replace: true });
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar currentPage="All Users" onPageChange={handlePageChange} />
        <div className="dashboard-main">
          <Header currentPage="User Profile" />
          <LoadingSpinner fullScreen={false} message="Loading user profile..." />
        </div>
      </div>
    );
  }

  if (notFound || !user) {
    return <NotFound />;
  }

  return (
    <div className="dashboard">
      <Sidebar currentPage="All Users" onPageChange={handlePageChange} />
      <div className="dashboard-main">
        <Header currentPage="User Profile" />
        <UserProfile 
          user={user} 
          onBack={handleBack}
          onUserUpdated={handleUserUpdated}
        />
      </div>
    </div>
  );
};

export default UserProfilePage;
