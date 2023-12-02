import React from 'react';
import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';
import styles from "./input.styles";

interface CustomInputProps extends TextInputProps {
    label?: string;
}

const Input: React.FC<CustomInputProps> = ({label, ...props}) => {
    return (
        <View style={styles.container}>
            {label && <Text style={[styles.label, styles.textStyle]}>{label}</Text>}
            <TextInput style={[styles.input, styles.textStyle]} {...props} />
        </View>
    );
};

export default Input;
