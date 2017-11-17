// Styles for ActivityIndicatorOverlay

////////////////////////
// Import Modules
////////////////////////

import {
  StyleSheet,
  Dimensions,
} from 'react-native'

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
    backgroundColor: 'black',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },  
 centering: {  
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
 });
