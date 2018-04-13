// Styles for Carousel Component

////////////////////////
// Import Modules
////////////////////////

import {
  StyleSheet,
} from 'react-native'

////////////////////////
// Import Common Files
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
  // Carousel Indicator
  /////////////////////////

  carouselIndicatorWrapper:{
    flexDirection: "row",
    justifyContent: "center",
    padding: 10
  },
  carouselIndicatorActive:{
    width: 10, 
    height: 10,
    marginRight: 5,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 50,
  },
  carouselIndicatorInactive:{
    width: 10, 
    height: 10,
    marginRight: 5,
    backgroundColor: COLORS.DARK_GREY,
    borderRadius: 50
  },

  /////////////////////////
  // POSTER - Start
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
    marginLeft: -3,
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
    marginRight: 50, 
    color: COLORS.WHITE,
    textAlign: "right",
    backgroundColor: COLORS.TRANSPARENT,
    fontFamily: FONTS.PRIMARY,
    fontSize: 12,
  }

  /////////////////////////
  // POSTER - END
  /////////////////////////

});



