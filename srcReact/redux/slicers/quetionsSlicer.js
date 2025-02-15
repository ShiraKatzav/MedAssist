import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getQuestionsWithAnswersForCategory } from '../../API/API-category';

import { createQuestion, updateQuestion } from '../../API/API-questions';
import { createAnswer } from '../../API/API-answers';

export const fetchQuestions = createAsyncThunk(
    'questions/fetchQuestions',  
    async (selectedCategory) => {
      const response = await getQuestionsWithAnswersForCategory(selectedCategory);  
      console.log(response)
      return response;  
    }
  );

  export const addQuestion = createAsyncThunk(
    'questions/addQuestion',
    async (newQuestion) => {
      console.log(newQuestion);
      const response = await createQuestion(newQuestion);  
      return response.data; 
    }
  );

  export const addAnswer = createAsyncThunk(
    'questions/addAnswer',
    async ({questionId,answer}) => {
      const response = await createAnswer(questionId,answer);  
      return response.data; 
    }
  );
  

  const QuestionsSlice = createSlice({
    name: 'questions',
    initialState: {
      allQuestions: [],  
 
      questionStatus: 'idle',
      answersStatus: 'idle',  
      error: null,
    },
    reducers: {
    updateQuestionAnswer:(state,action)=>{
      const {questionId,answer}=action.payload
      const question=state.allQuestions.find((q)=>q.id==questionId);
      if(question)
        question.answers.push(answer);
    }
  },
    extraReducers: (builder) => {
      builder
        .addCase(fetchQuestions.pending, (state) => {
          state.questionsStatus = 'loading';  
        })
        .addCase(fetchQuestions.fulfilled, (state, action) => {
          state.questionsStatus = 'succeeded';  
          state.allQuestions = action.payload; 
          console.log(state.allQuestions) 
        })
        .addCase(fetchQuestions.rejected, (state, action) => {
          state.questionsStatus = 'failed'; 
          state.error = action.error.message; 
        })
        .addCase(addQuestion.fulfilled, (state, action) => {
          state.allQuestions.push(action.payload); 
        })
        .addCase(addAnswer.fulfilled, (state, action) => {
        
          const questionIndex = state.allQuestions.findIndex(
            (question) => question.id === action.payload.questionId
          );
          if (questionIndex !== -1) {
    
            state.allQuestions[questionIndex].answers.push(action.payload.newAnswer);
          }
        });
      
    },

  });
  
  export const { updateQuestionAnswer } = QuestionsSlice.actions;
  export default QuestionsSlice.reducer; 