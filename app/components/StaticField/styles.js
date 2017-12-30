// Styles for StaticField

////////////////////////
// Import Modules
////////////////////////

import {
  StyleSheet,
  Dimensions
} from 'react-native'

let {height, width} = Dimensions.get('window');

////////////////////////
// Styles
////////////////////////

export default StyleSheet.create({

  text:{
    fontFamily: "Roboto-Light",
    color: "#929091",
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 8
  },

});



