import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "./filters.styles";
import { FilterType } from "../../../types/filterType";

interface FiltersProps {
  activeTab: FilterType;
  tabs: FilterType[];
  onTabChange: (filter: FilterType) => void;
}

export const Filters: React.FC<FiltersProps> = ({ activeTab, tabs, onTabChange }) => {
  return (
    <View style={styles.tabsContainer}>
      {tabs.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[styles.tab, activeTab === filter && styles.activeTab]}
          onPress={() => onTabChange(filter)}
        >
          <Text style={[styles.tabText, activeTab === filter ? styles.activeTabText : null]}>{filter}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
