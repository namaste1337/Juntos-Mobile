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
    borderBottomWidth: 1,
    borderColor: "#CCC",
    justifyContent: "flex-end",
  },
  
  inputValidationMessage: {

    textAlign: "right",
    color: "red",
    fontFamily: "Roboto-Light",
    fontSize: 13,
    paddingRight: 11

  },


});



