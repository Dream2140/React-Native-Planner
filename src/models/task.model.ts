import { TasksPriorityColor } from "@constants/TasksPriorityColor";

export interface TaskModel {
  created_at: string;
  image_url: string;
  location: boolean;
  title: string;
  done: boolean;
  type: keyof typeof TasksPriorityColor;
  user_id: string;
  id?: string;
}
