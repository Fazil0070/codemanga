import React from 'react';
import { Container, Typography, Box, List, Card, CardContent, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  marginBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  borderRadius: theme.shape.borderRadius * 2,
}));

const results = [
  { id: 1, test: 'JavaScript Basics', grade: 'A', date: '2024-05-01', details: 'Scored 90/100 in fundamentals of JavaScript.' },
  { id: 2, test: 'Data Structures', grade: 'B', date: '2024-06-01', details: 'Scored 75/100 in Data Structures and Algorithms.' },
  { id: 3, test: 'Algorithm Design', grade: 'A-', date: '2024-07-01', details: 'Scored 85/100 in Algorithm Design principles.' },
  { id: 4, test: 'Logical Reasoning', grade: 'B+', date: '2024-08-01', details: 'Scored 80/100 in Logical Reasoning.' },
  { id: 5, test: 'Quantitative Aptitude', grade: 'A', date: '2024-09-01', details: 'Scored 95/100 in Quantitative Aptitude.' },
];

const ViewTestResults = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          View Test Results
        </Typography>
        <StyledPaper>
          <List>
            {results.map(result => (
              <StyledCard key={result.id} variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {result.test}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        Grade: <strong>{result.grade}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        Date: <strong>{result.date}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">
                        Details: {result.details}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            ))}
          </List>
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default ViewTestResults;
