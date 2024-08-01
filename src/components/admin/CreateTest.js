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
  const [testName, setTestName] = useState('');
  const [testId, setTestId] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', type: 'mcq', options: [''], testCases: [], codeExplanation: '' },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const testData = {
      name: testName,
      id: testId,
      accessCode: accessCode,
      timeLimit: parseInt(timeLimit, 10),
      questions,
    };
    console.log('Test Data:', testData);
    // Here you would typically send this data to your backend
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleTypeChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].type = value;
    if (value === 'mcq') {
      newQuestions[index].options = [''];
      newQuestions[index].testCases = [];
      newQuestions[index].codeExplanation = '';
    } else if (value === 'coding') {
      newQuestions[index].options = [];
      newQuestions[index].testCases = [{ input: '', output: '' }];
      newQuestions[index].codeExplanation = '';
    } else {
      newQuestions[index].options = [];
      newQuestions[index].testCases = [];
      newQuestions[index].codeExplanation = '';
    }
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

  const addTestCase = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].testCases.push({ input: '', output: '' });
    setQuestions(newQuestions);
  };

  const handleTestCaseChange = (questionIndex, testCaseIndex, field, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].testCases[testCaseIndex][field] = value;
    setQuestions(newQuestions);
  };

  const removeTestCase = (questionIndex, testCaseIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].testCases.splice(testCaseIndex, 1);
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', type: 'mcq', options: [''], testCases: [], codeExplanation: '' }]);
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
            label="Test Name"
            variant="outlined"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Test ID"
            variant="outlined"
            value={testId}
            onChange={(e) => setTestId(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Access Code"
            variant="outlined"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Time Limit (in minutes)"
            variant="outlined"
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
            required
          />
          {questions.map((question, questionIndex) => (
            <Box key={questionIndex} mb={4}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label={`Question ${questionIndex + 1}`}
                    variant="outlined"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
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

              {question.type === 'coding' && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Test Cases
                  </Typography>
                  {question.testCases.map((testCase, testCaseIndex) => (
                    <Grid container spacing={2} key={testCaseIndex}>
                      <Grid item xs={5}>
                        <TextField
                          fullWidth
                          margin="normal"
                          label="Input"
                          variant="outlined"
                          value={testCase.input}
                          onChange={(e) => handleTestCaseChange(questionIndex, testCaseIndex, 'input', e.target.value)}
                          required
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          fullWidth
                          margin="normal"
                          label="Expected Output"
                          variant="outlined"
                          value={testCase.output}
                          onChange={(e) => handleTestCaseChange(questionIndex, testCaseIndex, 'output', e.target.value)}
                          required
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          color="secondary"
                          onClick={() => removeTestCase(questionIndex, testCaseIndex)}
                          aria-label="delete test case"
                        >
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Box textAlign="center" my={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => addTestCase(questionIndex)}
                      startIcon={<Add />}
                    >
                      Add Test Case
                    </Button>
                  </Box>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Code Explanation"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={question.codeExplanation}
                    onChange={(e) => handleQuestionChange(questionIndex, 'codeExplanation', e.target.value)}
                  />
                </>
              )}
            </Box>
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