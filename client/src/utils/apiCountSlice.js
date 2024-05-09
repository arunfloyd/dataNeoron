import { createSlice } from "@reduxjs/toolkit";

const apiCountSlice = createSlice({
  name: "count",
  initialState: null,
  reducers: {
    addCount: (state, action) => {
      return action.payload;
    }
  },
});

export const { addCount } = apiCountSlice.actions;

export default apiCountSlice.reducer;