import {TasksPriorityColor} from "@constants/TasksPriorityColor";

export interface TaskType {
    id: number;
    title: string;
    location: string;
    status: boolean;
    priority: TasksPriorityColor
}