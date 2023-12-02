import React from 'react';
import {Image, SafeAreaView, View} from "react-native";
import {Text} from "react-native";
import styles from "./helloScreen.styles";

import {appLogo} from "@constants/icons";

import {CoverImg} from "@constants/icons-svg";

const HelloScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.logo}
                source={appLogo}
            />
            <Text style={styles.title}> Manage your daily activities</Text>
            <View style={styles.bottomImage}>
                <CoverImg />
            </View>
        </SafeAreaView>
    );
};

export default HelloScreen;