import {StyleSheet} from "react-native";
import {BORDER_RADIUS, COLORS, FONT_SIZE, FONTS} from "@constants/globalStyles";


const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: BORDER_RADIUS.normal,
        backgroundColor: COLORS.yellow,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    buttonText: {
        fontFamily: FONTS.sansProBold,
        fontWeight: '600',
        lineHeight: 22,
        fontSize: FONT_SIZE.large,
        color: COLORS.textTitleText,
        textAlign: 'center',
    },
});

export default styles;
