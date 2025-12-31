import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <h2>Rentify</h2>
        </Link>

        <button className="navbar-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/properties" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Properties
          </Link>
          
          {isAuthenticated ? (
            <>
                {user?.role === 'owner' && (
                  <Link to="/add-property" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                    Add Property
                  </Link>
                )}
                {user?.role === 'admin' && (
                  <Link to="/admin" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                    Admin Panel
                  </Link>
                )}
              <Link to="/my-properties" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                My Properties
              </Link>
              <Link to="/subscription-plans" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                Subscription
              </Link>
              <Link to="/profile" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                {user?.name}
              </Link>
              <button className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;