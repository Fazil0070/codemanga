import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, CircularProgress, Box, 
  Card, CardContent, Chip, Grid, Button, TextField, Autocomplete
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Expanded dummy data for testing
const dummyStudentsData = [
  {
    id: '12345',
    name: 'John Doe',
    results: [
      { topic: 'Python', score: 85, level: 'Intermediate' },
      { topic: 'JavaScript', score: 90, level: 'Advanced' },
      { topic: 'Data Structures', score: 75, level: 'Beginner' },
      { topic: 'Algorithms', score: 88, level: 'Intermediate' },
    ],
  },
  {
    id: '12346',
    name: 'Jane Smith',
    results: [
      { topic: 'Python', score: 92, level: 'Advanced' },
      { topic: 'JavaScript', score: 88, level: 'Intermediate' },
      { topic: 'Data Structures', score: 85, level: 'Intermediate' },
      { topic: 'Algorithms', score: 90, level: 'Advanced' },
    ],
  },
  // Add more students as needed
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ViewStudentResults = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Simulating API call
      setTimeout(() => {
        const student = dummyStudentsData.find(s => s.id === studentId) || dummyStudentsData[0];
        setStudentData(student);
        setLeaderboard(calculateLeaderboard(dummyStudentsData));
        setAllStudents(dummyStudentsData.map(s => ({ id: s.id, name: s.name })));
        setLoading(false);
      }, 1500);
    };

    fetchData();
  }, [studentId]);

  const calculateLeaderboard = (students) => {
    return students
      .map(student => ({
        name: student.name,
        totalScore: student.results.reduce((total, result) => total + result.score, 0)
      }))
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 5);
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Advanced': return 'success';
      case 'Intermediate': return 'info';
      case 'Beginner': return 'warning';
      default: return 'error';
    }
  };

  const calculateTotalScore = (results) => {
    return results.reduce((total, result) => total + result.score, 0);
  };

  const handleStudentChange = (event, value) => {
    if (value) {
      navigate(`/student/${value.id}`);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!studentData) {
    return (
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h6" align="center">No data found for this student.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
          Programming Aptitude Results
        </Typography>
        <Typography variant="h5" gutterBottom align="center" color="textSecondary">
          {studentData.name} (ID: {studentData.id})
        </Typography>
        <Box mt={2} display="flex" justifyContent="center">
          <Autocomplete
            options={allStudents}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select Student" variant="outlined" />}
            onChange={handleStudentChange}
          />
        </Box>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Topic Scores</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Topic</StyledTableCell>
                      <StyledTableCell align="right">Score</StyledTableCell>
                      <StyledTableCell align="right">Level</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentData.results.map((result, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">{result.topic}</StyledTableCell>
                        <StyledTableCell align="right">{result.score}</StyledTableCell>
                        <StyledTableCell align="right">
                          <Chip 
                            label={result.level} 
                            color={getLevelColor(result.level)}
                            size="small"
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box mt={2}>
                <Typography variant="h6">
                  Total Score: {calculateTotalScore(studentData.results)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Top Performers</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Rank</StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="right">Total Score</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaderboard.map((student, index) => (
                      <StyledTableRow key={index} selected={student.name === studentData.name}>
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell>{student.name}</StyledTableCell>
                        <StyledTableCell align="right">{student.totalScore}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ViewStudentResults;