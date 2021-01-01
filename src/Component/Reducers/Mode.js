import { createSlice } from "@reduxjs/toolkit";

const initialState = (() => {
  const state = { value: localStorage.getItem('mode') || (window.matchMedia("((prefers-color-scheme):dark)").match && "dark") || (window.matchMedia("((prefers-color-scheme):light)").match && "light") || "light" };
  if (state.value === 'dark') document.body.classList.add('dark');
  return state;
})();

const reducer = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setMode: (state, action) => {
      document.body.classList.toggle('dark');
      if (Storage)
        localStorage.setItem('mode', action.payload);
      state.value = action.payload;
    }
  }
})

export const { setMode }=reducer.actions;
export default reducer.reducer;