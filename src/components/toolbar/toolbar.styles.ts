import {StyleSheet} from "react-native";
import {BORDER_RADIUS, COLORS} from "@constants/globalStyles";


const styles = StyleSheet.create({
    container: {
        minHeight: 30,
        paddingHorizontal: 15,
        paddingBottom: 16,
        paddingTop: 8,
    },
    view:{
        backgroundColor: COLORS.primaryViolent,
        borderBottomEndRadius: BORDER_RADIUS.toolbar,
        borderBottomStartRadius: BORDER_RADIUS.toolbar,
        zIndex: 999
    }
});

export default styles;
