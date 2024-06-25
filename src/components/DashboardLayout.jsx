// components/DashboardLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import '../styles/DashboardLayout.css'; // Add styles as needed

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main-content">
        <Topbar />
        <div className="dashboard-content">
          <Outlet /> {/* This will render the matched child route */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;