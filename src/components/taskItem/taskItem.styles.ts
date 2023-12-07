import {StyleSheet} from "react-native";
import {BORDER_RADIUS, COLORS, FONT_SIZE, FONTS} from "@constants/globalStyles";


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.taskItem,
        paddingVertical: 6,
        paddingRight: 6,
        marginBottom: 6
    },
    leftControls: {
        flexDirection: 'row',
        width: 34,
        gap: 8,
        marginRight: 8
    },
    marker: {
        height: 26,
        width: 2,
        borderBottomRightRadius: BORDER_RADIUS.normal,
        borderTopRightRadius: BORDER_RADIUS.normal,
        marginTop: 6,
    },
    checkBoxContainer: {
        marginTop: 11
    },
    checkbox:{
        width: 16,
        height: 16,
        borderColor: COLORS.lightGrey
    },
    itemInfoContainer: {
        gap: 4,
        flex:1
    },
    itemTitle: {
        fontFamily: FONTS.sansProBold,
        fontWeight: '700',
        fontSize: FONT_SIZE.normal,
        color: COLORS.darkBlue,
    },
    location: {
        color: COLORS.darkGrey,
        fontFamily: FONTS.sansProRegular,
        fontSize: FONT_SIZE.small,
        fontWeight: '400',
        flexDirection:'row',
        alignContent:'center',
    },
    controlsContainer: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        gap: 16
    },
    controlItem: {
        padding: 8,
        borderRadius: 50,
        backgroundColor: COLORS.bgGray,
    }
});

export default styles;
