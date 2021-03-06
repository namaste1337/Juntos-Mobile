// Styles for ActivityIndicatorOverlay

////////////////////////
// Import Modules
////////////////////////

import {
  StyleSheet,
  Dimensions,
} from 'react-native'

////////////////////////
// Import Common Files
////////////////////////

import {
COLORS,
} from "./../../common/styles";

////////////////////////
// Styles
////////////////////////

export default StyleSheet.create({

  ////////////////////////
  // Activity Indicator
  ////////////////////////

  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: COLORS.BLACK,
    width: "100%",
    height: "100%"
  },  
 centering: {  
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
 });
