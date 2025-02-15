
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, addQuestion, addAnswer } from '../redux/slicers/quetionsSlicer';
import { updateQuestionAnswer } from '../redux/slicers/quetionsSlicer';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid2,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip
} from '@mui/material';
import image from '../../images/10.png'
import Avatar from '@mui/material/Avatar';

function QuestionPage() {
  const allQuestions = useSelector((state) => state.questions.allQuestions);
  const questionStatus = useSelector((state) => state.questions.questionStatus);
  const answerStatus = useSelector((state) => state.questions.answersStatus);
  const dispatch = useDispatch();
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const user = JSON.parse(localStorage.getItem('userLogin'));
  const selectedCategoryFromLS = JSON.parse(localStorage.getItem('selectedCategory'));
  const [open, setOpen] =useState(false);
  const [scroll, setScroll] =useState('paper');
 

  useEffect(() => {
    if (questionStatus === 'idle' && answerStatus === 'idle') {
      dispatch(fetchQuestions(selectedCategoryFromLS));
    }
  }, [dispatch,  questionStatus]);

 
  const handleAddQuestion = async () => {
    const newObjectQuestion = {
      question: newQuestion,
      category: {
        id: selectedCategoryFromLS.id
      },
      answers: [{}],
      myUser: {
        id: user.id
      }
    };

    if (!newQuestion.trim()) {
      console.log("miss question");
      return;
    }

    dispatch(addQuestion(newObjectQuestion));
    console.log('success');
    setNewQuestion('');
  };

  const handleAddAnswer = async () => {
    const newObjectAnswer = {
      answer: newAnswer,
      myUser: {
        id: user.id
      }
    };

    if (!newAnswer.trim() || !selectedQuestion) return;


  await dispatch(addAnswer({ questionId: selectedQuestion.id, answer: newObjectAnswer }));
    console.log('success');
    console.log(newObjectAnswer);
  await dispatch(updateQuestionAnswer(selectedQuestion,newObjectAnswer))

    const updatedQuestion = {
      ...selectedQuestion,
      answers: [...selectedQuestion.answers, newObjectAnswer]
    };

    setSelectedQuestion(updatedQuestion); 

    setNewAnswer(''); 
  };



  const handleClickOpen = (scrollType, question) => () => {
    setSelectedQuestion(question);
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  const filteredQuestions = allQuestions.filter((question) =>
    question?.question?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Container sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
      }}>
        <Typography variant="h3" sx={{ padding: '5%', color: 'rgb(130, 194, 115)' }}>
          {selectedCategoryFromLS?.name} :שאלות בנושא
        </Typography>

        <Grid2 item sx={4}>
          <Paper sx={{ padding: 2, backgroundColor: 'rgb(243, 236, 222)', width: '80vw' }}>
            <Typography variant="h5" sx={{ paddingBottom: '3%', textAlign: 'center', color: 'rgb(130, 194, 115)', fontWeight: 'bold' }}>
              בחר שאלה מרשימת השאלות כדי לראות את התשובות
            </Typography>

        
            <TextField
              label="search question..."
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ marginBottom: 2 }}
            />

            <List>
              {filteredQuestions.map((question) => (
                <div key={question.id}>
                  <ListItem
                    button
                    onClick={handleClickOpen('paper', question)}
                    selected={selectedQuestion?.id === question.id}
                  >
                    <ListItemText sx={{ wordBreak: 'break-word', textAlign: 'right' }} primary={question.question} />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </Paper>
        </Grid2>


  
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title" sx={{ backgroundColor: 'rgb(246, 229, 207)' }}>
            <Typography style={{ color: 'rgb(130, 194, 115)', wordBreak: 'break-word', maxWidth: '75%' }}>
              <h2>{selectedQuestion?.question}</h2>
            </Typography>
            <Box sx={{ marginTop: '-20%' }}>
              <img
                src={image}
                alt="My Image"
                style={{
                  marginLeft: '70%',
                  width: '30%',
                  height: 'auto',
                  borderRadius: '10px',
                }}
              />
            </Box>
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: 'rgb(246, 229, 207)' }} dividers={scroll === 'paper'}>
            <DialogContentText id="scroll-dialog-description" 
    
            tabIndex={-1}>
              {selectedQuestion ? (
                <>
                  <Box sx={{ marginBottom: 3 }}>
                    {selectedQuestion.answers.length > 0 ? (
                      selectedQuestion.answers.map((answer) => (
                        <Paper
                          key={answer.id}
                          sx={{ padding: 2, marginBottom: 2, backgroundColor: 'rgb(243, 236, 222)', maxWidth: '100%', wordBreak: 'break-word' }}
                        >
                          <div>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box sx={{ margin: 1 }}>
                                <Avatar />
                              </Box>
                              <Box sx={{ width: '100%' }}>
                                <Chip label={answer.myUser?.name} />
                              </Box>
                            </Box>
                            <Paper sx={{ padding: '3%', backgroundColor: 'rgb(255, 250, 241)' }}>{answer.answer}</Paper>
                          </div>
                        </Paper>
                      ))
                    ) : (
                      <Typography>אין תשובות לשאלה זו.</Typography>
                    )}
                  </Box>


                  {/* Add answer input */}
                  <TextField
                    label="הקלד תשובה..."
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  <Button
                    onClick={handleAddAnswer}
                    variant="contained"
                    color="primary"
                    sx={{
                      marginLeft: '0%',
                      background: 'linear-gradient(to right, #d4f4dd, #a8e6b1)',
                      color: 'rgb(130, 194, 115)',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '10px 20px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      textShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(to right, ##2e7d32, #a8e6b1)',
                        transform: 'scale(1.05)',
                        boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
                      },
                      '&:active': {
                        transform: 'scale(0.95)',
                        boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
                      },
                    }}
                  >
                    הוסף תשובה
                  </Button>
                </>
              ) : (
                <h1>אין שאלה</h1>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: 'rgb(246, 229, 207)' }}>
            <Button sx={{ color: 'rgb(130, 194, 115)' }} onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>

        {/* add new question */}
        <Grid2 container spacing={4}>
          <Grid2 item xs={6}>
            <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 4, color: 'rgb(130, 194, 115)' }}>הוסף שאלה חדשה</Typography>
            <TextField
              label="add question..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Button
              onClick={handleAddQuestion}
              variant="contained"
              color="success"
              sx={{
                marginLeft: '2%',
                background: 'linear-gradient(to right, #d4f4dd, #a8e6b1)',
                color: 'rgb(130, 194, 115)',
                border: 'none',
                borderRadius: '25px',
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                textShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(to right, ##2e7d32, #a8e6b1)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              הוסף שאלה
            </Button>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}

export default QuestionPage;