// The following defines the styles and options for the header,
// also known as the navigation bar.

////////////////////////
// Constants
////////////////////////

//Strings
const headerMode      = "screen";
const backgroundColor = "#FFF";
const fontWeight      = "100";
const headerTintColor = "#FF3366";

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