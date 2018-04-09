// Styles for ImageCard

////////////////////////
// Import Modules
////////////////////////

import {
  StyleSheet,
} from 'react-native'

import {
FONTS,
COLORS,
} from "./../../common/styles";
////////////////////////
// Styles
////////////////////////
  
export default StyleSheet.create({

  shadowViewWrapper:{
		shadowColor: "#000",
    shadowOffset: {
      height: 1
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    overflow: "visible"
	},
});



