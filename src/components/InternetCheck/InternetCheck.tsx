import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import NetInfo from "@react-native-community/netinfo";

import styles from "./internetCheck.styles";

interface InternetCheckProps {
  children: React.ReactNode;
}

// @TODO add feature, if internet connection appear again, it should load app. Mb reload button
const InternetCheck: React.FC<InternetCheckProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected as boolean);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {isConnected ? (
        children
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            No internet connection. Please check your network settings.
          </Text>
        </View>
      )}
    </>
  );
};

export default InternetCheck;
