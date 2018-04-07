// Styles for <Componenet_Name>

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
  
  ///////////////////////
  // Animated Carousel
  ///////////////////////

  scrollView: {
    flexDirection: "row",
    width: deviceProperties.width,
  },
  scrollPage: {
    width: deviceProperties.width,
  },

  ///////////////////////
  // Animated Card
  ///////////////////////

  animatedCard: {
    width: deviceProperties.width,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    overflow: "hidden" 
  },


});



