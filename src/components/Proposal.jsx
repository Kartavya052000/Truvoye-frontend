import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import illustration from '../Assets/imagesV/Proposal.svg'; 
import { styled } from '@mui/system';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  '@media (max-width: 740px)': {
    width: '100%',
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
  marginLeft: '4rem',
  marginTop: '2rem',
  '@media (max-width: 740px)': {
    width: '100%',
    marginTop: '1rem',
    marginLeft: 0,
    order: 1,
    
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
    marginTop: '1rem',
    marginLeft: '0rem',
    flexDirection: 'column-reverse',
  },
});



const ProposalButton = styled(Button)({
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

const Proposal = () => {
  return (
    <Container sx={{ marginBottom: '6rem' }}>
      
      <Box sx={{ display: 'flex', width: '100%', flexDirection: { xs: 'column', md: 'row' } }}>
        
        <LeftContainer>
        <Typography variant="h3" sx={{ color: '#1237BF', textAlign: 'left', fontSize: '2rem', fontWeight: 'bolder', marginTop: '2rem', marginBottom: '2rem'  }}>
        Proposal
      </Typography>
          <Typography variant="body1" sx={{ color: 'black', textAlign: 'left', fontSize: '15px', fontWeight: 'normal' }}>
          Our commitment is to make your business deliver smiles, one mile at a time, with every shipment."
          </Typography>
          <ProposalButton>
            Download Proposal
          </ProposalButton>
        </LeftContainer>

        <RightContainer>
          <img src={illustration} alt="Banner illustration" />
        </RightContainer>
      </Box>
    </Container>
  );
}

export default Proposal;


