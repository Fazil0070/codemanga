import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Button,
  LinearProgress,
  Paper,
  Card,
  CardContent,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  FormControl,
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AceEditor from 'react-ace';
import { PlayArrowOutlined, FullscreenOutlined } from '@mui/icons-material';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 3px 15px rgba(0, 0, 0, 0.1)',
  background: '#ffffff',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '4px',
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  fontWeight: 'bold',
}));

const StyledAceEditor = styled(AceEditor)(({ theme }) => ({
  width: '100% !important',
  height: '600px !important',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
}));

const CompilerBox = styled(Box)(({ theme }) => ({
  background: '#ffffff',
  borderRadius: theme.spacing(2),
  border: '1px solid #e0e0e0',
  overflow: 'hidden',
  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
  margin: '0 -16px',
}));

const CompilerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: '1px solid #e0e0e0',
  background: 'linear-gradient(to right, #f8f8f8, #e8e8e8)',
}));

const ResultBox = styled(Box)(({ theme }) => ({
  background: '#f5f5f5',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  border: '1px solid #e0e0e0',
}));

const ResultTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

const ResultItem = styled(Typography)(({ theme, success }) => ({
  color: success ? '#4caf50' : '#f44336',
  marginBottom: theme.spacing(0.5),
  fontFamily: 'monospace',
  fontSize: '14px',
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  minWidth: 120,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e0e0e0',
  },
}));

const AttendTest = () => {
  const [loading, setLoading] = useState(true);
  const [testContent, setTestContent] = useState(null);
  const [answers, setAnswers] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [codeResult, setCodeResult] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('java');

  useEffect(() => {
    const fetchTestContent = async () => {
      setLoading(true);
      setTimeout(() => {
        const content = {
          title: 'Assessment Test',
          questions: [
            {
              type: 'mcq',
              question: 'What is the time complexity of Quick Sort?',
              options: ['O(n)', 'O(n^2)', 'O(log n)', 'O(n log n)'],
            },
            {
              type: 'paragraph',
              question: 'Explain the concept of closure in JavaScript.',
            },
            {
              type: 'coding',
              question: 'Write a function to reverse a string.',
              languages: ['python', 'javascript', 'java', 'c_cpp'],
              testCases: [
                { input: 'hello', output: 'olleh' },
                { input: 'world', output: 'dlrow' },
              ],
            },
          ],
        };
        setTestContent(content);
        setLoading(false);
      }, 1500);
    };

    fetchTestContent();
  }, []);

  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [activeStep]: value,
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setCodeResult(null);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCodeResult(null);
  };

  const handleSubmit = () => {
    console.log('Answers submitted:', answers);
    alert('Test submitted successfully!');
  };

  const handleCodeRun = async () => {
    setCodeResult(['Running code...']);
    setTimeout(() => {
      const result = [
        'Passed: Test case 1',
        'Passed: Test case 2',
      ];
      setCodeResult(result);
    }, 2000);
  };

  const handleFullScreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading test content...
          </Typography>
        </Box>
      </Container>
    );
  }

  const currentQuestion = testContent.questions[activeStep];

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="bold">
          {testContent.title}
        </Typography>
        <StyledPaper elevation={3}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {testContent.questions.map((_, index) => (
              <Step key={index}>
                <StepLabel>Question {index + 1}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Question {activeStep + 1}:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {currentQuestion.question}
                  </Typography>
                  {currentQuestion.type === 'mcq' && (
                    <RadioGroup value={answers[activeStep] || ''} onChange={(e) => handleAnswerChange(e.target.value)}>
                      {currentQuestion.options.map((option, i) => (
                        <FormControlLabel key={i} value={option} control={<Radio color="primary" />} label={option} />
                      ))}
                    </RadioGroup>
                  )}
                  {currentQuestion.type === 'paragraph' && (
                    <TextField
                      label="Your Answer"
                      fullWidth
                      variant="outlined"
                      multiline
                      rows={4}
                      value={answers[activeStep] || ''}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      sx={{ mt: 2 }}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              {currentQuestion.type === 'coding' && (
                <CompilerBox>
                  <CompilerHeader>
                    <FormControl variant="outlined">
                      <StyledSelect
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>Select Language</MenuItem>
                        {currentQuestion.languages.map((lang) => (
                          <MenuItem key={lang} value={lang}>
                            {lang.toUpperCase()}
                          </MenuItem>
                        ))}
                      </StyledSelect>
                    </FormControl>
                    <Box>
                      <Tooltip title="Fullscreen">
                        <IconButton onClick={handleFullScreen}>
                          <FullscreenOutlined />
                        </IconButton>
                      </Tooltip>
                      <StyledButton variant="contained" color="primary" onClick={handleCodeRun} sx={{ ml: 1, mr: 1 }}>
                        <PlayArrowOutlined sx={{ mr: 1 }} /> Run Code
                      </StyledButton>
                    </Box>
                  </CompilerHeader>
                  <StyledAceEditor
                    mode={selectedLanguage}
                    theme="monokai"
                    name="code-editor"
                    editorProps={{ $blockScrolling: true }}
                    onChange={(value) => handleAnswerChange(value)}
                    value={answers[activeStep] || ''}
                    setOptions={{
                      enableBasicAutocompletion: true,
                      enableLiveAutocompletion: true,
                      enableSnippets: true,
                      showLineNumbers: true,
                      tabSize: 2,
                      fontSize: 16,
                    }}
                  />
                </CompilerBox>
              )}
              {codeResult && (
                <ResultBox>
                  <ResultTitle variant="h6">Code Result</ResultTitle>
                  {codeResult.map((result, index) => (
                    <ResultItem key={index} success={result.startsWith('Passed')}>
                      {result}
                    </ResultItem>
                  ))}
                </ResultBox>
              )}
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <StyledButton variant="outlined" disabled={activeStep === 0} onClick={handleBack}>
              Back
            </StyledButton>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={activeStep === testContent.questions.length - 1 ? handleSubmit : handleNext}
            >
              {activeStep === testContent.questions.length - 1 ? 'Submit' : 'Next'}
            </StyledButton>
          </Box>
        </StyledPaper>
        <LinearProgress
          variant="determinate"
          value={(activeStep / (testContent.questions.length - 1)) * 100}
          sx={{ mt: 4, height: 10, borderRadius: 5 }}
        />
      </Box>
    </Container>
  );
};

export default AttendTest;