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
    width: "100%",
    height: "100%",
		shadowColor: "#000",
    shadowOffset: {
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
	},
});



