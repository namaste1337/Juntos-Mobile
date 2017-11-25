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
  PRIMARY: "Roboto-Light"
}
// Primary Styles - Colors
export const COLORS = {
  PRIMARY: "#FF3366",
  TRANSPARENT: "transparent",
  MID_TRANSPARENCY: "rgba(0,0,0,0.5)",
  WHITE: "#FFFFFF",
  DARK_GREY: "#505050",

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
    backgroundColor: '#FFF'
  },
  keyboardViewWrapper: {
    height
  },
  contentWrapper: {
    paddingHorizontal: 10,
  },

 });
