import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import './App.css';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route 
        path="/dashboard" 
        element={<Dashboard />} 
      />
      <Route 
        path="/" 
        element={<Navigate to="/dashboard" replace />} 
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