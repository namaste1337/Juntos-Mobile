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
 inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  input: {
    flex: 1,
    fontFamily: "Roboto-Light",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  multilineInputSmall: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Roboto-Light",
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: "top",
  },
   multilineInputWrapSmall: {
    flexDirection: "row",
    height: 74,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
 });



