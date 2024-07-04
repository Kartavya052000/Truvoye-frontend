// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../Assets/imagesV/logo.svg';

const Header = () => {
  
  return (
    <header className="header">
      <div className="logo">
        <div className="logo-circle">
        <img src={logo} alt="Logo" className="logo-text" />
        </div>
      </div>
      <nav className="header-nav">
        <ul className="nav-list-header">
          <li className="header-nav-item">About Us</li>
          <li className="header-nav-item">Tier Models</li>
          <li className="header-nav-item">Team Members</li>
          <li className="header-nav-item">Proposal</li>
          <li className="header-nav-item">Contact Us</li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <Link to="/login" className="btn login-btn">Login</Link>
        <Link to="/signup" className="btn signup-btn">Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;
