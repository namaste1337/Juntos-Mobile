// Styles for ProjectCarousel Component

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

});



