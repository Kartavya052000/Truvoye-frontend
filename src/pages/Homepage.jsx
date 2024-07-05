import React from 'react'
import '../styles/HomePage.css';
import Banner from '../components/Banner'
import About from '../components/About'
import TeamMembers from '../components/TeamMembers'
import Proposal from '../components/Proposal'
import Contact from '../components/Contact'
import TierModel from '../components/TierModel'

const Homepage = () => {
  return (
    <div>
      {/* <h1>Homepage</h1> */}
      <Banner />
      <About />
      <TierModel />
      <TeamMembers />
      <Proposal />
      <Contact />
    </div>
  )
}

export default Homepage
