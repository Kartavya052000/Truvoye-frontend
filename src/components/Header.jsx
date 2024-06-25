// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <div className="logo-circle">
          <span className="logo-text">Logo</span>
        </div>
      </div>
      <nav className="nav">
        <ul className="nav-list-header">
          <li className="nav-item">About Us</li>
          <li className="nav-item">Tier Models</li>
          <li className="nav-item">Team Members</li>
          <li className="nav-item">Proposal</li>
          <li className="nav-item">Contact Us</li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <Link to="/signup" className="btn signup-btn">Sign Up</Link>
        <Link to="/login" className="btn login-btn">Login</Link>
      </div>
    </header>
  );
};

export default Header;
