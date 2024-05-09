import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import countReducer from "./apiCountSlice";

// This is the main store for the redux

const appStore = configureStore({
  reducer: {
    task: taskReducer,
    apiCount: countReducer,
  },
});

export default appStore;
