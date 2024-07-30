import React from 'react';
import { Box, Typography, Container, Card, CardContent, CardMedia } from '@mui/material';
import linkedin  from '../Assets/imagesV/linkedin.svg';

const teamMembersData = [
  {
    name: "Kartavya Bhayana",
    position: "Full Stack Developer + Lead Developer",
    description: "A skilled full-stack developer, He specializes in creating seamless and efficient web applications.His expertise spans across various technologies, ensuring robust and user-friendly solutions.",
    image: '/assets/teamHeadshots/kartavya.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/kartavya-bhayana/'
  },
  {
    name: "Bhawleen Kaur",
    position: "Full Stack Developer + Project Manager",
    description: "She is a full stack developer who believes in learning by doing and solving real-world problems. Hands-on development practice is key to building great solutions. She thrives in collaborative environments.",
    image: '/assets/teamHeadshots/bhawleen.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/bhawleen-kaur-deol/'
  },
  {
    name: "Vatanpreet Kaur",
    position: "Full Stack Developer",
    description: "She is a full stack developer and quick learner, constantly exploring new tools and technologies. Her development practice always keeps her motivated and stays ahead of the competition.",
    image: '/assets/teamHeadshots/vatanpreet.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/vatanpreet-kaur-sandhu/'
  },
  {
    name: "Khushal Khunt",
    position: "Full Stack Developer",
    description: "He is a full stack developer, driven by a passion for creating scalable and efficient solutions. His keen insight into emerging technologies, along with efficiency and high performance in every project undertaken.",
    image: '/assets/teamHeadshots/khushal.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/khushal-khunt'
  },
  {
    name: "Navneet Cherukot",
    position: "UI/UX Designer + Lead Designer",
    description: "A passionate and enthusiastic UI/UX designer who is keen on creating human-centric designs, Michael brings a wealth of creativity and innovative approach. He is a part-time cinephile and full-time creative head.",
    image: '/assets/teamHeadshots/navneet.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/navneetcherukot/'
  },
  {
    name: "Danielle Fraga Carvalho",
    position: "UI/UX Designer",
    description: "Dedicated UI/UX designer who is passionate about crafting seamless user experiences, Sarah brings a wealth of experience and creative mindset. UX/UI designing is her expertise, artistic soul truly valued.",
    image: '/assets/teamHeadshots/danielle.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/daniellefpcarvalho/'
  },
  {
    name: "Vandita Rana",
    position: "UI/UX Designer",
    description: "She is a UI/UX designer who is passionate about designing, focusing on brand design and web design. She excels at creating intuitive and visually appealing user interfaces.",
    image: '/assets/teamHeadshots/vandita.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/vanditarana/'
  }
];

const TeamMembers = () => {
  return (
    
    <>
      <Typography variant="h2" sx={{ display: 'flex', color: '#1237BF', textAlign: 'left', fontSize: '2rem', fontWeight: 'bolder', marginLeft: '2rem', maxWidth: '100%', marginBottom: '4rem',
      '@media (max-width: 740px)': {
        marginLeft: '2rem'}
     }}>
          Team Members
        </Typography>
      <Container sx={{marginBottom: '2rem', m:0,  maxWidth: '2000px !important',
        marginLeft: '2rem',
        marginRight: '2rem',
        '@media (max-width: 740px)': {
          display: 'grid',
          margin: '0px'}

    }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', marginRight: '0rem'}}>
          {teamMembersData.map((member, index) => (
            <Card key={index} sx={{ width: '20%',height: '24%', borderRadius: '20px', border: '2px solid #1237BF',
            '@media (max-width: 740px)': {
              display: 'grid',
              margin: '0px',
              padding: '0px',
              width: '22rem',
              height: '32rem'} }}>
              <CardMedia
                component="img"
                height="250px"
                image={member.image}
                alt={member.name}
                sx={{ borderRadius: '20px', padding : '0.5rem', objectFit:"cover", }}
              />
              <CardContent sx={{ textAlign: 'center', padding: '0' }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  {member.name}
                </Typography>
                <Typography sx={{ mb: 1.5, fontSize: '.6rem',  fontWeight: 'bold' }} >
                  {member.position}
                </Typography>
                <Typography variant="body2" sx={{ padding: '0px .6rem', textAlign: 'left', fontSize: '10px'}} >
                  {member.description}
                </Typography>
                <Typography sx={{ textAlign: 'center'}}>
                <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <img src={linkedin} alt="linkedin" style={{ width: '5%', height: '5%' }} />
                </a>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default TeamMembers;
