import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./features/taskSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
  },
});
