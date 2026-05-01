import React from 'react';
import './ProjectAnalytics.css';

const ProjectAnalytics: React.FC = () => {
  const chartData = [
    { day: 'M', height: 60, active: false },
    { day: 'T', height: 100, active: true },
    { day: 'W', height: 80, active: true },
    { day: 'T', height: 120, active: true },
    { day: 'F', height: 40, active: false },
    { day: 'S', height: 30, active: false },
    { day: 'S', height: 50, active: false },
  ];

  return (
    <div className="project-analytics">
      <div className="analytics-header">
        <h3>Project Analytics</h3>
      </div>
      
      <div className="chart-container">
        <div className="chart-bars">
          {chartData.map((item, index) => (
            <div key={index} className="chart-bar-wrapper">
              <div 
                className={`chart-bar ${item.active ? 'active' : 'inactive'}`}
                style={{ height: `${item.height}px` }}
              />
              <div className="chart-label">{item.day}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalytics;