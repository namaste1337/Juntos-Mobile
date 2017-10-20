// The following defines the styles and options for the header,
// also known as the navigation bar.

////////////////////////
// Constants
////////////////////////

//Strings
const headerMode      = "screen";
const backgroundColor = "#FFF";
const fontWeight      = "100"
const headerTintColor = "#FF3366"

// Handles the configuration of the header
const headerOptions = {
 headerMode,
 navigationOptions: {
   headerTintColor, 
   headerStyle:{
   	backgroundColor
   },
   headerTitleStyle:{
   	fontWeight
   }
 }
}

 export default headerOptions