import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto', // Pushes the footer to the bottom
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[400]
            : theme.palette.grey[800],
        /* position: 'fixed',
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1000 */
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="#">
            Your Website Name
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Link color="text.secondary" href="#" sx={{ mx: 1 }}>
            About Us
          </Link>
          <Link color="text.secondary" href="#" sx={{ mx: 1 }}>
            Privacy Policy
          </Link>
          <Link color="text.secondary" href="#" sx={{ mx: 1 }}>
            Terms of Service
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;