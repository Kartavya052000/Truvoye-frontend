// components/DriverLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/DriverLayout.css'; // Add styles as needed
import Topbar from './Topbar';

const DriverLayout = () => {
  return (
    <div className="driver-layout" style={{border: "solid"}}>
      <Topbar />
     {/* <div className="driver-container"></div> */}
     <Outlet /> {/* This will render the matched child route */}

    </div>
  );
};

export default DriverLayout;
