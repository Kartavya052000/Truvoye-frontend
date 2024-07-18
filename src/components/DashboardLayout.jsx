// components/DashboardLayout.js
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import '../styles/DashboardLayout.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
 // Add styles as needed

const DashboardLayout = () => {
  const location = useLocation();

  // Check if the current route is '/dashboard/analytics'
  const isDashboardAnalytics = location.pathname === '/dashboard/analytics';
  return (
    <div className="dashboard-layout">
      <ThemeProvider theme={theme}>
      
        <Topbar />

      <Sidebar />
      <div className="dashboard-main-content">
        <div className={`dashboard-content ${isDashboardAnalytics ? 'remove-bg' : ''}`}>
          <Outlet /> {/* This will render the matched child route */}
          
        </div>
      </div>
      </ThemeProvider>
    </div>
  );
};

export default DashboardLayout;

