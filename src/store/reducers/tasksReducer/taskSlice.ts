import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TaskModel } from "@models/task.model";
import {
  deleteTaskByIdAsync,
  editTaskAsync,
  getTaskByIdAsync, getTaskCountForUserAsync,
  getTaskListWithParamsAsync
} from "./thunks";
import { FilterType } from "../../../types/filterType";


interface TaskState {
  tasks: TaskModel[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  countOfTasks: number;
  lastVisible: string | null;
  filter: FilterType;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  hasNextPage: true,
  countOfTasks: 0,
  lastVisible: null,
  filter: "Active"
};


const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetTaskState: (state) => {
      state.tasks = initialState.tasks;
      state.error = initialState.error;
      state.lastVisible = initialState.lastVisible;
      state.hasNextPage = initialState.hasNextPage;
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTaskByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = [action.payload as TaskModel];
      })
      .addCase(editTaskAsync.fulfilled, (state, action) => {
        const updatedTask = action.payload;

        const updatedTaskIndex = state.tasks.findIndex(task => task.id === updatedTask?.id);

        if (updatedTaskIndex !== -1) {
          state.tasks[updatedTaskIndex] = updatedTask;
        }
      })
      .addCase(getTaskByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getTaskListWithParamsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTaskListWithParamsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.concat(action.payload.tasks);
        state.lastVisible = action.payload.tasks[action.payload.tasks.length - 1]?.created_at || null;
        state.hasNextPage = action.payload.hasNextPage;
      })
      .addCase(getTaskListWithParamsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTaskByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTaskByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTaskByIdAsync.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(getTaskCountForUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.countOfTasks = action.payload;
      });
  }
});

export const { resetTaskState, setFilter } = taskSlice.actions;

export default taskSlice.reducer;


