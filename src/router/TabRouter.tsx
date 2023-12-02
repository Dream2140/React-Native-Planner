import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TABS_ROUTES } from "./routes";
import {
  BarGenerate,
  BarGenerateActive,
  BarMap,
  BarMapActive,
  BarMyTasks,
  BarMyTasksActive
} from "@constants/icons-svg";
import { COLORS } from "@constants/theme";

const Tab = createBottomTabNavigator();
const TabRouter = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: COLORS.primaryViolent }}
    >
      <Tab.Screen
        name={TABS_ROUTES.tasks.name}
        component={TABS_ROUTES.tasks.component}
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? <BarMyTasksActive /> : <BarMyTasks />
          )
        }}
      />
      <Tab.Screen
        name={TABS_ROUTES.map.name}
        component={TABS_ROUTES.map.component}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            focused ? <BarMapActive /> : <BarMap />
          )
        }}
      />
      <Tab.Screen
        name={TABS_ROUTES.generator.name}
        component={TABS_ROUTES.generator.component}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            focused ? <BarGenerateActive /> : <BarGenerate />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRouter;
