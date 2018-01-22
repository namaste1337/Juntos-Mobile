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
const {width, height} = Dimensions.get('window');
////////////////////////
// Styles
////////////////////////
  
export default StyleSheet.create({

	imageCardView:{
		width: (width-43)/3, 
    height: width/4}
	}

});



