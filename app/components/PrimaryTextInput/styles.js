// Styles for PrimaryTextInput

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
  
  /////////////////////
  // Singleline input
  /////////////////////

 inputWrap: {
    marginVertical: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.MID_GREY
  },
  input: {
    flex: 1,
    height: 100,
    fontFamily: FONTS.PRIMARY,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  /////////////////////
  // Multiline input
  /////////////////////

  multilineInputSmall: {
    flex: 1,
    fontSize: 15,
    fontFamily: FONTS.PRIMARY,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: "top",
  },
   multilineInputWrapSmall: {
    height: 74,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.MID_GREY,
  },

  /////////////////////
  // Footer
  /////////////////////

  footer:{
    flexDirection: "row",
  },
  multilineCounter:{
    color: COLORS.MID_GREY,
    paddingLeft: 11,
    fontFamily: FONTS.PRIMARY
  },
  inputValidationMessage: {
    flex: 1,
    alignItems: "flex-end",
    textAlign: "right",
    color: COLORS.RED,
    fontFamily: FONTS.PRIMARY,
    fontSize: 13,
    paddingRight: 11

  },


 });



