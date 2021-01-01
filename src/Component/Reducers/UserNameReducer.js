import { createSlice } from "@reduxjs/toolkit";

const reducer = createSlice({
  name: 'userName',
  initialState: localStorage.getItem('userName') ? localStorage.getItem('userName') : '',
  reducers: {
    setUserName: (state, action) => {
      if (Storage) 
        localStorage.setItem('userName',action.payload);
      state = action.payload;
      return state
    }
  }
})

export const { setUserName }=reducer.actions;
export default reducer.reducer;