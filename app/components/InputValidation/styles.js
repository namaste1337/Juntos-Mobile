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
    height: 49,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.MID_GREY,
    justifyContent: "flex-end",
  },
  
  inputValidationMessage: {
    textAlign: "right",
    color: COLORS.RED,
    fontFamily: FONTS.PRIMARY,
    fontSize: 13,
    paddingRight: 11
  },


});



