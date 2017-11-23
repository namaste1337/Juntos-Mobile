// Styles for Pager Component

////////////////////////
// Import Modules
////////////////////////

import {
  StyleSheet,
} from 'react-native'

////////////////////////
// Import Common Files
////////////////////////

import {deviceProperties} from "./../../common/device";

////////////////////////
// Styles
////////////////////////

export default StyleSheet.create({

  pageIndicatorWrapper:{
    flexDirection: "row",
    justifyContent: "center",
    padding: 10
  },
  pageIndicatorActive:{
    width: 10, 
    height: 10,
    marginRight: 5,
    backgroundColor: "#FF3366",
    borderRadius: 50,
  },
  pageIndicatorInactive:{
    width: 10, 
    height: 10,
    marginRight: 5,
    backgroundColor: "#505050",
    borderRadius: 50
  },
  pagerImage: {
  	width: deviceProperties.width,
  	height: 180,
  }
});



