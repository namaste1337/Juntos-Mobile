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
} from "./../../common/styles";


////////////////////////
// Styles
////////////////////////

export default StyleSheet.create({

  text:{
    fontFamily: FONTS.PRIMARY,
    color: COLORS.BLACK
  },

  placeHolderText:{
    fontFamily: FONTS.PRIMARY,
    color: COLORS.MID_GREY,
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 8
  },

});



