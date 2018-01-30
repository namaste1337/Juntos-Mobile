// Styles for <Componenet_Name>

////////////////////////
// Import Modules
////////////////////////

import {
  StyleSheet,
} from 'react-native'

////////////////////////
// Import Commmon Files
////////////////////////

import {deviceProperties} from "./../../common/device";
import {
FONTS,
COLORS,
FONT_WEIGHT
} from "./../../common/styles";

////////////////////////
// Styles
////////////////////////

export default StyleSheet.create({

  /////////////////////////
  // Image
  /////////////////////////

  carouselTempImage:{
    width: deviceProperties.width,
  },

  carouselImage: {
  	width: deviceProperties.width,
  	height: 180,
  },

  /////////////////////////
  // Carousel Image Text
  /////////////////////////
  
  carouselTextView:{
    backgroundColor: COLORS.MID_TRANSPARENCY,
    padding: 5
  },

  carouselFirstLineTextWrapper:{
    flexDirection: "row",
  },

  carouselTitleText:{
    flex:2, 
    color: COLORS.WHITE,
    backgroundColor: COLORS.TRANSPARENT,
    fontFamily: FONTS.PRIMARY,
    fontWeight: FONT_WEIGHT.BOLD,
    fontSize: 20
  },
  carouselDescriptionText:{
    color: COLORS.WHITE,
    backgroundColor: COLORS.TRANSPARENT,
    fontFamily: FONTS.PRIMARY,
    fontSize: 12,
    fontWeight: FONT_WEIGHT.LIGHT
  },
  carouselDistanceText:{
    flex:1, 
    color: COLORS.WHITE,
    textAlign: "right",
    backgroundColor: COLORS.TRANSPARENT,
    fontFamily: FONTS.PRIMARY,
    fontSize: 12,
  }

});



