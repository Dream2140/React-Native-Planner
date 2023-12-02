import React from 'react';
import {SafeAreaView, StatusBar, View} from "react-native";
import styles from "./toolbar.styles";
import {COLORS} from "@constants/theme";

interface HeaderProps {
    children: React.ReactNode;

}

export const Toolbar: React.FC<HeaderProps> = ({children}) => {
    return (
        <SafeAreaView style={styles.view}>
            <View style={styles.container}>
                {children}
            </View>
        </SafeAreaView>
    );
};