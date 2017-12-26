// Styles for InputValidation

////////////////////////
// Import Modules
////////////////////////

import {
  StyleSheet,
} from 'react-native'

////////////////////////
// Styles
////////////////////////
  
export default StyleSheet.create({
  
  inputValidationWrapper:{
    height: 49,
    marginVertical: 10,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderColor: "#CCC",
    justifyContent: "center"
  },
  
  inputValidationMessage: {
    flex: 1,
    alignItems: "flex-end",
    textAlign: "right",
    color: "red",
    fontFamily: "Roboto-Light",
    fontSize: 13,
    paddingRight: 11

  },


});



