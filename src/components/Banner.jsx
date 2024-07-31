

import React from 'react';
import { Box, Typography, Button,  } from '@mui/material';
import illustration from '../Assets/imagesV/banner.png';
import { styled } from '@mui/system';


const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  paddingLeft: '2rem',
  paddingright: '2rem',
  '@media (max-width: 740px)': {
    flexDirection: 'column-reverse',
    width: '100%',
    overflowX: 'hidden',
    // marginLeft: '2rem',
    // marginRight: '2rem',
    //padding: '0 1rem 0 1rem',
    
  },
  fontFamily: '"Outfit", sans-serif',
});

const LeftContainer = styled(Box)({
  width: '50%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'flex-start',
  justifyContent: 'center',
  alignItems: 'left',
  //marginLeft: '4rem',
  marginTop: '18rem',
  '@media (max-width: 740px)': {
    width: '100%',
    marginTop: '1rem',
    
  },
});

const RightContainer = styled(Box)({
  width: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '6rem',
  '@media (max-width: 740px)': {
    width: '100%',
    //marginLeft: '2rem',
  },
});

const BannerButton = styled(Button)({
  marginTop: '1.5rem',
  padding: '.5rem 1rem',
  borderRadius: '8px',
  cursor: 'pointer',
  background: '#1237BF',
  color: 'white',
  fontWeight: 500,
  fontStyle: 'normal',
  lineHeight: '150%',
  alignSelf: 'flex-start',
});

const handleDownload = () => {
  console.log("Download button clicked");
  window.location.href = 'http://localhost:4000/api/download-proposal';//change the localhost:4000 to your backend database's URL
};


const Banner = () => {
  return (
    <Container sx={{marginBottom: '12rem'}}>
     
        <LeftContainer>
          <Typography variant="h3" sx={{ color: '#1237BF', textAlign: 'left', fontSize: '2rem', fontWeight: 'bolder', marginBottom: '1rem' }}>
            Logistics Management Platform
          </Typography>
          <Typography variant="body1" sx={{ color: 'black', textAlign: 'left', fontSize: '15px', fontWeight: 'normal' }}>
            Streamline your logistics with our cutting-edge management solutions. Reduce costs, improve efficiency, and ensure timely deliveries. Experience seamless operations & real-time tracking to make your business future-proof. Simplify logistics today!
          </Typography>
          <BannerButton onClick={handleDownload}>
            Download Proposal
          </BannerButton>
          </LeftContainer>
          <RightContainer>
          <img src={illustration} alt="Banner illustration" />
        </RightContainer>
    </Container>
      
      
        
     
  );
};

export default Banner;
