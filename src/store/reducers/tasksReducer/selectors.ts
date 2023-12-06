import { RootState } from "../../store";

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectLoading = (state: RootState) => state.tasks.loading;
export const selectError = (state: RootState) => state.tasks.error;
export const selectTaskCount = (state: RootState) => state.tasks.countOfTasks;
export const selectHasNextPage = (state: RootState) => state.tasks.hasNextPage;

export const selectActiveFilter = (state: RootState) => state.tasks.filter;
