////////////////////////
// Imports
////////////////////////

import {
  StyleSheet,
  Dimensions
} from 'react-native'

////////////////////////
// Constants
////////////////////////

// Device properties
const { height } = Dimensions.get("window"); // Move to common/device.js
// Primary Styles - Fonts
export const FONTS = {
  PRIMARY: "Roboto"
}
// Primary Styles - Colors
export const COLORS = {
  PRIMARY: "#FF3366",
  TRANSPARENT: "transparent",
  RGB_TRANSPARENT: "rgba(0,0,0,0)",
  MID_TRANSPARENCY: "rgba(0,0,0,0.5)",
  WHITE: "#FFFFFF",
  DARK_GREY: "#505050",
  MID_GREY: "#CCCCCC",
  LIGHT_GREY: "#8E8F8E",
  RED: "red",
  BLACK: "black"
}
// Primary Styles - Font Weights
export const FONT_WEIGHT = {
  BOLD: "500",
  REGULAR: "400",
  LIGHT: "300"
}

////////////////////////
// Styles
////////////////////////

// Activity indicator styles
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  keyboardViewWrapper: {
    height
  },
  contentWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  /////////////////////////
  //  Header Buttons
  /////////////////////////

  headerParentStyle:{
    flex: 1,
    justifyContent: "center"
  },
  headerTextButton:{
    marginRight: 15,
    fontSize: 18,
    color: COLORS.PRIMARY,
    fontWeight: FONT_WEIGHT.LIGHT
  },

  /////////////////////////
  //  Tabbar Icon
  /////////////////////////

  tabBarIcon:{
    width: 25,
    height: 25
  },

  /////////////////////////
  // Positions button to be
  // fixed to bottom of view
  /////////////////////////

  buttonFixedWrapper:{
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  buttonFixedBottom:{
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },

});
