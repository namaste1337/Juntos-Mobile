// Styles for PrimaryTextInput

////////////////////////
// Import Modules
////////////////////////

import {
  StyleSheet,
} from 'react-native'

////////////////////////
// Import Common Files
////////////////////////

import {
  COLORS,
  FONTS
} from "./../../common/styles"

////////////////////////
// Styles
//////////////////////// 

export default StyleSheet.create({

  ////////////////////////
  // Button Styles
  //////////////////////// 

  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontFamily: FONTS.PRIMARY
  }
});