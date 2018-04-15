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
import {deviceOS, deviceTypes} from "./../../common/device";

////////////////////////
// Styles
////////////////////////

export default StyleSheet.create({
  
  title:{
    fontFamily: FONTS.PRIMARY,
    fontWeight: FONT_WEIGHT.LIGHT,
    color: COLORS.PRIMARY,
    fontSize: 13
  },

  /////////////////////
  // Singleline input
  /////////////////////

 inputWrap: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.MID_GREY,
    marginBottom: 10
  },
  input: {
    height: deviceOS === deviceTypes.ios ? 25 : 40,
    fontSize: 17,
    fontFamily: FONTS.PRIMARY,
    fontWeight: FONT_WEIGHT.LIGHT
  },

  /////////////////////
  // Multiline input
  /////////////////////

  multilineInputSmall: {
    flex: 1,
    fontSize: 17,
    fontFamily: FONTS.PRIMARY,
    textAlignVertical: "top",
    fontWeight: FONT_WEIGHT.LIGHT
  },
   multilineInputWrapSmall: {
    minHeight: deviceOS === deviceTypes.ios ? 100 : 115,
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



