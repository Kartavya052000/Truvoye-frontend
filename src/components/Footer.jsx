


import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../Assets/imagesV/logo.svg';

const FooterContainer = styled(Box)({
  borderTop: '1px solid #1237BF',
  padding: '2rem 0',
  marginTop: 'auto',
  textAlign: 'center',
});

const FooterContent = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media (max-width: 740px)': {
    flexDirection: 'column',
    textAlign: 'left',
    alignItems: 'flex-start',
  },
});

const FooterSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textAlign: 'left',
  '@media (max-width: 740px)': {
    margin: '0',
  },
});

const FooterLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  marginTop: '0.5rem',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent maxWidth="lg">
        <FooterSection>
          <img src={logo} alt="Banner illustration" />
          <Typography variant="body2">
            &copy; 2024 Truvoye. All rights reserved
          </Typography>
        </FooterSection>
        <FooterSection>
          <Typography variant="h6" sx={{ color: '#1237BF', fontWeight: 'bold' }}>
            Our Product
          </Typography>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Team Members</FooterLink>
          <FooterLink href="#">Tier Models</FooterLink>
          <FooterLink href="#">Download Proposal</FooterLink>
        </FooterSection>
        <FooterSection>
          <Typography variant="h6" sx={{ color: '#1237BF', fontWeight: 'bold' }}>
            Services
          </Typography>
          <FooterLink href="#">Book a Demo</FooterLink>
          <FooterLink href="#">Contact Us</FooterLink>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
