////////////////////////
// Imports
////////////////////////

import {
  StyleSheet,
  Dimensions
} from 'react-native'

////////////////////////
// Constants
////////////////////////

// Device properties
const { height } = Dimensions.get("window"); // Move to common/device.js

////////////////////////
// Styles
////////////////////////

// Activity indicator styles
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardViewWrapper: {
    backgroundColor: "#FFF",
    height
  },
  contentWrapper: {
    paddingHorizontal: 10,
  },
 });
