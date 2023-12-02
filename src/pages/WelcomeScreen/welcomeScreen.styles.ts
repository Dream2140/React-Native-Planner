import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE, FONTS } from "@constants/theme";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-around",
    backgroundColor: COLORS.primaryViolent,
    paddingHorizontal: 15
  },
  title: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xxLarge,
    fontFamily: FONTS.sansProBold,
    textAlign: "center",
    fontWeight: "700"
  },
  logo: {
    width: 140,
    height: 70,
    marginTop: 32,
    marginLeft: "auto",
    marginRight: "auto"
  },
  buttonsContainer: {
    alignItems: "center",
    paddingBottom: 15
  },
  errorMessage: {
    color: COLORS.errorTextColor,
    fontSize: FONT_SIZE.large,
    fontFamily: FONTS.sansProBold,
    textAlign: "center",
    fontWeight: "700"
  },
  logBtn: {
    height: 56,
    width: "100%"
  },
  logBtnText: {
    fontFamily: FONTS.sansProBold,
    fontWeight: "600",
    color: COLORS.textTitleText,
    fontSize: FONT_SIZE.large
  },
  authStatus: {
    marginTop: 15,
    color: "rgba(255, 255, 255, 0.50)",
    fontSize: FONT_SIZE.medium,
    textDecorationLine: "underline",
    textAlign: "center"
  },
  socialTitle:{
    fontFamily: FONTS.sansProBold,
    fontWeight: "600",
    color: COLORS.bgGray,
    fontSize: FONT_SIZE.normal,
    marginBottom: 8
  },
  errorText:{
    marginTop: 4,
    fontFamily: FONTS.sansProRegular,
    color: COLORS.errorTextColor
  }
});

export default styles;
