import React from 'react';
import {TouchableOpacity, View, Text} from "react-native";
import styles from "./tabs.styles";

interface TabsProps {
    activeTab: string;
    tabs: string[];
    onTabChange: (tab: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, tabs, onTabChange }) => {
    return (
        <View style={styles.tabsContainer}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    style={[styles.tab, activeTab === tab && styles.activeTab]}
                    onPress={() => onTabChange(tab)}
                >
                    <Text  style={[styles.tabText, activeTab === tab ? styles.activeTabText : null]}>{tab}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};