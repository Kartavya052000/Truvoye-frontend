import React, { useState } from 'react'
import "../styles/Topbar.css"
import { Link,useLocation } from 'react-router-dom';
const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const showHamburger = location.pathname.includes('driver');

  return (
    <div className='topbar_container'>
        {showHamburger && (
        <div className="hamburger-menu">
          <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          <div className={`menu ${isOpen ? 'open' : ''}`}>
            <Link to="/pickup">Pickup</Link>
            <Link to="/job-sheet">Job Sheet</Link>
          </div>
        </div>
      )}
      Topbar
    </div>
  )
}

export default Topbar
