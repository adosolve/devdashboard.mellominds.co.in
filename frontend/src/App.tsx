import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

// Lazy load pages for better performance
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const AllUsersPage = lazy(() => import('./pages/AllUsersPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));
const NotFound = lazy(() => import('./components/NotFound'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen={true} message="Loading page..." />}>
      <Routes>
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Users Routes */}
        <Route path="/users" element={<AllUsersPage />} />
        <Route path="/users/:userId/:slug" element={<UserProfilePage />} />
        
        {/* Analytics Routes */}
        <Route path="/analytics" element={<AnalyticsPage />} />
        
        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;