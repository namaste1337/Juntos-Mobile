// Styles for StaticField

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
    paddingHorizontal: 3,
    fontSize: 13,
  },

  text:{
    fontFamily: FONTS.PRIMARY,
    fontWeight: FONT_WEIGHT.LIGHT,
    color: COLORS.BLACK,
    paddingVertical: 10,
    fontSize: 17
  },

  placeHolderText:{
    fontFamily: FONTS.PRIMARY,
    color: COLORS.MID_GREY,
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 5
  },

});



