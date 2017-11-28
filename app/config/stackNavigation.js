// The following defines the styles and options for the header,
// also known as the navigation bar.

////////////////////////
// Import Common Files
////////////////////////

import {
  COLORS
} from "./../common/styles"

////////////////////////
// Constants
////////////////////////

//Strings
const headerMode      = "screen";
const backgroundColor = "#FFF";
const fontWeight      = "100";
const headerTintColor = COLORS.PRIMARY;

////////////////////////////
// Stack Navigation Options
////////////////////////////

// Handles the stack navigation
// options
const StackNavigatorOptions = {
 headerMode,
 navigationOptions: {
   headerTintColor, 
   headerStyle:{
   	backgroundColor
   },
   headerTitleStyle:{
   	fontWeight
   },
   headerBackTitleStyle:{
   	fontWeight
   }
 }
}

 export default StackNavigatorOptions