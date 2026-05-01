import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">
          <img src="/Light-Icon/Iconly/Light-Outline/Danger-Triangle.svg" alt="Not Found" />
        </div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="not-found-actions">
          <button 
            className="btn-primary"
            onClick={() => navigate('/dashboard')}
          >
            <img src="/Light-Icon/Iconly/Light-Outline/Home.svg" alt="Home" />
            Go to Dashboard
          </button>
          <button 
            className="btn-secondary"
            onClick={() => navigate(-1)}
          >
            <img src="/Light-Icon/Iconly/Light-Outline/Arrow---Left.svg" alt="Back" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
