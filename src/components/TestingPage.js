import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const TestingPage = () => {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Testing Page
        </Typography>
        <Typography variant="body1" gutterBottom>
          Select the dashboard you want to view:
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/admin/dashboard" sx={{ m: 1 }}>
          Admin Dashboard
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/student/dashboard" sx={{ m: 1 }}>
          Student Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default TestingPage;
