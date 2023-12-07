import moment from "moment/moment";

import { TaskModel } from "@models/task.model";

export interface ChartRenderDataType {
  data: number[];
  label: string[];
}

export const convertTaskListDataToChart = (tasks: TaskModel[], type: string): ChartRenderDataType => {
  const result: ChartRenderDataType = { data: [], label: [] };

  if (type === "year") {
    const months: string[] = moment.monthsShort();

    result.label = months;

    for (let i = 0; i < 12; i++) {
      const tasksInMonth = tasks.filter(task => {
        const date = moment(task.completed_at);
        return date.month() === i;
      });

      result.data.push(tasksInMonth.length);
    }
  } else if (type === "month") {
    const daysInMonth = moment().daysInMonth();

    result.label = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

    for (let i = 0; i < daysInMonth; i++) {
      const tasksInDay = tasks.filter(task => {
        const date = moment(task.completed_at);
        return date.date() === i + 1;
      });

      result.data.push(tasksInDay.length);
    }
  } else if (type === "week") {
    const daysOfWeek: string[] = moment.weekdaysShort();

    result.label = daysOfWeek;

    for (let i = 0; i < 7; i++) {
      const tasksInDayOfWeek = tasks.filter(task => {
        const date = moment(task.completed_at);
        return date.day() === i;
      });

      result.data.push(tasksInDayOfWeek.length);
    }
  }

  return result;
};
