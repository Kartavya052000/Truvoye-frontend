// // DarkModeToggle.js
// import React, { useState, useEffect } from 'react';
// import '../styles/DarkModeToggle.css'; // Import the CSS file

// const DarkModeToggle = () => {
//   const [theme, setTheme] = useState('light');

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//       setTheme(savedTheme);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('theme', theme);
//     document.body.className = theme;
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   return (
//     <div className="dark-mode-toggle">
//       <button onClick={toggleTheme}>
//         Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
//       </button>
//     </div>
//   );
// };

// export default DarkModeToggle;
