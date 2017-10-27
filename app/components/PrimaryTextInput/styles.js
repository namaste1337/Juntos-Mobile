////////////////////////
// Imports
////////////////////////

import {
  StyleSheet,
} from 'react-native'

////////////////////////
// Styles
////////////////////////

// Activity indicator styles
export default StyleSheet.create({
  
  /////////////////////
  // Singleline input
  /////////////////////

 inputWrap: {
    marginVertical: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  input: {
    flex: 1,
    height: 100,
    fontFamily: "Roboto-Light",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  /////////////////////
  // Multiline input
  /////////////////////

  multilineInputSmall: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Roboto-Light",
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: "top",
  },
   multilineInputWrapSmall: {
    height: 74,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },

  /////////////////////
  // Footer
  /////////////////////

  footer:{
    flexDirection: "row",
  },
  multilineCounter:{
    color: "#ccc",
    paddingLeft: 11,
    fontFamily: 'Roboto-Light'
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



