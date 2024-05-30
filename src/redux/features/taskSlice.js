import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetching Task Data
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get("/mockAPI/taskData.json");
  return response.data;
});

const initialState = {
  tasks: JSON.parse(localStorage.getItem("persist:tasks")) || [],
  loading: false,
  error: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
  },
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
      });
  },
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
