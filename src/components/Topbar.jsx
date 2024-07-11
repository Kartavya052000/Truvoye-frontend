// import React, { useState } from 'react'
// import "../styles/Topbar.css"
// import { Link,useLocation, useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
// import logo from '../Assets/imagesV/logo.svg';

// const Topbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [cookies, setCookie, removeCookie] = useCookies(["token"]);

//   // useEffect(() => {
//   //   console.log("Cookies: ", cookies);
//   // }, [cookies]);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const showHamburger = location.pathname.includes('driver');

//   const handleLogout = () => {
//     removeCookie("token", { path: "/" });
//     navigate("/");
//   };

//   return (
//     <div className='topbar_container'>
//       <img src={logo} alt="Logo" className="logo-text" />
//         {showHamburger && (
//         <div className="hamburger-menu">
//           <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
//             <div className="bar1"></div>
//             <div className="bar2"></div>
//             <div className="bar3"></div>
//           </div>
//           <div className={`menu ${isOpen ? 'open' : ''}`}>
//             <Link to="/pickup">Pickup</Link>
//             <Link to="/job-sheet">Job Sheet</Link>
//           </div>
//         </div>
//       )}
//       {/* Topbar */}

//       <button className="logout_btn" onClick={handleLogout}
//       color="primary"
//       variant="contained"
//       sx={{ mt: 2 }}
//       >Logout</button>
      
//     </div>
//   )
// }

// export default Topbar


import React, { useState } from 'react'
import "../styles/Topbar.css"
import { Link,useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import logo  from '../Assets/imagesV/logo.svg';
import  profileIcon  from '../Assets/imagesV/Profile.svg';
import  notificationIcon  from '../Assets/imagesV/Notification.svg';
import DarkModeToggle from './DarkModeToggle';

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    // const location = useLocatio();

  // const showHamburger = location.pathname.includes('driver');

  // useEffect(() => {
  //   console.log("Cookies: ", cookies);
  // }, [cookies]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const showHamburger = location.pathname.includes('driver');

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    navigate("/");
  };

  return (
    <div className='topbar_container'>
    {!showHamburger &&   <img src={logo} alt="Logo" className="logo-text" />}
        {/* {showHamburger && (
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
      Topbar */}
{!showHamburger && (
  <div className="icons">
        <img src={notificationIcon} alt="Notification" />
        {/* <DarkModeToggle /> */}
        <img src={profileIcon} alt="Profile"  />
        <button className="logout_btn" onClick={handleLogout}
      variant="contained"
      sx={{ mt: 2 , background: "#1237BF"}}
      >Logout</button>
      </div>
)} 
  {showHamburger && (
    <>
        <div className="hamburger-menu">
          <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          <div className={`menu ${isOpen ? 'open' : ''}`}>
            <Link to="/driver/pickup">Pickup</Link>
            <Link to="/driver/jobsheet">Job Sheet</Link>
          </div>
        </div>
         <div className="auth-buttons">
         <Link to="/login" className="btn login-btn">Login</Link>
         <Link to="/signup" className="btn signup-btn">Sign Up</Link>
       </div>
       </>
      )}
      


      
    </div>
  )
}

export default Topbar
