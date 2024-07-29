import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const CreateTest = () => {
  const [testTitle, setTestTitle] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', type: 'mcq', options: [''] },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle test creation logic
    const testData = {
      title: testTitle,
      questions,
    };
    console.log('Test Data:', testData);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleTypeChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].type = value;
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', type: 'mcq', options: [''] }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Test
        </Typography>
      </Box>
      <StyledPaper elevation={3}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Test Title"
            variant="outlined"
            value={testTitle}
            onChange={(e) => setTestTitle(e.target.value)}
            required
          />
          {questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label={`Question ${questionIndex + 1}`}
                    variant="outlined"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={question.type}
                      onChange={(e) => handleTypeChange(questionIndex, e.target.value)}
                      label="Type"
                    >
                      <MenuItem value="mcq">MCQ</MenuItem>
                      <MenuItem value="paragraph">Paragraph</MenuItem>
                      <MenuItem value="coding">Coding</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    color="secondary"
                    onClick={() => removeQuestion(questionIndex)}
                    aria-label="delete question"
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
              {question.type === 'mcq' && question.options.map((option, optionIndex) => (
                <Grid container spacing={2} key={optionIndex}>
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label={`Option ${optionIndex + 1}`}
                      variant="outlined"
                      value={option}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      color="secondary"
                      onClick={() => removeOption(questionIndex, optionIndex)}
                      aria-label="delete option"
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              {question.type === 'mcq' && (
                <Box textAlign="center" my={1}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => addOption(questionIndex)}
                    startIcon={<Add />}
                  >
                    Add Option
                  </Button>
                </Box>
              )}
            </div>
          ))}
          <Box textAlign="center" my={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={addQuestion}
              startIcon={<Add />}
            >
              Add Question
            </Button>
          </Box>
          <Box textAlign="center" mt={3}>
            <Button variant="contained" color="primary" type="submit" size="large">
              Create Test
            </Button>
          </Box>
        </form>
      </StyledPaper>
    </Container>
  );
};

export default CreateTest;
