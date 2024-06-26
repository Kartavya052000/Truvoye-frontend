import React, { useState } from 'react'
import "../styles/Topbar.css"
import { Link,useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


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

      <button className="logout_btn" onClick={handleLogout}
      color="primary"
      variant="contained"
      sx={{ mt: 2 }}
      >Logout</button>
      
    </div>
  )
}

export default Topbar
