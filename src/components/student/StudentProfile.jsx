import React from 'react';
import { Container, Typography, Box, Paper, Avatar, Grid, Divider } from '@mui/material';
import { styled } from '@mui/system';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import DomainIcon from '@mui/icons-material/Domain';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: '0 auto 24px',
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
}));

const InfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const InfoIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const InfoText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
}));

const StudentProfile = () => {
  // Mock data (replace with actual data in a real application)
  const studentData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    college: "University of Technology",
    department: "Computer Science"
  };

  return (
    <Container maxWidth="md" sx={{ my: 6 }}>
      <StyledPaper>
        <AvatarStyled>
          <SchoolIcon sx={{ fontSize: 60 }} />
        </AvatarStyled>
        <Typography variant="h3" component="h1" align="center" gutterBottom fontWeight="bold">
          Student Profile
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom sx={{ mb: 4 }}>
          Your personal information
        </Typography>
        <Divider sx={{ my: 4 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InfoBox>
              <InfoIcon>
                <PersonIcon />
              </InfoIcon>
              <Box>
                <Typography variant="body2" color="textSecondary">Name</Typography>
                <InfoText>{studentData.name}</InfoText>
              </Box>
            </InfoBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoBox>
              <InfoIcon>
                <EmailIcon />
              </InfoIcon>
              <Box>
                <Typography variant="body2" color="textSecondary">Email</Typography>
                <InfoText>{studentData.email}</InfoText>
              </Box>
            </InfoBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoBox>
              <InfoIcon>
                <PhoneIcon />
              </InfoIcon>
              <Box>
                <Typography variant="body2" color="textSecondary">Phone Number</Typography>
                <InfoText>{studentData.phone}</InfoText>
              </Box>
            </InfoBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoBox>
              <InfoIcon>
                <BusinessIcon />
              </InfoIcon>
              <Box>
                <Typography variant="body2" color="textSecondary">College Name</Typography>
                <InfoText>{studentData.college}</InfoText>
              </Box>
            </InfoBox>
          </Grid>
          <Grid item xs={12}>
            <InfoBox>
              <InfoIcon>
                <DomainIcon />
              </InfoIcon>
              <Box>
                <Typography variant="body2" color="textSecondary">Department</Typography>
                <InfoText>{studentData.department}</InfoText>
              </Box>
            </InfoBox>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  );
};

export default StudentProfile;