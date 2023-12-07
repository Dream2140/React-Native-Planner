import { Provider } from "react-redux";
import FlashMessage from "react-native-flash-message";
import { Platform, StatusBar, View } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import InternetCheck from "@components/InternetCheck/InternetCheck";
import { persistor, store } from "@store/store";
import { COLORS } from "@constants/globalStyles";
import Router from "./router/Router";

export default function App() {
  const Application = () => (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <InternetCheck>
        <BottomSheetModalProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Router />
              <FlashMessage position="top" />
            </PersistGate>
          </Provider>
        </BottomSheetModalProvider>
      </InternetCheck>
    </GestureHandlerRootView>
  );

  if (Platform.OS == "ios") {

    return (
      <View style={{
        backgroundColor: COLORS.primaryViolent,
        height: 100,
        flex: 1
      }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Application />
        </SafeAreaView>
      </View>);
  } else {
    StatusBar.setBackgroundColor(COLORS.primaryViolent, true);
    return (
      <SafeAreaProvider>
        <Application />
      </SafeAreaProvider>);
  }
}
