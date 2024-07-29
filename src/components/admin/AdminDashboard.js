import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Icon,
  Paper,
  Divider,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import QuizIcon from '@mui/icons-material/Quiz';
import EventIcon from '@mui/icons-material/Event';
import StorageIcon from '@mui/icons-material/Storage';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
  borderRadius: theme.spacing(1), // Reduced radius
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  },
}));

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  padding: '16px', // Reduced padding
});

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(1),
  '& .MuiSvgIcon-root': {
    fontSize: '2.5rem', // Reduced icon size
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2), // Reduced padding
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  borderRadius: theme.spacing(1), // Reduced radius
  transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },
}));

const GradientBackground = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3), // Reduced padding
  color: theme.palette.common.white,
  marginBottom: theme.spacing(4),
}));

const AdminDashboard = () => {
  const dashboardItems = [
    {
      title: 'Upload Programming Videos',
      description: 'Add new programming course videos here.',
      icon: VideoLibraryIcon,
      link: '/admin/upload-video',
    },
    {
      title: 'Create Aptitude Test',
      description: 'Design and publish aptitude tests for students.',
      icon: QuizIcon,
      link: '/admin/create-test',
    },
    {
      title: 'View Students',
      description: 'Manage student information and track progress.',
      icon: PeopleIcon,
      link: '/admin/view-students',
    },
    {
      title: 'View Student Results',
      description: "Check students' test scores and performance.",
      icon: AssessmentIcon,
      link: '/admin/view-student-results/1', // Example student ID
    },
  ];

  const stats = [
    {
      title: 'Total Students',
      value: '1,234',
      icon: PeopleIcon,
      color: '#3f51b5',
    },
    {
      title: 'Programming Videos',
      value: '42',
      icon: VideoLibraryIcon,
      color: '#f50057',
    },
    {
      title: 'Aptitude Tests Created',
      value: '156',
      icon: QuizIcon,
      color: '#00a152',
    },
    {
      title: 'Avg. Score',
      value: '78%',
      icon: TrendingUpIcon,
      color: '#ff9800',
    },
  ];

  const recentActivities = [
    { text: 'New programming video "React Hooks" added', icon: VideoLibraryIcon },
    { text: 'Test results for "Java Basics" published', icon: AssessmentIcon },
    { text: '15 new students enrolled this week', icon: PeopleIcon },
    { text: 'System maintenance scheduled for next Sunday', icon: StorageIcon },
  ];

  return (
    <Container maxWidth="lg" sx={{ pb: 4, mt: 4 }}> {/* Added margin-top */}
      <GradientBackground>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          fontWeight="bold"
        >
          Admin Dashboard
        </Typography>
      </GradientBackground>

      <Grid container spacing={4} mb={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard elevation={3}>
              <Icon
                component={stat.icon}
                style={{ fontSize: 48, color: stat.color, marginBottom: '8px' }} // Reduced margin
              />
              <Typography variant="h6" component="h2" gutterBottom align="center">
                {stat.title}
              </Typography>
              <Typography variant="h4" component="p" fontWeight="bold" align="center">
                {stat.value}
              </Typography>
            </StatCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} mb={4}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StyledCard elevation={3}>
              <StyledCardContent>
                <IconWrapper>
                  <Icon component={item.icon} color="primary" />
                </IconWrapper>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  align="center"
                >
                  {item.title}
                </Typography>
                <Typography color="textSecondary" align="center">
                  {item.description}
                </Typography>
              </StyledCardContent>
              <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}> {/* Reduced padding */}
                <Button
                  component={Link}
                  to={item.link}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ borderRadius: '20px' }}
                >
                  Go
                </Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}> {/* Reduced padding */}
            <Typography variant="h5" component="h2" gutterBottom>
              Recent Activities
            </Typography>
            <Divider sx={{ my: 2 }} />
            <List>
              {recentActivities.map((activity, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      <Icon component={activity.icon} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={activity.text} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}> {/* Reduced padding */}
            <Typography variant="h5" component="h2" gutterBottom>
              Announcements
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" alignItems="center" mb={1}> {/* Reduced margin-bottom */}
              <AnnouncementIcon color="primary" sx={{ mr: 2, fontSize: 32 }} />
              <Typography variant="body1">
                New feature: Code challenges now available
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <EventIcon color="secondary" sx={{ mr: 2, fontSize: 32 }} />
              <Typography variant="body1">
                Reminder: End of semester evaluations due next week
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          System Status
        </Typography>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}> {/* Reduced padding */}
          <Typography variant="body1" gutterBottom>
            Storage Usage
          </Typography>
          <LinearProgress
            variant="determinate"
            value={70}
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Typography
            variant="body2"
            color="textSecondary"
            align="right"
            mt={1}
          >
            70% (700GB / 1TB)
          </Typography>
        </Paper>
      </Box>

      <Box mb={4} />
    </Container>
  );
};

export default AdminDashboard;
