import { createSlice } from "@reduxjs/toolkit";

// Redux store for Task 

const taskSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addTask: (state, action) => {
      return action.payload;
    }
  },
});

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;