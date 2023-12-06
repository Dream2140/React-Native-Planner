
import { LocationType } from "../types/taskTypes";
import { TaskPriorityTypes } from "@constants/TasksPriorityColor";

export interface TaskModel {
  created_at: string;
  image_url: string;
  location: LocationType | null;
  title: string;
  done: boolean;
  type: TaskPriorityTypes;
  user_id: string;
  id?: string;
}
