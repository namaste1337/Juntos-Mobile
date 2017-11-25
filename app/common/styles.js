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
export const PRIMARY_FONT_FAMILY = "Roboto-Light";
// Primary Styles - Colors
export const PRIMARY_COLOR        = "#FF3366";
export const WHITE_COLOR          = "#FFFFFF";
export const DARK_GREY_COLOR      = "#505050";
export const TRANSPARENT_COLOR    = "transparent";

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
