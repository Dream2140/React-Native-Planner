import React from "react";
import { TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native";
import styles from "./button.styles";

interface ButtonProps extends TouchableOpacityProps {
  containerStyle?: ViewStyle;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, containerStyle, ...restProps }) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity style={styles.buttonContainer} {...restProps} activeOpacity={0.6}>
        {children}
      </TouchableOpacity>
    </View>
  );
};

export default Button;
