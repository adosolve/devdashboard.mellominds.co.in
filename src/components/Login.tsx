import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-section">
              <div className="logo">
                <img src="/Frame 2 1 (1).svg" alt="MelloMinds" className="logo-image" />
              </div>
              <h1 className="login-title">
                Login to <span className="brand-name">Mello<span className="brand-highlight">minds</span></span>
              </h1>
            </div>
            <p className="welcome-text">
              Welcome back! <span className="subtitle">Please login to continue</span>
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter email address"
                  className="form-input"
                  required
                />
                <img 
                  src="/Light-Icon/Iconly/Light-Outline/Profile.svg" 
                  alt="Email" 
                  className="input-icon"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="enter password"
                  className="form-input"
                  required
                />
                <img 
                  src="/Light-Icon/Iconly/Light-Outline/Lock.svg" 
                  alt="Password" 
                  className="input-icon"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  <img 
                    src={showPassword ? "/Light-Icon/Iconly/Light-Outline/Hide.svg" : "/Light-Icon/Iconly/Light-Outline/Show.svg"}
                    alt={showPassword ? "Hide password" : "Show password"}
                    className="toggle-icon"
                  />
                </button>
              </div>
            </div>

            <div className="forgot-password">
              <button type="button" className="forgot-link">
                Forgot Your Password?
              </button>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        <div className="mascot-container">
          <div className="mascot">
            <div className="mascot-face">
              <div className="mascot-eye left-eye"></div>
              <div className="mascot-eye right-eye"></div>
            </div>
          </div>
        </div>

        <footer className="login-footer">
          <p>All Rights Reserved. 2026 MelloMinds LLP</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;