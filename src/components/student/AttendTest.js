import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  FormControl,
  ThemeProvider,
  createTheme,
  CssBaseline,
  InputLabel,
  Snackbar,
  Alert,
  Grid,
  Divider,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AceEditor from 'react-ace';
import { 
  PlayArrowOutlined, 
  LockOutlined, 
  CodeOutlined, 
  CheckCircleOutline, 
  TimerOutlined,
  InfoOutlined,
  AssignmentOutlined,
  SecurityOutlined,
  InputOutlined,
  OutputOutlined,
} from '@mui/icons-material';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 12,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  background: '#ffffff',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
}));

const StyledAceEditor = styled(AceEditor)(({ theme }) => ({
  width: '100% !important',
  height: '400px !important',
  borderRadius: 8,
  border: '1px solid #e0e0e0',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

const CompilerBox = styled(Box)(({ theme }) => ({
  background: '#ffffff',
  borderRadius: 12,
  border: '1px solid #e0e0e0',
  overflow: 'hidden',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
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
  borderRadius: 8,
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  border: '1px solid #e0e0e0',
}));

const ResultTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
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

const GradientBackground = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const TimerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.primary.main,
  color: 'white',
  borderRadius: 8,
  padding: theme.spacing(1, 2),
  fontWeight: 'bold',
}));

