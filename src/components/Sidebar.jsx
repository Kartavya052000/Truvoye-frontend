import React from 'react'
import "../styles/Sidebar.css"
import { Link } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
           <nav className="nav">
        <ul className="nav-list">
        <Link to="/dashboard/analytics" >Analytics</Link>
          <Link to="/dashboard/orders" >Orders</Link>
          <Link to="/dashboard/order-proposal" >Proposals</Link>
          <Link to="/dashboard/tracking" >GPS</Link>
          <Link to="/dashboard/drivers" >Drivers</Link>
        </ul>
      </nav>

    </div>
  )
}

export default Sidebar
