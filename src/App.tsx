import Router from "./router/Router";
import { Platform, StatusBar, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@constants/theme";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';
export default function App() {
  const Application = () => (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
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