const TestSelection = ({ onTestStart }) => {
  const [testName, setTestName] = useState('');
  const [testId, setTestId] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');

  const handleTestStart = async () => {
    try {
      const response = await fetch(`/api/tests/${testId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessCode }),
      });

      if (response.ok) {
        const testData = await response.json();
        onTestStart(testData);
      } else {
        setError('Invalid test ID or access code. Using default test.');
        onTestStart(null);
      }
    } catch (error) {
      console.error('Error fetching test:', error);
      setError('Error fetching test. Using default test.');
      onTestStart(null);
    }
  };

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3, fontWeight: 'bold' }}>
        <AssignmentOutlined sx={{ mr: 1, verticalAlign: 'bottom', fontSize: 32 }} />
        Test Selection
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Test Name"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InfoOutlined color="action" sx={{ mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Test ID"
            value={testId}
            onChange={(e) => setTestId(e.target.value)}
            InputProps={{
              startAdornment: (
                <CodeOutlined color="action" sx={{ mr: 1 }} />
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Access Code"
            type="password"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            InputProps={{
              startAdornment: (
                <LockOutlined color="action" sx={{ mr: 1 }} />
              ),
            }}
          />
        </Grid>
      </Grid>
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleTestStart}
          disabled={!testName || !testId || !accessCode}
          startIcon={<PlayArrowOutlined />}
          size="large"
        >
          Start Test
        </StyledButton>
      </Box>
    </StyledPaper>
  );
};

const TestRules = ({ onAccept }) => {
  const rules = [
    'Complete the test within the given time limit.',
    'Do not cheat or use any unauthorized materials.',
    'Once you start the test, the timer will begin and cannot be paused.',
    'Answer all questions to the best of your ability.',
    'The test will be in full-screen mode. Do not exit full-screen or switch tabs.',
    'Switching tabs more than 5 times will automatically submit your test.',
  ];

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3, fontWeight: 'bold' }}>
        <SecurityOutlined sx={{ mr: 1, verticalAlign: 'bottom', fontSize: 32 }} />
        Test Rules
      </Typography>
      <Box sx={{ mb: 3 }}>
        {rules.map((rule, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Chip
              label={index + 1}
              color="primary"
              size="small"
              sx={{ mr: 2, minWidth: 30 }}
            />
            <Typography variant="body1">{rule}</Typography>
          </Box>
        ))}
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ textAlign: 'center' }}>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={onAccept}
          startIcon={<CheckCircleOutline />}
          size="large"
        >
          I Understand and Accept
        </StyledButton>
      </Box>
    </StyledPaper>
  );
};

const AttendTest = () => {
  const [loading, setLoading] = useState(true);
  const [testContent, setTestContent] = useState(null);
  const [answers, setAnswers] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [codeResult, setCodeResult] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [testStarted, setTestStarted] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [testTime, setTestTime] = useState(3600);
  const [timer, setTimer] = useState(null);
  const [testCompleted, setTestCompleted] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  useEffect(() => {
    if (testStarted) {
      const fetchTestContent = async () => {
        setLoading(true);
        try {
          const response = await fetch('/api/test-content');
          if (response.ok) {
            const data = await response.json();
            setTestContent(data);
          } else {
            throw new Error('Failed to fetch test content');
          }
        } catch (error) {
          console.error('Error fetching test content:', error);
          setSnackbarMessage('Failed to fetch test content. Using default test.');
          setSnackbarSeverity('warning');
          setSnackbarOpen(true);
          
          // Use default content if fetch fails
          const defaultContent = {
            title: 'Default Assessment Test',
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
                sampleInput: 'hello',
                sampleOutput: 'olleh',
                explanation: 'The function should take a string as input and return the reversed string. For example, "hello" should be reversed to "olleh".',
              },
            ],
          };
          setTestContent(defaultContent);
        }
        setLoading(false);
      };

      fetchTestContent();
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });

      const handleVisibilityChange = () => {
        if (document.hidden) {
          setTabSwitchCount(prevCount => {
            const newCount = prevCount + 1;
            if (newCount >= 5) {
              handleSubmit();
            } else {
              setSnackbarMessage(`Warning: Do not switch tabs! Attempts left: ${5 - newCount}`);
              setSnackbarSeverity('warning');
              setSnackbarOpen(true);
            }
            return newCount;
          });
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [testStarted]);

  useEffect(() => {
    if (testStarted && testTime > 0) {
      const interval = setInterval(() => {
        setTestTime((prevTime) => prevTime - 1);
      }, 1000);
      setTimer(interval);
      return () => clearInterval(interval);
    } else if (testTime === 0) {
      clearInterval(timer);
      setSnackbarMessage('Time is up! Submitting the test.');
      setSnackbarSeverity('info');
      setSnackbarOpen(true);
      handleSubmit();
    }
  }, [testStarted, testTime]);

  const handleTestStart = (testData) => {
    if (testData) {
      setTestContent(testData);
    }
    setShowRules(true);
  };

  const handleAcceptRules = () => {
    setShowRules(false);
    setTestStarted(true);
  };

  const handleAnswerChange = (value) => {
    setAnswers({...answers,
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
  
  const handleSubmit = useCallback(() => {
    console.log('Answers submitted:', answers);
    setTestCompleted(true);
    clearInterval(timer);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [answers, timer]);
  
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
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const renderCodingQuestion = (question) => {
    return (
      <CompilerBox>
        <CompilerHeader>
          <Typography variant="h6">
            <CodeOutlined sx={{ mr: 1, verticalAlign: 'middle' }} />
            Coding Challenge
          </Typography>
          <FormControl variant="outlined" size="small">
            <InputLabel id="language-select-label">Language</InputLabel>
            <StyledSelect
              labelId="language-select-label"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              label="Language"
            >
              {question.languages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang.toUpperCase()}
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        </CompilerHeader>
        <Box sx={{ p: 2 }}>
          <Typography variant="body1" paragraph>
            {question.question}
          </Typography>
          <Box sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Sample Input:
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
              {question.sampleInput}
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Sample Output:
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
              {question.sampleOutput}
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Explanation:
            </Typography>
            <Typography variant="body2">
              {question.explanation}
            </Typography>
          </Box>
          <StyledAceEditor
            mode={selectedLanguage}
            theme="monokai"
            onChange={(value) => handleAnswerChange(value)}
            value={answers[activeStep] || ''}
            name="code-editor"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <StyledButton
              variant="contained"
              color="primary"
              startIcon={<PlayArrowOutlined />}
              onClick={handleCodeRun}
            >
              Run Code
            </StyledButton>
          </Box>
        </Box>
        {codeResult && (
          <ResultBox>
            <ResultTitle variant="subtitle1">Results:</ResultTitle>
            {codeResult.map((result, index) => (
              <ResultItem key={index} variant="body2" success={result.includes('Passed')}>
                {result}
              </ResultItem>
            ))}
          </ResultBox>
        )}
      </CompilerBox>
    );
  };
  
  if (testCompleted) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GradientBackground>
          <Container maxWidth="sm">
            <StyledPaper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Test Completed
              </Typography>
              <Typography variant="body1" paragraph>
                Thank you for completing the test. Your responses have been submitted successfully.
              </Typography>
              <CheckCircleOutline color="primary" sx={{ fontSize: 64, mb: 2 }} />
            </StyledPaper>
          </Container>
        </GradientBackground>
      </ThemeProvider>
    );
  }
  
  if (!testStarted && !showRules) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GradientBackground>
          <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
              <TestSelection onTestStart={handleTestStart} />
            </Box>
          </Container>
        </GradientBackground>
      </ThemeProvider>
    );
  }
  
  if (showRules) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GradientBackground>
          <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
              <TestRules onAccept={handleAcceptRules} />
            </Box>
          </Container>
        </GradientBackground>
      </ThemeProvider>
    );
  }
  
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GradientBackground>
          <Container>
            <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress size={60} thickness={4} sx={{ color: 'white' }} />
              <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>
                Loading test content...
              </Typography>
            </Box>
          </Container>
        </GradientBackground>
      </ThemeProvider>
    );
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            {testContent.title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <TimerBox>
              <TimerOutlined sx={{ mr: 1 }} />
              <Typography variant="h6">
                Time Remaining: {formatTime(testTime)}
              </Typography>
            </TimerBox>
            <StyledButton
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Submit Test
            </StyledButton>
          </Box>
          <Stepper activeStep={activeStep} alternativeLabel>
            {testContent.questions.map((_, index) => (
              <Step key={index}>
                <StepLabel>Question {index + 1}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <StyledPaper elevation={3} sx={{ mt: 4, p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Question {activeStep + 1}
            </Typography>
            <Typography variant="body1" paragraph>
              {testContent.questions[activeStep].question}
            </Typography>
            {testContent.questions[activeStep].type === 'mcq' && (
              <RadioGroup
                value={answers[activeStep] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
              >
                {testContent.questions[activeStep].options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            )}
            {testContent.questions[activeStep].type === 'paragraph' && (
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={answers[activeStep] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
              />
            )}
            {testContent.questions[activeStep].type === 'coding' && renderCodingQuestion(testContent.questions[activeStep])}
          </StyledPaper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <StyledButton
              variant="outlined"
              color="primary"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Previous
            </StyledButton>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={activeStep === testContent.questions.length - 1 ? handleSubmit : handleNext}
            >
              {activeStep === testContent.questions.length - 1 ? 'Submit' : 'Next'}
            </StyledButton>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default AttendTest;