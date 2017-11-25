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
import {
PRIMARY_FONT_FAMILY, 
WHITE_COLOR,
PRIMARY_COLOR,
DARK_GREY_COLOR,
TRANSPARENT_COLOR
} from "./../../common/styles";

////////////////////////
// Styles
////////////////////////

export default StyleSheet.create({

  /////////////////////////
  // Page Indicator
  /////////////////////////

  pageIndicatorWrapper:{
    flexDirection: "row",
    justifyContent: "center",
    padding: 10
  },
  pageIndicatorActive:{
    width: 10, 
    height: 10,
    marginRight: 5,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 50,
  },
  pageIndicatorInactive:{
    width: 10, 
    height: 10,
    marginRight: 5,
    backgroundColor: DARK_GREY_COLOR,
    borderRadius: 50
  },

  /////////////////////////
  // Image
  /////////////////////////

  pagerImage: {
  	width: deviceProperties.width,
  	height: 180,
  },

  /////////////////////////
  // Image Text
  /////////////////////////
  
  pagerTextView:{
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5
  },

  pagerFirstLineTextWrapper:{
    flexDirection: "row",
  },

  pagerTitleText:{
    flex:2, 
    color: WHITE_COLOR,
    backgroundColor: TRANSPARENT_COLOR,
    fontFamily: PRIMARY_FONT_FAMILY,
    fontWeight: "500",
    fontSize: 20
  },
  pagerDescriptionText:{
    color: WHITE_COLOR,
    backgroundColor: TRANSPARENT_COLOR,
    fontFamily: PRIMARY_FONT_FAMILY,
    fontSize:12,
    fontWeight: "300"
  },
  pagerDistanceText:{
    flex:1, 
    color: WHITE_COLOR,
    textAlign: "right",
    backgroundColor: TRANSPARENT_COLOR,
    fontFamily: PRIMARY_FONT_FAMILY,
    fontSize: 12,
  }
});



