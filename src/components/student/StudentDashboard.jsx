import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CardActionArea,
  Chip,
} from '@mui/material';
import { styled } from '@mui/system';
import CodeIcon from '@mui/icons-material/Code';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import DomainIcon from '@mui/icons-material/Domain';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
  },
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
}));

const IconWrapper = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: 64,
  height: 64,
  margin: '0 auto 16px',
}));

const GradientBackground = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  color: theme.palette.common.white,
  marginBottom: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

const StudentDashboard = () => {
  const dashboardItems = [
    {
      title: 'View Programming Courses',
      description: 'Browse available programming courses and enroll.',
      icon: <CodeIcon fontSize="large" />,
      link: '/student/view-courses',
      color: '#4caf50',
    },
    {
      title: 'Attend Aptitude Tests',
      description: 'Participate in ongoing aptitude tests.',
      link: '/student/attend-test/1/1', // Replace 1/1 with actual IDs
      icon: <AssignmentIcon fontSize="large" />,
      color: '#2196f3',
    },
    {
      title: 'Test Results',
      description: 'Check your scores and performance.',
      icon: <AssessmentIcon fontSize="large" />,
      link: '/student/view-test-results',
      color: '#ff9800',
    },
    {
      title: 'Profile',
      description: 'View and edit your information.',
      icon: <PersonIcon fontSize="large" />,
      link: '/student/profile',
      color: '#e91e63',
    },
  ];

  const upcomingEvents = [
    { title: 'Python Programming Workshop', date: 'July 20, 2024' },
    { title: 'Data Structures Webinar', date: 'July 25, 2024' },
    { title: 'Aptitude Test Prep Session', date: 'August 1, 2024' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <GradientBackground>
        <Typography variant="h3" component="h1" gutterBottom align="center" fontWeight="bold">
          Student Dashboard
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Welcome back, John Doe!
        </Typography>
      </GradientBackground>

      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {dashboardItems.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <StyledCard>
                  <CardActionArea component="a" href={item.link} sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <IconWrapper sx={{ bgcolor: item.color }}>{item.icon}</IconWrapper>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar sx={{ bgcolor: 'secondary.main', mr: 2, width: 56, height: 56 }}>
                <SchoolIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h6">John Doe</Typography>
                <Typography variant="body2" color="textSecondary">Computer Science</Typography>
              </Box>
            </Box>
            <List>
              <ListItem>
                <ListItemIcon>
                  <BusinessIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="XYZ College of Engineering" secondary="College" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DomainIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Computer Science" secondary="Department" />
              </ListItem>
            </List>
          </StyledPaper>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Upcoming Events
            </Typography>
            <List>
              {upcomingEvents.map((event, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <EventIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={event.title}
                    secondary={event.date}
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                </ListItem>
              ))}
            </List>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Recent Notifications
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primary="New programming course materials available"
                  secondary="2 hours ago"
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
                <Chip label="New" color="primary" size="small" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primary="Complete aptitude test evaluation"
                  secondary="1 day ago"
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
              </ListItem>
            </List>
          </StyledPaper>
        </Grid>
      </Grid>

      <Box mb={4} /> {/* Add gap at the bottom */}
    </Container>
  );
};

export default StudentDashboard;
