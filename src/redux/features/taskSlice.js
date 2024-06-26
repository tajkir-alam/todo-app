import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../hooks/useAxiosSecure";

// Fetching Task Data
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  try {
    const response = await axiosSecure.get("/tasks");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});

// Adding new Task
export const addNewTask = createAsyncThunk("tasks/addNewTask", async (task) => {
  try {
    const response = await axiosSecure.post("/tasks", task);
    return response.data.data;
  } catch (error) {
    return error;
  }
});

// Delete Task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  try {
    const response = await axiosSecure.delete(`/tasks/${id}`);
    return response.data.data;
  } catch (error) {
    return error;
  }
});

// Update Task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const response = await axiosSecure.patch(`/tasks/${id}`, taskData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  tasks: JSON.parse(localStorage.getItem("persist:tasks")) || [],
  loading: false,
  error: null,
};

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("persist:tasks", serializedState);
  } catch (error) {
    console.error("Could not save state", error);
  }
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
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.meta.arg;
        state.tasks = state.tasks.filter((task) => task._id !== id);
        saveStateToLocalStorage(state);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTask = action.payload;
        const index = state.tasks.findIndex(
          (task) => task._id === updatedTask._id
        );
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
        saveStateToLocalStorage(state);
        localStorage.removeItem("updateTaskInfo");
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tasksSlice.reducer;
