import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE, FONTS } from "@constants/globalStyles";


const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgGray,
    flex: 1
  },
  button: {
    width: 100,
    height: 36
  },
  buttonText: {
    fontSize: FONT_SIZE.small,
    color: COLORS.textTitleText,
    fontFamily: FONTS.sansProBold,
    fontWeight: "700"
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  headerBottom: {},
  helloText: {
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: FONT_SIZE.normal,
    fontFamily: FONTS.sansProRegular,
    fontWeight: "400",
    marginTop: 8

  },
  titleText: {
    fontSize: FONT_SIZE.xLarge,
    color: COLORS.white,
    fontFamily: FONTS.sansProBold,
    fontWeight: "700"
  },
  tabsContainer: {
    paddingHorizontal: 16,
    marginTop: 12
  },
  taskListContainer: {
    paddingHorizontal: 16,
    flex: 1,
    marginBottom: 30
  },
  taskListTitle: {
    color: COLORS.darkGrey,
    fontSize: FONT_SIZE.normal,
    fontFamily: FONTS.sansProRegular,
    fontWeight: "400",
    marginBottom: 12
  },
  swipeContainer: {
    flex: 1
  }
});

export default styles;
