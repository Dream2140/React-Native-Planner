import { NavigatorScreenParams } from "@react-navigation/native";
import { Routes } from "./routes";

export type RootStackParamList = {
  Auth: undefined;
  Tabs: NavigatorScreenParams<TabParamList>;
  Screens: NavigatorScreenParams<ScreensParamList>;
};

export type TabParamList = {
  [Routes.TASKS_LIST]: undefined;
  [Routes.MAP]: undefined;
  [Routes.CHARTS]: undefined;
};

export type ScreensParamList = {
  [Routes.TASK]: { taskId?: string } | undefined;
};
