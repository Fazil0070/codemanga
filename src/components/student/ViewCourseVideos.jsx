import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { useParams } from 'react-router-dom';

const ViewCourseVideos = () => {
  const { courseId } = useParams();

  // Dummy video data based on course ID
  const videos = {
    1: [
      { id: 1, title: 'Introduction to Python', videoUrl: 'https://www.example.com/python-intro' },
      { id: 2, title: 'Python Data Structures', videoUrl: 'https://www.example.com/python-data-structures' },
    ],
    2: [
      { id: 3, title: 'Algorithms Basics', videoUrl: 'https://www.example.com/algorithms-basics' },
      { id: 4, title: 'Sorting Algorithms', videoUrl: 'https://www.example.com/sorting-algorithms' },
    ],
  };

  const courseVideos = videos[courseId] || [];

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          View Course Videos
        </Typography>
        <List>
          {courseVideos.map(video => (
            <ListItem key={video.id}>
              <ListItemButton component="a" href={video.videoUrl} target="_blank">
                <ListItemText primary={video.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default ViewCourseVideos;
