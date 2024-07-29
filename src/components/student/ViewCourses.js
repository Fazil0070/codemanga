import React from 'react';
import { Container, Typography, Box, List, Card, CardContent, Button, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0px 15px 35px rgba(0,0,0,0.15)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: '25px',
  padding: theme.spacing(1.5, 4),
  background: 'linear-gradient(45deg, #1E88E5 30%, #42A5F5 90%)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(45deg, #42A5F5 30%, #1E88E5 90%)',
  },
}));

const courses = [
  { id: 1, title: 'Programming in Python', description: 'Learn the basics of Python programming.', },
  { id: 2, title: 'Data Structures and Algorithms', description: 'Understand key data structures and algorithms.', },
  { id: 3, title: 'Web Development Basics', description: 'Introduction to web development concepts.', },
  { id: 4, title: 'Aptitude for Competitive Exams', description: 'Enhance your aptitude skills for exams.', },
];

const ViewCourses = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="bold">
          View Courses
        </Typography>
        <StyledPaper>
          <List>
            {courses.map(course => (
              <StyledCard key={course.id} variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom fontWeight="medium">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {course.description}
                  </Typography>
                  <StyledButton
                    component={Link}
                    to={`/student/view-course-videos/${course.id}`}
                    variant="contained"
                    fullWidth
                  >
                    View Course Videos
                  </StyledButton>
                </CardContent>
              </StyledCard>
            ))}
          </List>
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default ViewCourses;
