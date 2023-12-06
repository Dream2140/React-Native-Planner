import { StyleSheet } from "react-native";
import { BORDER_RADIUS, COLORS, FONT_SIZE, FONTS } from "@constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgGray


  },
  taskContainer: {
    flex: 1,
    justifyContent: "space-between"
  },
  imageContainer: {
    marginTop: 9
  },
  addPhotoBtn: {
    width: 110,
    height: 36
  },
  addPhotoText: {
    fontFamily: FONTS.sansProBold,
    fontSize: FONT_SIZE.small,
    color: COLORS.textTitleText,
    fontWeight: "700"
  },
  addPhotoContainer: {
    marginTop: -18,
    alignItems: "center"
  },
  taskTypesItem: {
    flexDirection: "row",
    borderRadius: BORDER_RADIUS.taskItem,
    backgroundColor: COLORS.white,
    height: 38,
    alignItems: "center"

  },
  typeContainer: {
    marginHorizontal: 15
  },
  typeTitle: {
    fontFamily: FONTS.sansProRegular,
    color: COLORS.textTitleText,
    fontSize: FONT_SIZE.normal,
    fontWeight: "400",
    marginBottom: 8
  },
  taskTypes: {
    gap: 8
  },
  taskTypesCheckbox: {
    width: 16,
    height: 16,
    borderColor: COLORS.bgLightGray,
    marginRight: 8
  },
  taskTypeName: {
    color: COLORS.darkBlue,
    fontFamily: FONTS.sansProBold,
    fontSize: FONT_SIZE.normal,
    fontWeight: "700",
    lineHeight: 16,
    textTransform: "capitalize"
  },
  taskTypesMark: {
    height: 26,
    width: 2,
    borderBottomRightRadius: BORDER_RADIUS.normal,
    borderTopRightRadius: BORDER_RADIUS.normal,
    marginRight: 8
  },
  taskSubmitBtn: {
    height: 56,
    marginHorizontal: 15
  },
  taskSubmitBtnText: {
    fontFamily: FONTS.sansProBold,
    fontWeight: "600",
    fontSize: FONT_SIZE.large
  },
  headerContainer: {
    flexDirection: "row",
    height: 26,
    justifyContent: "center",
    alignItems: "center"

  },
  headerTitle: {
    fontSize: FONT_SIZE.large,
    fontFamily: FONTS.sansProBold,
    fontWeight: "600",
    color: COLORS.white
  },
  arrowBack: {
    position: "absolute",
    left: 0,
    width: 24,
    height: 24,
    padding: 15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  taskNameContainer: {
    marginHorizontal: 15
  },
  taskNameTitle: {
    color: COLORS.textContent,
    fontFamily: FONTS.sansProRegular,
    fontSize: FONT_SIZE.normal,
    marginBottom: 2
  },
  taskNameInput: {
    borderColor: COLORS.bgLightGray,
    borderRadius: BORDER_RADIUS.taskItem,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    paddingTop: 16,
    paddingBottom: 15,
    paddingLeft: 12,
    paddingRight: 8,
    marginBottom: 25
  },
  locationContainer: {
    marginHorizontal: 15,
    alignContent: "center"
  },
  locationTitle: {
    color: COLORS.darkBlue,
    fontFamily: FONTS.sansProRegular,
    fontSize: FONT_SIZE.normal,
    marginVertical: 5
  },
  locationBtn: {
    width: 110,
    height: 36
  },
  locationBtnText: {
    fontFamily: FONTS.sansProBold,
    fontSize: FONT_SIZE.small,
    color: COLORS.textTitleText,
    fontWeight: "700"
  }
});

export default styles;
