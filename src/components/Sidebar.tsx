import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage = 'Dashboard', onPageChange }) => {
  const handleMenuClick = (page: string) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/Frame 2 1 (1).svg" alt="MelloMinds" className="logo" />
      </div>
      
      <div className="sidebar-content">
        <div className="menu-section">
          <div className="menu-label">MENU</div>
          <nav className="menu-nav">
            <div 
              className={`menu-item ${currentPage === 'Dashboard' ? 'active' : ''}`}
              onClick={() => handleMenuClick('Dashboard')}
            >
              <img src="/Light-Icon/Iconly/Light-Outline/Category.svg" alt="Dashboard" className="menu-icon" />
              <span>Dashboard</span>
            </div>
            <div 
              className={`menu-item ${currentPage === 'All Users' ? 'active' : ''}`}
              onClick={() => handleMenuClick('All Users')}
            >
              <img src="/Light-Icon/Iconly/Light-Outline/Profile.svg" alt="All Users" className="menu-icon" />
              <span>All Users</span>
            </div>
            <div 
              className={`menu-item ${currentPage === 'Demographic Analytics' ? 'active' : ''}`}
              onClick={() => handleMenuClick('Demographic Analytics')}
            >
              <img src="/Light-Icon/Iconly/Light-Outline/Chart.svg" alt="Demographic Analytics" className="menu-icon" />
              <span>Demographic Analytics</span>
            </div>
            <div 
              className={`menu-item ${currentPage === 'Payments' ? 'active' : ''}`}
              onClick={() => handleMenuClick('Payments')}
            >
              <img src="/Light-Icon/Iconly/Light-Outline/Wallet.svg" alt="Payments" className="menu-icon" />
              <span>Payments</span>
            </div>
          </nav>
        </div>
      </div>


    </div>
  );
};

export default Sidebar;