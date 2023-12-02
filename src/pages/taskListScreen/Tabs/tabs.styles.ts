import {StyleSheet} from "react-native";
import {BORDER_RADIUS, COLORS, FONT_SIZE, FONTS} from "@constants/theme";


const styles = StyleSheet.create({
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 13,
    },
    tab: {
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 9,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.normal
    },
    activeTab: {
        backgroundColor: COLORS.primaryViolent,
    },
    activeTabText: {
        color: COLORS.white,
    },
    tabText: {
        color: COLORS.textTitleText,
        fontSize: FONT_SIZE.small,
        fontFamily: FONTS.sansProBold,
        fontWeight: '700'
    },
});


export default styles;