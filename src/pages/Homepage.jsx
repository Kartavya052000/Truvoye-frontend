import React from 'react'
import '../styles/HomePage.css';
import Banner from '../components/Banner'
import About from '../components/About'
import TeamMembers from '../components/TeamMembers'
import Proposal from '../components/Proposal'
import Contact from '../components/Contact'
import TierModel from '../components/TierModel'
import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import theme from '../theme';

const Homepage = () => {
  return (
    <div sx={{m: 0, p:0}}>
      <ThemeProvider theme={theme}>
        <Container>
      {/* <h1>Homepage</h1> */}
      <Banner />
      <About />
      <TierModel />
      <TeamMembers />
      <Proposal />
      <Contact />
      </Container>

      </ThemeProvider>
    </div>
  )
}

export default Homepage
