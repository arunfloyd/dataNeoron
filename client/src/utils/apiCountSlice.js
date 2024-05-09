import { createSlice } from "@reduxjs/toolkit";

// Redux Store for API count

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