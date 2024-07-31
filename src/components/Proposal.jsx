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
    display: 'grid'
  
  },
});

const LeftContainer = styled(Box)({
  width: '50%%',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  justifyContent: 'center',
  alignItems: 'flex-start',
  margin: '0rem',
  marginTop: '2rem',
  
  '@media (max-width: 740px)': {
    width: '100%',
    marginTop: '1rem',
    marginLeft: '2rem',
    order: 2,
    
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
    marginLeft: '1rem',
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

//This code is without converting it into a blob:-
const handleDownload = () => {
  console.log("Download button clicked");
  window.location.href = 'http://localhost:4000/api/download-proposal';//change the localhost:4000 to your backend database's URL
};




const Proposal = () => {
  return (
    <Container sx={{ marginBottom: '6rem' ,
    '@media (max-width: 740px)': {
      display: 'grid',
      maxWidth: '100vw',
     
      marginRight: '2rem',
      
      
    }}}>
      
      <Box sx={{ display: 'flex', maxWidth: '100%', flexDirection: { xs: 'column', md: 'row' } }}>
        
        
        <Typography variant="h3" sx={{ color: '#1237BF', textAlign: 'left', fontSize: '2rem', fontWeight: 'bolder', marginTop: '2rem', marginBottom: '2rem', marginLeft: { xs: '1rem', md: '2rem' } 
        }}>
        Proposal
      </Typography>
          
      
       <LeftContainer>
        <Typography variant="body1" sx={{ color: 'black', textAlign: 'left', fontSize: '15px', fontWeight: 'normal', marginLeft: 0, marginRight : '2rem'
         
        }}>
         Our commitment is to make your business deliver smiles, one mile at a time, with every shipment."
         </Typography>
         <ProposalButton
         sx={{
           textTransform: 'capitalize',
           cursor: 'pointer',
           '&:hover': {
             background: '#F9A33F',
             color: 'white',
           },
           '&:active': {
             background: '#1237BF',
             color: 'white',
           },
         }}
           onClick={ handleDownload}>
           Download Proposal
         </ProposalButton>
</LeftContainer>

        <RightContainer sx={{'@media (max-width: 740px)': {
        display: 'flex',
        order: 1,
        
        
      }}}
        >

          <img src={illustration} alt="Banner illustration" />
        </RightContainer>
      </Box>
    </Container>
  );
}

export default Proposal;


