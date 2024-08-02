// components/DashboardLayout.js
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useMatch } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import '../styles/DashboardLayout.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
 // Add styles as needed
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
// -----
const DashboardLayout = () => {
  const location = useLocation();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Check if the current route is '/dashboard/analytics'
  const isDashboardAnalytics = location.pathname === '/dashboard/analytics';
const isOrderProposal = location.pathname === '/dashboard/order-proposal';
const isOrderTracking = location.pathname === '/dashboard/tracking';
  const match = useMatch('/dashboard/order-details/:id');
  const isOrderDetails = !!match;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
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
  return (
    <div className="dashboard-layout">
      <ThemeProvider theme={theme}>
      
        <Topbar />

     {screenWidth >600 && <Sidebar navItems={navItems} />} 
      <div className="dashboard-main-content">
        <div className={`dashboard-content ${isDashboardAnalytics || isOrderDetails || isOrderProposal || isOrderTracking ? 'remove-bg' : ''}`}>
          <Outlet /> {/* This will render the matched child route */}
          
        </div>
      </div>
      </ThemeProvider>
    </div>
  );
};

export default DashboardLayout;

