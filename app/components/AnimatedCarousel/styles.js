// Styles for AnimatedCarousel

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
    width: deviceProperties.width,
  },

  ///////////////////////
  // Animated Card
  ///////////////////////

  card: {
    marginTop: 10, 
    height: 150, 
    width: deviceProperties.width - 50, 
    borderRadius: 6, 
    overflow: "hidden" 
  },

});



