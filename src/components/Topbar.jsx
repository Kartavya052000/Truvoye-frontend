
import React, { useEffect, useState } from "react";
import "../styles/Topbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import logo from "../Assets/imagesV/logo.svg";
import profileIcon from "../Assets/imagesV/Profile.svg";
import DarkModeToggle from "./DarkModeToggle";
import Sidebar from "./Sidebar";
import { Cookies } from "react-cookie";
import {
  Typography,
  useMediaQuery,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";

import analytics from "../Assets/imagesV/Analytics.svg";
import orders from "../Assets/imagesV/Orders.svg";
import proposals from "../Assets/imagesV/Proposals.svg";
import gps from "../Assets/imagesV/GPS.svg";
import drivers from "../Assets/imagesV/Truck.svg";
import analyticsActive from "../Assets/imagesV/Analytics-active.svg";
import ordersActive from "../Assets/imagesV/Orders-active.svg";
import proposalsActive from "../Assets/imagesV/Proposals-active.svg";
import gpsActive from "../Assets/imagesV/GPS-active.svg";
import driversActive from "../Assets/imagesV/Truck-active.svg";
import jobSheet from "../Assets/imagesV/jobSheet.svg";
import jobSheetActive from "../Assets/imagesV/jobSheetActive.svg";


const routeTitles = {
  "order-proposal": "Proposal",
  analytics: "Analytics",
  orders: "Orders",
  tracking: "Tracking",
  drivers: "Drivers",
  "add-driver": "Add Driver",
  "edit-driver": "Edit Driver",
  "order-details": "Order Details",
  "order-tracking": "Order Tracking",
};

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDriver, setIsOpenDriver] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const cookies2 = new Cookies();
  const token = cookies2.get("token"); // Adjust based on your auth logic
  const [title, setTitle] = useState("");
  const isMobile = useMediaQuery("(min-width:600px)");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenuDriver = () => {
    setIsOpenDriver(!isOpenDriver);
  };

  const showHamburger = location.pathname.includes("driver");
  const dashboard = location.pathname.includes("dashboard");
const driverpage =location.pathname.includes("dashboard/drivers")
  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    navigate("/");
  };

  const navItems = [
    {
      path: "/dashboard/analytics",
      name: "Analytics",
      defaultIcon: analytics,
      activeIcon: analyticsActive,
    },
    {
      path: "/dashboard/orders",
      name: "Orders",
      defaultIcon: orders,
      activeIcon: ordersActive,
    },
    {
      path: "/dashboard/order-proposal",
      name: "Proposals",
      defaultIcon: proposals,
      activeIcon: proposalsActive,
    },
    {
      path: "/dashboard/tracking",
      name: "GPS",
      defaultIcon: gps,
      activeIcon: gpsActive,
    },
    {
      path: "/dashboard/drivers",
      name: "Drivers",
      defaultIcon: drivers,
      activeIcon: driversActive,
    },
  ];

  const navItemsDriver = [
    {
      path: "/driver/jobsheet",
      name: "Job Sheet",
      defaultIcon: jobSheet,
      activeIcon: jobSheetActive,
    },
  ];

  useEffect(() => {
    const path = location.pathname;
    const segments = path.split("/");

    const meaningfulSegment = segments.find((segment) =>
      Object.keys(routeTitles).includes(segment)
    );

    setTitle(routeTitles[meaningfulSegment] || "Title");
  }, [location.pathname]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  

  return (
    <>
      <div className="topbar_container">
        {(!showHamburger || driverpage) && <img src={logo} alt="Logo" className="logo-text" />}
        {screenWidth < 400 && dashboard && (
          <div className="hamburger-menu">
            <div
              className={`hamburger-icon ${isOpen ? "open" : ""}`}
              onClick={toggleMenu}
            >
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>
        )}
        
        {(!showHamburger || driverpage)   && (
          <>
            {!isMobile && (
              <Typography
                component="h1"
                variant="h6"
                sx={{ width: "100%", textAlign: "center" }}
              >
                {title}
              </Typography>
            )}

            <div className="icons">
              <IconButton onClick={handleMenuClick}>
                <img src={profileIcon} alt="Profile" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </>
        )}
        {showHamburger && !dashboard && token && (
          <>
            <div className="hamburger-menu">
              <div
                className={`hamburger-icon ${isOpenDriver ? "open" : ""}`}
                onClick={toggleMenuDriver}
              >
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
              </div>
            </div>
          </>
        )}
      </div>
      {isOpen ? <Sidebar show={true} navItems={navItems} /> : ""}
      {isOpenDriver ? <Sidebar show={true} navItems={navItemsDriver} /> : ""}
    </>
  );
};

export default Topbar;
