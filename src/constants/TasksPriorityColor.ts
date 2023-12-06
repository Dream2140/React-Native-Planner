export type TaskPriorityTypes = "low" | "regular" | "urgent";

export type TaskPriorityColorMap = {
  [priority in TaskPriorityTypes]: string;
};

export const taskPriorityColors: TaskPriorityColorMap = {
  low: "#77D4BD",
  regular: "#F8D94F",
  urgent: "#DF7E8D"
};
