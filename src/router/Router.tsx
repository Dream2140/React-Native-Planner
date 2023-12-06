import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabRouter from "./TabRouter";
import ScreensRouter from "./ScreensRouter";
import { selectUserInfo } from "@store/reducers/userSlice";
import WelcomeScreen from "../pages/WelcomeScreen/WelcomeScreen";
import { Routes } from "./routes";

const RootStack = createNativeStackNavigator();
const Router = () => {

  const isUserLoggedIn = useSelector(selectUserInfo);
  console.log(isUserLoggedIn);

  return (
    <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {isUserLoggedIn ? (
            <>
              <RootStack.Screen name="Tabs" component={TabRouter} />
              <RootStack.Screen name="Screens" component={ScreensRouter} />
            </>
          ) : (
            <RootStack.Screen name={Routes.AUTH} component={WelcomeScreen} />
          )}
        </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
