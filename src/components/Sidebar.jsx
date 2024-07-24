

// // export default Sidebar
// import React, { useEffect } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import '../styles/Sidebar.css'

// const Sidebar = ({ show, navItems,triggerEvent }) => {
//   const location = useLocation();

//   useEffect(() => {
//     console.log(show)
//   }, [show])

//   const getNavLinkClass = (path) => {
//     return location.pathname === path ? 'active-link' : ''
//   }

//   const getIcon = (path, activeIcon, defaultIcon) => {
//     return location.pathname === path ? activeIcon : defaultIcon;
//   }

//   return (
//     <div className='sidebar' style={{ display: show ? 'flex' : '',zIndex:"99" }}>
//       <nav className='nav'>
//         <ul className='nav-list'>
//           {navItems &&navItems.map(item => (
//             <li className='sidebar-content' key={item.path}>
//               <Link to={item.path} className={getNavLinkClass(item.path)} onClick={triggerEvent}>
//                 <img className='sidebar-icons' src={getIcon(item.path, item.activeIcon, item.defaultIcon)} alt={`${item.name}-icon`} />
//                 <span className='sidebar_text'>{item.name}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   )
// }

// export default Sidebar

import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Sidebar.css'

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
