import React from "react";
import { SafeAreaView, View } from "react-native";

import styles from "./toolbar.styles";

interface HeaderProps {
  children: React.ReactNode;
}

export const Toolbar: React.FC<HeaderProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.container}>
        {children}
      </View>
    </SafeAreaView>
  );
};
