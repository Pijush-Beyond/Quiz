import { createSlice } from "@reduxjs/toolkit";
import { Total_Questions } from "./QuestionsReducer";


const TIME_PER_QUESTION = 1; // min minitue
const AUTO_JUMP_TIME_AFTER_ANSWER = 30;//in seconds
const QUIZ_TIME = Total_Questions * TIME_PER_QUESTION;
export { QUIZ_TIME, TIME_PER_QUESTION, AUTO_JUMP_TIME_AFTER_ANSWER };

const initialState = (() => {
  if (Storage && localStorage.getItem('result')) {
    const initialState = JSON.parse(localStorage.getItem('result'));
    initialState.endingTime = new Date(initialState.endingTime);
    return initialState;
  }
  else return { justFinished: false, quizRunning: false, currentQuestion: 0, wrong: 0, right: 0, skeeped: 0, resultAvailable: false };
})()


const reducer = createSlice({
  name: 'result',
  initialState,
  reducers: {
    right: state => {
      state.right++;
    },
    wrong: state => {
      state.wrong++;
    },
    skeeped: state => {
      state.skeeped++
    },
    next: state => {
      state.currentQuestion++;
      if ((state.currentQuestion - 1) === Total_Questions) {
        state.justFinished = true;
        state.quizRunning = false;
        state.resultAvailable = true;
        state.currentQuestion = 0;
        if (Storage) localStorage.setItem('result', JSON.stringify(state));
      }
      // return state;
    },
    start: state => {
      state.endingTime = new Date(Date.now() + (QUIZ_TIME*60*1000));
      // state.endingTime.setMilliseconds(QUIZ_TIME * 60 * 1000);
      
      state.quizRunning = true;
      state.currentQuestion = 1;
      state.wrong = 0;
      state.right = 0;
      state.skeeped = 0;
      state.resultAvailable = false;
      state.justFinished = false;
      if (Storage) localStorage.setItem('result', JSON.stringify(state));
    },
    submit: state => {
      state.justFinished = true;
      state.quizRunning = false;
      state.resultAvailable = true;
      state.currentQuestion = 0;

      if (Storage) localStorage.setItem('result', JSON.stringify(state));
    },
    updateLocalStorageWithCurrentResult: state => {
      if(Storage) localStorage.setItem('result',JSON.stringify(state))
    },
    exit: () => {
      if (Storage) {
        localStorage.removeItem('result');
        localStorage.removeItem('questions');
      }
    }
  }
})

export const { right, wrong, skeeped, next, start, submit, updateLocalStorageWithCurrentResult, exit } = reducer.actions;
export default reducer.reducer;