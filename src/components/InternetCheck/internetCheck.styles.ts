import { StyleSheet } from "react-native";

import { COLORS, FONT_SIZE, FONTS } from "@constants/globalStyles";

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  messageText: {
    fontSize: FONT_SIZE.large,
    textAlign: "center",
    color: COLORS.bgLightGray,
    fontFamily: FONTS.sansProRegular
  }
});

export default styles;
