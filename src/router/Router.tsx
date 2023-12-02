import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabRouter from "./TabRouter";
import ScreensRouter from "./ScreensRouter";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const RootStack = createNativeStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Tabs" component={TabRouter} />
        <RootStack.Screen name="Screens" component={ScreensRouter} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
