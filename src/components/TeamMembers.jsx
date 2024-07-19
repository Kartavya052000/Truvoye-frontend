import React from 'react';
import { Box, Typography, Container, Card, CardContent, CardMedia } from '@mui/material';

const teamMembersData = [
  {
    name: "Kartavya Bhayana",
    position: "Full Stack Developer",
    description: "Description",
    image: '/assets/teamHeadshots/kartavya.jpg'
  },
  {
    name: "Bhawleen Kaur",
    position: "Full Stack Developer",
    description: "She is a full stack developer who believes in learning by doing and solving real-world problems. Hands-on development practice is key to building great solutions.",
    image: '/assets/teamHeadshots/bhawleen.jpg'
  },
  {
    name: "Vatanpreet Kaur",
    position: "Full Stack Developer",
    description: "She is a full stack developer and quick learner, constantly exploring new tools and technologies. Her development practice always keeps her motivated and stays ahead of the competition.",
    image: '/assets/teamHeadshots/vatanpreet.jpg'
  },
  {
    name: "Khushal Khunt",
    position: "Full Stack Developer",
    description: "He is a full stack developer, driven by a passion for creating scalable and efficient solutions. His keen insight into emerging technologies, along with efficiency and high performance in every project undertaken.",
    image: '/assets/teamHeadshots/khushal.jpg'
  },
  {
    name: "Navneet Cherukot",
    position: "UI/UX Designer",
    description: "A passionate and enthusiastic UI/UX designer who is keen on creating human-centric designs, Michael brings a wealth of creativity and innovative approach. He is a part-time cinephile and full-time creative head.",
    image: '/assets/teamHeadshots/navneet.jpg'
  },
  {
    name: "Danielle Fraga Carvalho",
    position: "UI/UX Designer",
    description: "Dedicated UI/UX designer who is passionate about crafting seamless user experiences, Sarah brings a wealth of experience and creative mindset. UX/UI designing is her expertise, artistic soul truly valued.",
    image: '/assets/teamHeadshots/danielle.jpg'
  },
  {
    name: "Vandita Rana",
    position: "UI/UX Designer",
    description: "She is a UI/UX designer who is passionate about designing and being passionate about brand design and web design.",
    image: '/assets/teamHeadshots/vandita.jpg'
  }
];

const TeamMembers = () => {
  return (
    <Container sx={{marginBottom: '4rem'}}>
      <Typography variant="h2" sx={{ display: 'flex', color: '#1237BF', textAlign: 'left', fontSize: '39px', fontWeight: 'bolder', marginLeft: '0', maxWidth: '100%', marginBottom: '4rem' }}>
        Team Members
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', marginRight: '0rem' }}>
        {teamMembersData.map((member, index) => (
          <Card key={index} sx={{ width: '250px', borderRadius: '20px', border: '2px solid #1237BF', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardMedia
              component="img"
              height="300px"
              image={member.image}
              alt={member.name}
              sx={{ borderRadius: '20px', padding : '0.5rem', objectFit:"cover"}}
            />
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                {member.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} >
                {member.position}
              </Typography>
              <Typography variant="body2" >
                {member.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default TeamMembers;
