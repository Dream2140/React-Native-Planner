import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Routes } from "./routes";
import {
  BarGenerate,
  BarGenerateActive,
  BarMap,
  BarMapActive,
  BarMyTasks,
  BarMyTasksActive
} from "@constants/icons-svg";
import { COLORS } from "@constants/theme";
import { TaskListScreen } from "../pages/taskListScreen";
import MapPage from "../pages/mapScreen/MapPage";
import { Chart } from "../pages/Chart";

const Tab = createBottomTabNavigator();

const TabRouter = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: COLORS.primaryViolent }}
    >
      <Tab.Screen
        name={Routes.TASKS_LIST}
        component={TaskListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? <BarMyTasksActive /> : <BarMyTasks />
          )
        }}
      />
      <Tab.Screen
        name={Routes.MAP}
        component={MapPage}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? <BarMapActive /> : <BarMap />
          )
        }}
      />
      <Tab.Screen
        name={Routes.CHARTS}
        component={Chart}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? <BarGenerateActive /> : <BarGenerate />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRouter;
