// Styles for DatePicker

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
  
  ///////////////////////
  // Date Picker
  ///////////////////////
  datePickerWrapper:{
    backgroundColor: "#FFF",
    position: "absolute",
    top: 400,
    right: 0,
    left: 0,
    // overflow: "visible",
    // bottom: 0,
  }

});



