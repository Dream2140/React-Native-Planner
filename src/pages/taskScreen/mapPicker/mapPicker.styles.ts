import { StyleSheet } from "react-native";

import { COLORS, FONT_SIZE, FONTS } from "@constants/globalStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  messageContainer: {
    padding: 10,
    backgroundColor: COLORS.yellow
  },
  messageText: {
    color: COLORS.textTitleText,
    fontFamily: FONTS.sansProRegular,
    fontSize: FONT_SIZE.large
  }
});

export default styles;
