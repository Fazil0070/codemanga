// src/App.jsx

import React from 'react';
import { Container } from '@mui/material';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RoutesConfig from './routes';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider for Firebase context

function App() {
  return (
    <AuthProvider>
      <Container
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} // Ensure full height
      >
        <Header />
        <RoutesConfig />
        <Footer />
      </Container>
    </AuthProvider>
  );
}

export default App;
