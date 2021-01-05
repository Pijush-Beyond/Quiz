import { createSlice } from "@reduxjs/toolkit";
import questions from '../../Icons/Questions.json';

// const questions = ;
// console.log(questions);
const Total_Questions = 20;
export { Total_Questions };

const initialState = ((questions) => {
  const sequence = JSON.parse(localStorage.getItem('questions'));
  // console.log(sequence,typeof questions);
  if (sequence) {
    const newState = [];
    for (let i of sequence)
      newState.push(questions[i-1]);
    questions = newState;
    return questions
  } else return [];
})(questions);

const reducer = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: state => {
      const sequence=[];
      let newQuestions = [...questions];

      for (let i = newQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newQuestions[i], newQuestions[j]] = [newQuestions[j], newQuestions[i]];
      }

      const j = Math.floor(Math.random() * newQuestions.length);
      if ((newQuestions.length - j) < (Total_Questions - 1)) 
        state = newQuestions.slice(j).concat(newQuestions.slice(0, Total_Questions - (newQuestions.length - j)));
      else
        state = newQuestions.slice(j, j + Total_Questions);
        
      for (let i of state) sequence.push(i.id);

      if (Storage)
        localStorage.setItem('questions', JSON.stringify(sequence));
      return state;
    },
    removeQuestions: state => {
      if (Storage) localStorage.removeItem('questions');
      state = [];
      return state;
    },
  }
})

export const { setQuestions, removeQuestions } = reducer.actions;
export default reducer.reducer;

