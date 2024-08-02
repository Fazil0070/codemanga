import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
}));

const UploadVideo = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!videoTitle || !description || !file) {
      alert('Please fill in all required fields.');
      return;
    }

    // Handle video upload logic
    console.log({ videoTitle, videoURL, description, file });

    // Implement file upload logic to the server here
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Upload Video
        </Typography>
      </Box>
      <StyledPaper elevation={3}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Video Title"
                variant="outlined"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Video URL (Optional)"
                variant="outlined"
                value={videoURL}
                onChange={(e) => setVideoURL(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="video/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFileChange}
                required
              />
              <label htmlFor="raised-button-file">
                <Button variant="outlined" component="span" fullWidth startIcon={<CloudUploadIcon />}>
                  Choose Video File
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Box textAlign="center">
                <StyledButton
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                </StyledButton>
              </Box>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </Container>
  );
};

export default UploadVideo;
