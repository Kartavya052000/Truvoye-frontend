

import React from 'react';
import { Box, Typography, Button, Container, Card, CardContent} from '@mui/material';

const cardData = [
  {
    title: "BASIC",
    description: "FREE", 
    quote1: 'Upto 5 drivers onboarding capability.',
    quote2: '5 order proposal creation ability.',
    quote3: 'Upto 5 order assigning feature of drivers.',
  },
  {
    title: "PREMIUM",
    description: "$399",
    description2: 'per month',
    quote1: "Upto 80 drivers onboarding capability.",
    quote2: "80 order proposal creation ability.",
    quote3: "Upto 80 order assigning feature of drivers.",
    quote4: "Live-Tracking for 80 Orders.",
   
  },
  {
    title: "ELITE",
    description: "$999",
    description2: 'per month',
    quote1: 'Unlimited drivers onboarding capability.',
    quote2: 'Unlimited order proposal creation ability.',
    quote3: 'Unlimited order assigning feature of drivers.',
    quote4: 'Unlimited Real Time Tracking of drivers.',
    quote5: 'Access to beta features.,',
  
  }
];

const TierModel = () => {
  return (
    <Container sx = {{  marginBottom: '12rem', m:0, p:0, marginLeft: '2rem'}}>
     <Typography variant="h2" sx={{
      display: 'flex', 
      color: '#1237BF', 
      textAlign: 'left', 
      fontSize: '2rem', 
      fontWeight: 'bolder', 
      maxWidth: '100%' , 
      marginBottom: '2rem',
      '@media (max-width: 740px)': {
        width: '100%',
        marginTop: '2rem',
        marginBottom: '2rem',
        
      },
       }}>
        Tier Models
      </Typography>
      
      <Box sx={{ display: 'flex',
       justifyContent: 'space-between', 
       alignItems: 'center', 
       marginBottom: '12rem',
       gap: '5rem',
       flexWrap: 'wrap', 
       marginLeft: '2rem',
        '@media (max-width: 600px)': {
          
          flexDirection: 'column',
          justifyContent: 'center', 
      
        }, }}>
        {cardData.map((card, index) => (
          <Card key={index} sx={{  width: '320px', height: '384px', border: '2px solid #1237BF' , borderRadius: '28px',  backgroundColor: index === 2 ? '#1237BFB2' : 'transparent' , padding: '10px' }}>
            <CardContent>
              <Typography sx={{ fontSize: '1rem',fontWeight: 'bold', color: '#F9A33F', textAlign: 'center', marginBottom: '10px', p:0, m:0 }}>
                {card.title}
              </Typography>

              <Typography sx={{ fontSize: '1.5rem',fontWeight: 'bold', color: '#F9A33F', textAlign: 'center', marginBottom: '20px', p:0, m:0  }}>
              {card.description}
              </Typography>
              <Typography  sx={{ fontSize: '1.5rem',fontWeight: 'bold', color: '#F9A33F', textAlign: 'center', marginBottom: '20px', p:0, m:0 }}>
              {card.description2 && <span style={{ color: '#F9A33F', fontSize: '1rem', fontWeight: 'bold' }}>{card.description2}</span>}
              </Typography>
              
              <Typography variant="body2" sx={{ fontSize: '1rem',fontWeight: 'normal', p:0, m:0 }} >
                
                <ul style={{ color: index === 2 ? 'white' : 'black' }}>
                  {card.quote1 && <li>{card.quote1}</li>}
                  {card.quote2 && <li>{card.quote2}</li>}
                  {card.quote3 && <li>{card.quote3}</li>}
                  {card.quote4 && <li>{card.quote4}</li>}
                  {card.quote5 && <li>{card.quote5}</li>}
                </ul>
              </Typography>
            </CardContent>
            
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default TierModel;

