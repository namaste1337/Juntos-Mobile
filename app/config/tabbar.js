// The following defines the styles and options for the header,
// also known as the navigation bar.

////////////////////////
// Constants
////////////////////////

//Properties
const tabarBackgroundColor      = "white"; 
const activeTintColor           = "#FF3366";
const inactiveTintColor         = "#8e8f8e";
const indicatorbackgroudnColor  = "#FF3366";

// Handles the configuration of the tabbar
const tabBarConfig = {
	tabBarOptions:{
    style:{
      backgroundColor: tabarBackgroundColor
    },
    activeTintColor,
    inactiveTintColor,
    indicatorStyle: {backgroundColor: indicatorbackgroudnColor},
	}
}

 export default tabBarConfig