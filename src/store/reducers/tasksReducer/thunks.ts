import { createAsyncThunk } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";

import { TasksActionTypes } from "./actionTypes";
import TaskService from "@services/task.service";
import { TaskModel } from "@models/task.model";

export const getTaskByIdAsync = createAsyncThunk(
  TasksActionTypes.GET_TASK_BY_ID,
  async (taskId: string, { rejectWithValue }) => {
    try {
      const task = await TaskService.getTaskById(taskId);
      return task;
    } catch (error) {
      return rejectWithValue("Error getting task by ID");
    }
  }
);

export const getTaskListWithParamsAsync = createAsyncThunk(
  TasksActionTypes.GET_TASKS_BY_USER_ID,
  async (pageSize: number, { getState }) => {
    try {

      // @TODO find solution to fix redux typing
      const lastVisible = getState().tasks.lastVisible;
      const activeFilter = getState().tasks.filter;
      const userId = getState().user.userInfo?.id;
      if (!userId) return;
      const response = await TaskService.getTaskListWithParams(userId, activeFilter, pageSize, lastVisible);
      return response;
    } catch (error: any) {
      showMessage({
        message: "Error loading task list",
        icon: "auto",
        type: "danger"
      });
    }
  }
);

export const addTaskAsync = createAsyncThunk(
  TasksActionTypes.ADD_TASK,
  async (newTask: TaskModel) => {
    try {
      const taskId = await TaskService.addTask(newTask);
      showMessage({
        message: `New task successfully added: "${newTask.title}"`,
        icon: "auto",
        type: "success"
      });
      return { id: taskId, ...newTask } as TaskModel;
    } catch (error) {
      showMessage({
        message: "Error adding task",
        icon: "auto",
        type: "danger"
      });
    }
  }
);

export const editTaskAsync = createAsyncThunk(
  TasksActionTypes.EDIT_TASK_BY_ID,
  async (params: { taskId: string; updatedTask: TaskModel }) => {
    try {
      const updatedTask = await TaskService.editTaskById(params.taskId, params.updatedTask);

      return updatedTask;
    } catch (error) {
      showMessage({
        message: `Error editing task ${params.updatedTask.title}`,
        icon: "auto",
        type: "danger"
      });
    }
  }
);

export const deleteTaskByIdAsync = createAsyncThunk(
  TasksActionTypes.DELETE_TASK_BY_ID,
  async (taskId: string) => {
    try {
      await TaskService.deleteTaskById(taskId);
      showMessage({
        message: "Task successfully deleted",
        icon: "auto",
        type: "success"
      });
      return taskId;
    } catch (error) {
      showMessage({
        message: "Error deleting task",
        icon: "auto",
        type: "danger"
      });
    }
  }
);

export const getTaskCountForUserAsync = createAsyncThunk(
  TasksActionTypes.GET_TASK_COUNT_FOR_USER,
  async (userId: string, { rejectWithValue }) => {
    try {
      const taskCount = await TaskService.getTaskCountForUser(userId);
      return taskCount;
    } catch (error) {
      return rejectWithValue("Error fetching task count for user");
    }
  }
);
