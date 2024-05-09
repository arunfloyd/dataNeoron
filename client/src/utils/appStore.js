import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import countReducer from "./apiCountSlice";

const appStore = configureStore({
  reducer: {
    task: taskReducer,
    apiCount: countReducer,
  },
});

export default appStore;
