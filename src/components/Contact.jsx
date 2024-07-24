import React from 'react';
import { Box, Typography, Button, TextField} from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginBottom: '2rem',
  '@media (max-width: 740px)': {
    width: '100%',
    overflowX: 'hidden',
    marginTop: '2rem',
    padding: '0 1rem 0 1rem',
    
  },
});

const LeftContainer = styled(Box)({
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  justifyContent: 'center',
  alignItems: 'flex-start',
  
  marginRight: '4rem',
  marginTop: '6rem',
  height: '100%',
  '@media (max-width: 740px)': {
    width: '100%',
    marginTop: '1rem',
  },
});

const RightContainer = styled(Box)({
  width: '40%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '6rem',
  '@media (max-width: 740px)': {
    width: '100%',
    marginTop: '1rem',
    
  },
});

const ContactButton = styled(Button)({
  marginTop: '1.5rem',
  padding: '.5rem 1rem',
  borderRadius: '8px',
  background: '#1237BF',
  color: 'white',
  fontWeight: 500,
  fontStyle: 'normal',
  lineHeight: '150%',
  alignSelf: 'flex-end',
  '@media (max-width: 740px)': {
   
    alignSelf: 'flex-start',
    
  },
});

const Contact = () => {
  return (
    <Container sx={{ marginLeft: '4rem' }}>
      
      <Box sx={{ display: 'flex', width: '100%', flexDirection: { xs: 'column', md: 'row' } }}>
        <LeftContainer>
        <Typography variant="h2" sx={{ display: 'flex', color: '#1237BF', textAlign: 'left', fontSize: '2rem', fontWeight: 'bolder', maxWidth: '100%', marginBottom: '1rem'  }}>
        Contact Us
      </Typography>
          <Typography variant="body1" sx={{ color: 'black', textAlign: 'left', fontSize: '15px', fontWeight: 'normal' }}>
          Want to know more about the product and services? Just fill out the form and we will get back to you with the answers. 
          </Typography>
          </LeftContainer>

          <RightContainer>

          
          <TextField
            fullWidth
            label="Full Name"
            InputProps={{
              style: { borderRadius: '24px' }
            }}
            sx={{ marginTop: '1rem' }}

          />
          <TextField
            fullWidth
            label="Email"
            InputProps={{
              style: { borderRadius: '24px' }
            }}
            sx={{ marginTop: '1rem' }}
          />
          <TextField
            fullWidth
            label="What can we help you with?"
            InputProps={{
              style: { borderRadius: '24px' }
            }}
            multiline
            rows={4}
            sx={{ marginTop: '1rem' }}
          />
          <ContactButton >
            Submit
          </ContactButton>
          </RightContainer>
       
      </Box>
    </Container>
  );
}

export default Contact;
