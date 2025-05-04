import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],  // Ensure it's initialized as an empty array
  currentQuestionIndex: 0,  // Index for the current question
  score: 0,
  answers: [],
  isQuizFinished: false,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;  // Set questions from payload
      state.currentQuestionIndex = 0;  // Reset to first question
      state.score = 0;
      state.answers = [];
      state.isQuizFinished = false;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
    trackAnswer: (state, action) => {
      const { questionId, selectedOption, correctAnswer } = action.payload;
      state.answers.push({ questionId, selectedOption, correctAnswer });
    },
    finishQuiz: (state) => {
      state.isQuizFinished = true;
    },
    setCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;  // Update current question index
    }
  }
});

export const { setQuestions, setScore, trackAnswer, finishQuiz, setCurrentQuestionIndex } = quizSlice.actions;
export default quizSlice.reducer;
