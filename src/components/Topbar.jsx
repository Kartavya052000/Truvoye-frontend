

import React, { useEffect, useState } from 'react'
import "../styles/Topbar.css"
import { Link,useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import logo  from '../Assets/imagesV/logo.svg';
import  profileIcon  from '../Assets/imagesV/Profile.svg';
import  notificationIcon  from '../Assets/imagesV/Notification.svg';
import DarkModeToggle from './DarkModeToggle';
import Sidebar from './Sidebar';
import { Cookies } from 'react-cookie';


// -----icons---
import analytics from '../Assets/imagesV/Analytics.svg'
import orders from '../Assets/imagesV/Orders.svg'
import proposals from '../Assets/imagesV/Proposals.svg'
import gps from '../Assets/imagesV/GPS.svg'
import drivers from '../Assets/imagesV/Truck.svg'
import analyticsActive from '../Assets/imagesV/Analytics-active.svg'
import ordersActive from '../Assets/imagesV/Orders-active.svg'
import proposalsActive from '../Assets/imagesV/Proposals-active.svg'
import gpsActive from '../Assets/imagesV/GPS-active.svg'
import driversActive from '../Assets/imagesV/Truck-active.svg'
import jobSheet from '../Assets/imagesV/jobSheet.svg'
import jobSheetActive from '../Assets/imagesV/jobSheetActive.svg'
// -----
const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDriver, setIsOpenDriver] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const cookies2 = new Cookies();
  const token = cookies2.get('token'); // Adjust based on your auth logic

    // const location = useLocatio();

  // const showHamburger = location.pathname.includes('driver');

  // useEffect(() => {
  //   console.log("Cookies: ", cookies);
  // }, [cookies]);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // alert(isOpen)
  };
  const toggleMenuDriver = () => {
    setIsOpenDriver(!isOpenDriver);
    // alert(isOpen)
  };
  const showHamburger = location.pathname.includes('driver');
  const dashboard = location.pathname.includes('dashboard');

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    navigate("/");
  };
  const navItems = [
    {
      path: '/dashboard/analytics',
      name: 'Analytics',
      defaultIcon: analytics,
      activeIcon: analyticsActive
    },
    {
      path: '/dashboard/orders',
      name: 'Orders',
      defaultIcon: orders,
      activeIcon: ordersActive
    },
    {
      path: '/dashboard/order-proposal',
      name: 'Proposals',
      defaultIcon: proposals,
      activeIcon: proposalsActive
    },
    {
      path: '/dashboard/tracking',
      name: 'GPS',
      defaultIcon: gps,
      activeIcon: gpsActive
    },
    {
      path: '/dashboard/drivers',
      name: 'Drivers',
      defaultIcon: drivers,
      activeIcon: driversActive
    }
  ];
  const navItemsDriver = [
   
    {
      path: '/driver/jobsheet',
      name: 'Job Sheet',
      defaultIcon: analytics,
      activeIcon: analyticsActive
    }
  ];
  return (
    <>
    <div className='topbar_container'>
    {!showHamburger &&   <img src={logo} alt="Logo" className="logo-text" />}
    {(screenWidth < 400 && dashboard)  && ( <div className="hamburger-menu">
          <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
         
        </div>
       )}
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
  {(showHamburger &&!dashboard && token ) && (
    <>
        <div className="hamburger-menu">
          <div className={`hamburger-icon ${isOpenDriver ? 'open' : ''}`} onClick={toggleMenuDriver}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          {/* <div className={`menu ${isOpenDriver ? 'open' : ''}`}>
            <Link to="/driver/pickup">Pickup</Link>
            <Link to="/driver/jobsheet">Job Sheet</Link>
          </div> */}
        </div>
        {/* {!token && 
         <div className="auth-buttons">
         <Link to="/login" className="btn login-btn">Login</Link>
         <Link to="/signup" className="btn signup-btn">Sign Up</Link>
       </div>
} */}
      
       </>
      )}
      


      
    </div>
    {isOpen ?
     <Sidebar show={true} navItems={navItems}/>
     :""
    }
    {isOpenDriver ?
     <Sidebar show={true} navItems={navItemsDriver}/>
     :""
    }
     {/* <div >
   </div> */}
   </>
  )
}

export default Topbar
