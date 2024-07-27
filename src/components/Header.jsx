
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Header.css';
// import logo from '../Assets/imagesV/logo.svg';
// import { fontWeight } from '@mui/system';

// const Header = () => {
//   const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

//   const toggleMobileNav = () => {
//     setIsMobileNavVisible(!isMobileNavVisible);
//   };

  
//   return (
//     <>
//       <header className="header">
//         <button  className="menu-button" style={{fontWeight:"bold", fontSize: '39px'}} onClick={toggleMobileNav}>&#9776;</button>
//         <div className="logo">
//           <div className="logo-circle">
//           <Link to="/">
//               <img src={logo} alt="Logo" className="logo-text" />
//             </Link>          </div>
//         </div>
//         <nav className="header-nav">
//           <ul className="nav-list-header">
//             <li className="header-nav-item">About Us</li>
//             <li className="header-nav-item">Tier Models</li>
//             <li className="header-nav-item">Team Members</li>
//             <li className="header-nav-item">Proposal</li>
//             <li className="header-nav-item">Contact Us</li>
//           </ul>
//         </nav>
//         <div className="auth-buttons">
//           <Link to="/login" className="btn login-btn">Login</Link>
//           <Link to="/signup" className="btn signup-btn">Sign Up</Link>
//         </div>
//       </header>
//       <nav className={`mobile-nav ${isMobileNavVisible ? 'active' : ''}`}>
//         <ul className="nav-list-mobile">
//           <li className="header-nav-item">About Us</li>
//           <li className="header-nav-item">Tier Models</li>
//           <li className="header-nav-item">Team Members</li>
//           <li className="header-nav-item">Proposal</li>
//           <li className="header-nav-item">Contact Us</li>
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default Header;

import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import '../styles/Header.css';
import logo from '../Assets/imagesV/logo.svg';

const Header = () => {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavVisible(!isMobileNavVisible);
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <div className='header-wrapper'>
      <header className="header">
        <button
          className="menu-button"
          style={{ fontWeight: 'bold', fontSize: '39px' }}
          onClick={toggleMobileNav}
        >
          &#9776;
        </button>
        <div className="logo">
          <div className="logo-circle">
            <RouterLink to="/" onClick={scrollToTop}>
              <img src={logo} alt="Logo" className="logo-text" />
            </RouterLink>
          </div>
        </div>
        <nav className="header-nav">
          <ul className="nav-list-header">
            <li className="header-nav-item">
              <ScrollLink to="about-us" smooth={true} duration={500}>
                About Us
              </ScrollLink>
            </li>
            <li className="header-nav-item">
              <ScrollLink to="tier-models" smooth={true} duration={500}>
                Tier Models
              </ScrollLink>
            </li>
            <li className="header-nav-item">
              <ScrollLink to="team-members" smooth={true} duration={500}>
                Team Members
              </ScrollLink>
            </li>
            <li className="header-nav-item">
              <ScrollLink to="proposal" smooth={true} duration={500}>
                Proposal
              </ScrollLink>
            </li>
            <li className="header-nav-item">
              <ScrollLink to="contact-us" smooth={true} duration={500}>
                Contact Us
              </ScrollLink>
            </li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <RouterLink to="/login" className="btn login-btn">
            Login
          </RouterLink>
          <RouterLink to="/signup" className="btn signup-btn">
            Sign Up
          </RouterLink>
        </div>
      </header>
      <nav className={`mobile-nav ${isMobileNavVisible ? 'active' : ''}`}>
        <ul className="nav-list-mobile">
          <li className="header-nav-item">
            <ScrollLink to="about-us" smooth={true} duration={500}>
              About Us
            </ScrollLink>
          </li>
          <li className="header-nav-item">
            <ScrollLink to="tier-models" smooth={true} duration={500}>
              Tier Models
            </ScrollLink>
          </li>
          <li className="header-nav-item">
            <ScrollLink to="team-members" smooth={true} duration={500}>
              Team Members
            </ScrollLink>
          </li>
          <li className="header-nav-item">
            <ScrollLink to="proposal" smooth={true} duration={500}>
              Proposal
            </ScrollLink>
          </li>
          <li className="header-nav-item">
            <ScrollLink to="contact-us" smooth={true} duration={500}>
              Contact Us
            </ScrollLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;

