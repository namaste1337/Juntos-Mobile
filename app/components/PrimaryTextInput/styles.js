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
FONT_WEIGHT
} from "./../../common/styles";

////////////////////////
// Styles
////////////////////////

export default StyleSheet.create({
  
  title:{
    fontFamily: FONTS.PRIMARY,
    fontWeight: FONT_WEIGHT.LIGHT,
    color: COLORS.PRIMARY,
    paddingHorizontal: 0,
    fontSize: 13
  },

  /////////////////////
  // Singleline input
  /////////////////////

 inputWrap: {
    height: 60,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.MID_GREY,
    paddingTop: 10
  },
  input: {
    flex: 1,
    height: 100,
    fontSize: 17,
    fontFamily: FONTS.PRIMARY,
    paddingHorizontal: 0,
    fontWeight: FONT_WEIGHT.LIGHT
  },

  /////////////////////
  // Multiline input
  /////////////////////

  multilineInputSmall: {
    flex: 1,
    fontSize: 17,
    fontFamily: FONTS.PRIMARY,
    paddingHorizontal: 0,
    paddingVertical: 10,
    textAlignVertical: "top",
    fontWeight: FONT_WEIGHT.LIGHT
  },
   multilineInputWrapSmall: {
    paddingTop: 10,
    minHeight: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    paddingLeft: 0,
    fontFamily: FONTS.PRIMARY,
    fontWeight: FONT_WEIGHT.LIGHT
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



