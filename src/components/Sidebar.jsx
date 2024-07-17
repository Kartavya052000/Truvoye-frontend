// import React, { useEffect } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import '../styles/Sidebar.css'
// import analytics from '../Assets/imagesV/Analytics.svg'
// import orders from '../Assets/imagesV/Orders.svg'
// import proposals from '../Assets/imagesV/Proposals.svg'
// import gps from '../Assets/imagesV/GPS.svg'
// import drivers from '../Assets/imagesV/Truck.svg'
// import analyticsActive from '../Assets/imagesV/Analytics-active.svg'
// import ordersActive from '../Assets/imagesV/Orders-active.svg'
// import proposalsActive from '../Assets/imagesV/Proposals-active.svg'
// import gpsActive from '../Assets/imagesV/GPS-active.svg'
// import driversActive from '../Assets/imagesV/Truck-active.svg'

// const Sidebar = ({ show }) => {
//   const location = useLocation();

//   useEffect(() => {
//     console.log(show)
//   }, [show])

//   const getNavLinkClass = (path) => {
//     return location.pathname === path ? 'active-link' : ''
//   }

//   const getIcon = (path) => {
//     switch (path) {
//       case '/dashboard/analytics':
//         return location.pathname === path ? analyticsActive : analytics;
//       case '/dashboard/orders':
//         return location.pathname === path ? ordersActive : orders;
//       case '/dashboard/order-proposal':
//         return location.pathname === path ? proposalsActive : proposals;
//       case '/dashboard/tracking':
//         return location.pathname === path ? gpsActive : gps;
//       case '/dashboard/drivers':
//         return location.pathname === path ? driversActive : drivers;
//       default:
//         return null;
//     }
//   }

//   return (
//     <div className='sidebar' style={{ display: show ? 'flex' : '' }}>
//       <nav className='nav'>
//         <ul className='nav-list'>
//           <li className='sidebar-content'>
//             <Link to='/dashboard/analytics' className={getNavLinkClass('/dashboard/analytics')}>
//               <img className='sidebar-icons' src={getIcon('/dashboard/analytics')} alt='analytics-icon' />
//               <span>Analytics</span>
//             </Link>
//           </li>
//           <li className='sidebar-content'>
//             <Link to='/dashboard/orders' className={getNavLinkClass('/dashboard/orders')}>
//               <img className='sidebar-icons' src={getIcon('/dashboard/orders')} alt='orders-icon' />
//               <span>Orders</span>
//             </Link>
//           </li>
//           <li className='sidebar-content'>
//             <Link to='/dashboard/order-proposal' className={getNavLinkClass('/dashboard/order-proposal')}>
//               <img className='sidebar-icons' src={getIcon('/dashboard/order-proposal')} alt='proposals-icon' />
//               <span>Proposals</span>
//             </Link>
//           </li>
//           <li className='sidebar-content'>
//             <Link to='/dashboard/tracking' className={getNavLinkClass('/dashboard/tracking')}>
//               <img className='sidebar-icons' src={getIcon('/dashboard/tracking')} alt='gps-icon' />
//               <span>GPS</span>
//             </Link>
//           </li>
//           <li className='sidebar-content'>
//             <Link to='/dashboard/drivers' className={getNavLinkClass('/dashboard/drivers')}>
//               <img className='sidebar-icons' src={getIcon('/dashboard/drivers')} alt='drivers-icon' />
//               <span>Drivers</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   )
// }

// export default Sidebar
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Sidebar.css'
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

const Sidebar = ({ show, navItems }) => {
  const location = useLocation();

  useEffect(() => {
    console.log(show)
  }, [show])

  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'active-link' : ''
  }

  const getIcon = (path, activeIcon, defaultIcon) => {
    return location.pathname === path ? activeIcon : defaultIcon;
  }

  return (
    <div className='sidebar' style={{ display: show ? 'flex' : '',zIndex:"99" }}>
      <nav className='nav'>
        <ul className='nav-list'>
          {navItems &&navItems.map(item => (
            <li className='sidebar-content' key={item.path}>
              <Link to={item.path} className={getNavLinkClass(item.path)}>
                <img className='sidebar-icons' src={getIcon(item.path, item.activeIcon, item.defaultIcon)} alt={`${item.name}-icon`} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
