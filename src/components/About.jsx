import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import illustration from '../Assets/imagesV/About.svg';
import { styled } from '@mui/system';

const Container = styled(Box)({
  display: 'grid',
  flexDirection: 'row',
  alignSelf: 'flex-start',
  '@media (max-width: 740px)': {
    display: 'grid',
    width: '100%',
    marginTop: '2rem',
    padding: '0 1rem 0 1rem',
  },
});

const RightContainer = styled(Box)({
  width: '50%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  justifyContent: 'center',
  alignItems: 'flex-start',
  marginLeft: '4rem',
  marginTop: '4rem',
  '@media (max-width: 740px)': {
    width: '100%',
    marginTop: '1rem',
    marginLeft: 0,
  },
});

const LeftContainer = styled(Box)({
  width: '40%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '4rem',
  '@media (max-width: 740px)': {
    display: 'flex',
    width: '100%',
    marginLeft: 0,
  },
});

const AboutButton = styled(Button)({
  marginTop: '1.5rem',
  padding: '.5rem 1rem',
  borderRadius: '8px',
  background: '#1237BF',
  color: 'white',
  fontWeight: 500,
  fontStyle: 'normal',
  lineHeight: '150%',
  alignSelf: 'flex-start',
});

const About = () => {
  return (
    <Container sx={{marginBottom: '4rem'}}>
      <Typography
        variant="h2"
        sx={{
          display: 'flex',
          color: '#1237BF',
          textAlign: 'left',
          //fontSize: { xs: '25px', md: '39px' },
          fontSize:'39px' ,
          fontWeight: 'bolder',
          maxWidth: '100%',
          marginTop: { xs: '2rem', md: '0' },
        }}
      >
        About us
      </Typography>
      <Box sx={{ display: 'flex', width: '100%', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
        <LeftContainer>
          <img src={illustration} alt="Banner illustration" style={{ width: '100%', height: '100%' }} />
        </LeftContainer>
        <RightContainer>
          <Typography
            variant="body1"
            sx={{
              color: 'black',
              textAlign: 'left',
              fontSize: { xs: '15px', md: '18px' },
              fontWeight: 'normal',
              lineHeight: '1.5',
            }}
          >
            About 53% of product owners abandoned the purchasing process due to excessively long shipping times and lack of proper systems to administer their needs. Our Web App is one stop shop for all your onboarding, tracking and business proposal needs. Take that worry off your hands and step into a whole new era of simplified logistic experience.
          </Typography>
          <AboutButton>Get Started</AboutButton>
        </RightContainer>
      </Box>
    </Container>
  );
}

export default About;


