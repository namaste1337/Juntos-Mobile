// Styles for GooglePlaces

////////////////////////
// Import Common Files
////////////////////////

import {
COLORS,
} from "./../../common/styles";

// Special use case for the GooglePlaces Styles
// GooglePlaces only allows overrides of existing 
// styles.
export default styles = {
  placesSearch:{
    textInputContainer: {
      backgroundColor: COLORS.RGB_TRANSAPRENT,
      borderTopWidth: 0,
      borderBottomWidth:0,
   	},
   	textInput: {
      marginLeft: 0,
      marginRight: 0,
      height: 38,
      color: COLORS.MID_GREY,
      fontSize: 16
  	},
  }
}