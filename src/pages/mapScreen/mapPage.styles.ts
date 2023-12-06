import { Dimensions, StyleSheet } from "react-native";
import { COLORS, FONT_SIZE, FONTS } from "@constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    marginTop: -20
  },
  title: {
    fontFamily: FONTS.sansProBold,
    fontSize: FONT_SIZE.large,
    textAlign: "center",
    fontWeight: '600',
    color: COLORS.white
  }
});

export default styles;
