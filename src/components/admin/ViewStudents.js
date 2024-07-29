import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Avatar,
  Chip,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';

const students = [
  { 
    id: 1, 
    name: 'Alice Johnson', 
    grade: '12th',
    specialization: 'Web Development',
    projects: 5,
    avatarColor: '#1976d2'
  },
  { 
    id: 2, 
    name: 'Bob Smith', 
    grade: '11th',
    specialization: 'Mobile App Development',
    projects: 3,
    avatarColor: '#388e3c'
  },
  { 
    id: 3, 
    name: 'Charlie Brown', 
    grade: '12th',
    specialization: 'Data Science',
    projects: 4,
    avatarColor: '#d32f2f'
  },
];

const StyledCard = styled(Card)(({ theme }) => ({
  transition: '0.3s',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[10],
  },
  margin: theme.spacing(2),
  borderRadius: '16px',
  overflow: 'visible',
}));

const StyledAvatar = styled(Avatar)(({ theme, color }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
  backgroundColor: color,
  margin: '-24px auto 0',
  border: `4px solid ${theme.palette.background.paper}`,
}));

const ViewStudents = () => {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
          Our Talented Students
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Discover the bright minds shaping the future of technology
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {students.map((student) => (
          <Grid item xs={12} sm={6} md={4} key={student.id}>
            <StyledCard elevation={4}>
              <CardContent>
                <StyledAvatar color={student.avatarColor}>
                  <PersonIcon fontSize="large" />
                </StyledAvatar>
                <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 2 }}>
                  {student.name}
                </Typography>
                <Chip icon={<SchoolIcon />} label={student.grade} sx={{ mb: 1 }} />
                <Typography variant="body1" color="textSecondary" paragraph>
                  {student.specialization}
                </Typography>
                <Chip icon={<CodeIcon />} label={`${student.projects} Projects`} sx={{ mb: 2 }} />
                <Button variant="contained" color="primary" fullWidth>
                  View Profile
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ViewStudents;