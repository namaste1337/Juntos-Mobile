// Styles for List Picker

////////////////////////
// Import Modules
////////////////////////

import {
  StyleSheet,
  Dimensions
} from 'react-native'
let {height, width} = Dimensions.get('window');

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
  
  ///////////////////////
  // Background
  //////////////////////

  background: {
    flex: 1,
    backgroundColor: COLORS.MID_TRANSPARENCY
  },
  animatedView:{
    position: "absolute",
    width: width,
    left: 0,
  },

  ///////////////////////
  // Binary Tool Bar
  ///////////////////////

  toolBarWrapper:{
    flexDirection: "row",
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.MID_GREY
  },
  toolBarLeftWrapper:{
    flex: 1,
    padding: 12
  },
  toolBarCanceText:{
    fontSize: 16,
    color: COLORS.DARK_GREY
  },
  toolBarRightWrapper:{
    flex: 1,
    padding: 12,
    alignItems: "flex-end"
  },
  toolBarDoneText:{
    fontSize: 16,
    color: COLORS.PRIMARY
  },

  ///////////////////////
  // Picker
  ///////////////////////

  picker:{
    backgroundColor:"white" 
  }

  

});



