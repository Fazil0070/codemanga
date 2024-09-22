import React from 'react';
import { Box, Container, Grid, Typography, Button, TextField } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: '#283593', // Changed background color
        color: 'white',
        py: 8,
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={6} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
              Code<span style={{ color: '#ffeb3b' }}>Manga</span> {/* Changed accent color */}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem' }}>
              Revolutionizing education with cutting-edge technology and personalized learning experiences.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
              Stay Connected
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <PhoneIcon sx={{ mr: 2, fontSize: '1.5rem' }} />
              <Typography variant="body1" fontSize="1.1rem">+1 (555) 123-4567</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <EmailIcon sx={{ mr: 2, fontSize: '1.5rem' }} />
              <Typography variant="body1" fontSize="1.1rem">info@learnsys.edu</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <LocationOnIcon sx={{ mr: 2, fontSize: '1.5rem' }} />
              <Typography variant="body1" fontSize="1.1rem">123 Innovation Ave, Tech City, TC 54321</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
              Newsletter
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem' }}>
              Subscribe for the latest updates and offers.
            </Typography>
            <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex' }}>
              <TextField
                variant="outlined"
                placeholder="Your email"
                size="small"
                sx={{ 
                  mr: 1,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '25px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: 'transparent',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'transparent',
                    },
                  },
                }}
                InputProps={{
                  style: { color: 'white' }
                }}
              />
              <Button 
                variant="contained" 
                color="secondary"
                sx={{ 
                  borderRadius: '25px',
                  minWidth: 'auto',
                  px: 2,
                }}
              >
                <SendIcon />
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 8,
            pt: 3,
            borderTop: '1px solid rgba(255,255,255,0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
            © {new Date().getFullYear()} CodeManga. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
            Privacy Policy | Terms of Service
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
