import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TaskPage } from "../pages/taskScreen";
import { Routes } from "./routes";

const Stack = createNativeStackNavigator();

const ScreensRouter = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.TASK} component={TaskPage} />
    </Stack.Navigator>
  );
};

export default ScreensRouter;
