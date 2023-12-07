import { StyleSheet } from "react-native";
import {COLORS, FONT_SIZE, FONTS} from "@constants/globalStyles";

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'space-between',
        backgroundColor: COLORS.primaryViolent
    },
    title: {
        color: COLORS.white,
        fontSize: FONT_SIZE.xxLarge,
        fontFamily: FONTS.sansProBold,
        textAlign: 'center',
        fontWeight: '700'
    },
    logo: {
        width: 140,
        height: 70,
        marginTop: 32,
        marginLeft:'auto',
        marginRight: 'auto'
    },
    bottomImage: {
        width: '100%',
        alignItems: 'flex-end'
    }
});

export default styles;
