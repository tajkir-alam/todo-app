import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetching Task Data
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(
    "https://titans-todo-app-backend.vercel.app/api/v1/tasks"
  );

  return response.data.data;
});

// Adding new Task
export const addNewTask = createAsyncThunk("tasks/addNewTask", async (task) => {
  const response = await axios.post(
    "https://titans-todo-app-backend.vercel.app/api/v1/tasks",
    task
  );
  return response.data.data;
});

const initialState = {
  tasks: JSON.parse(localStorage.getItem("persist:tasks")) || [],
  loading: false,
  error: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNewTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tasksSlice.reducer;
