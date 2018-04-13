// Styles for InputValidation

////////////////////////
// Import Modules
////////////////////////

import {
  StyleSheet,
} from 'react-native'

import {
FONTS,
COLORS,
} from "./../../common/styles";
////////////////////////
// Styles
////////////////////////
  
export default StyleSheet.create({
  
  inputValidationWrapper:{
    height: 60,
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.MID_GREY,
    justifyContent: "center",
  },
  
  inputValidationMessage: {
    textAlign: "right",
    color: COLORS.RED,
    fontFamily: FONTS.PRIMARY,
    fontSize: 13,
    paddingRight: 11
  },


});



