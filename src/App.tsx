import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './App.css';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? 
          <Navigate to="/dashboard" replace /> : 
          <Login />
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          isAuthenticated ? 
          <Dashboard /> : 
          <Navigate to="/login" replace />
        } 
      />
      <Route 
        path="/" 
        element={<Navigate to="/login" replace />} 
      />
    </Routes>
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