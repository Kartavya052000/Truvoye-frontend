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

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

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
      <img src={logo} alt="Logo" className="logo-text" />
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

      <div className="icons">
        <img src={notificationIcon} alt="Notification" />
        <img src={profileIcon} alt="Profile"  />
      
      </div>

      <button className="logout_btn" onClick={handleLogout}
      color="primary"
      variant="contained"
      sx={{ mt: 2 }}
      >Logout</button>
      
    </div>
  )
}

export default Topbar
