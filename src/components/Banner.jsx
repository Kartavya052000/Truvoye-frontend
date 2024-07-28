

import React from 'react';
import { Box, Typography, Button,  } from '@mui/material';
import illustration from '../Assets/imagesV/banner.png';
import { styled } from '@mui/system';
import axios from 'axios';


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
const handleDownload = async () => {
  // console.log("Download button clicked");

  try {
      const filename = 'Truvoye-proposal.pdf'; // Replace with your file name
      const response = await axios.get(`http://localhost:4000/api/download/${filename}`, {
          responseType: 'blob' // Important to specify the response type
      });

      if (response.status !== 200) {
          throw new Error('Network response was not ok');
      }

      console.log("Starting download...");

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Truvoye-project-proposal.pdf'); // Desired file name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
  } catch (error) {
      console.error('There was an error downloading the file:', error);
  }
}
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
          <BannerButton  onClick={ handleDownload}>
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
