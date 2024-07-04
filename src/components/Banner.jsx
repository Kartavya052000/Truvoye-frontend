import React from 'react'
import '../pages/Homepage'
import illustration from '../Assets/imagesV/banner.png';

const Banner = () => {
  return (
    <div className='container'>
      <div className="left-container">
      <h3>Logistics Management Platform</h3> 
      <p>Streamline your logistics with our cutting-edge management solutions. Reduce costs, improve efficiency, and ensure timely deliveries. Experience seamless operations & real-time tracking to make your business future-proof.  Simplify logistics today!</p>

      <button className="banner-btn">Download Proposal</button>

      </div>
      <div className="right-container">
      <img src={illustration} alt="Banner-illustration"/>
        
      </div>
    </div>
  )
}

export default Banner
