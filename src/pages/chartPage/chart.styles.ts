import { StyleSheet } from "react-native";
import { BORDER_RADIUS, COLORS, FONT_SIZE, FONTS } from "@constants/globalStyles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgGray,
    flex: 1
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginBottom: 30
  },
  btn: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 9,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.normal
  },
  activeBtn: {
    backgroundColor: COLORS.primaryViolent
  },
  btnText: {
    color: COLORS.textTitleText,
    fontSize: FONT_SIZE.small,
    fontFamily: FONTS.sansProBold,
    fontWeight: "700",
    textTransform: "capitalize"
  },
  activeBtnText: {
    color: COLORS.white
  },
  title: {
    fontFamily: FONTS.sansProBold,
    fontSize: FONT_SIZE.large,
    textAlign: "center",
    fontWeight: "600",
    color: COLORS.white
  },
  chartContainer: {
    flex: 1,
    justifyContent: "center"
  }
});

export default styles;
