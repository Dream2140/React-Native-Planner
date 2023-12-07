import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE, FONTS } from "@constants/globalStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 18,
    paddingHorizontal: 15
  },
  header: {
    paddingTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 19
  },
  title: {
    color: COLORS.darkBlue,
    fontFamily: FONTS.sansProBold,
    fontWeight: "700",
    fontSize: FONT_SIZE.large
  },
  closeIcon: {
    width: 22,
    height: 22
  },
  imageContainer: {
    borderColor: COLORS.bgGray,
    borderStyle: "solid",
    borderWidth: 1
  }
});

export default styles;
