
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../Assets/imagesV/logo.svg';
import { fontWeight } from '@mui/system';

const Header = () => {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavVisible(!isMobileNavVisible);
  };

  
  return (
    <>
      <header className="header">
        <button  className="menu-button" style={{fontWeight:"bold", fontSize: '39px'}} onClick={toggleMobileNav}>&#9776;</button>
        <div className="logo">
          <div className="logo-circle">
          <Link to="/">
              <img src={logo} alt="Logo" className="logo-text" />
            </Link>          </div>
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
      <nav className={`mobile-nav ${isMobileNavVisible ? 'active' : ''}`}>
        <ul className="nav-list-mobile">
          <li className="header-nav-item">About Us</li>
          <li className="header-nav-item">Tier Models</li>
          <li className="header-nav-item">Team Members</li>
          <li className="header-nav-item">Proposal</li>
          <li className="header-nav-item">Contact Us</li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
