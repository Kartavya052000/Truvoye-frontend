import React from 'react'
import "../styles/Sidebar.css"
import { Link } from 'react-router-dom'
import analytics from '../Assets/imagesV/Analytics.svg';
import orders from '../Assets/imagesV/Orders.svg';
import proposals from '../Assets/imagesV/Proposals.svg';
import gps from '../Assets/imagesV/GPS.svg';
import drivers from '../Assets/imagesV/Truck.svg';

const Sidebar = () => {
  return (
    <div className='sidebar'>
           <nav className="nav">
        <ul className="nav-list">
        <div className="sidebar-content">
          <img classname="sidebar-icons" src={analytics} alt="analytics-icon"/>
          <Link to="/dashboard/analytics" >Analytics</Link>
        </div>
          <div className="sidebar-content">
            <img  classname="sidebar-icons" src={orders} alt="orders-icon"/>
            <Link to="/dashboard/orders" >Orders</Link>
          </div>
          <div className="sidebar-content">
            <img  classname="sidebar-icons" src={proposals} alt="proposals-icon"/>
            <Link to="/dashboard/order-proposal" >Proposals</Link>
          </div>
          <div className="sidebar-content">
            <img classname="sidebar-icons" src={gps} alt="gps-icon"/>
            <Link to="/dashboard/tracking" >GPS</Link>
          </div>
          <div className="sidebar-content">
            <img classname="sidebar-icons" src={drivers} alt="drivers-icon"/>
            <Link to="/dashboard/drivers" >Drivers</Link>
          </div>
        </ul>
      </nav>

    </div>
  )
}

export default Sidebar
