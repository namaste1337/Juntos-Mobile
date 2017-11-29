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

//Properties
const tabarBackgroundColor      = COLORS.WHITE; 
const activeTintColor           = COLORS.PRIMARY;
const inactiveTintColor         = COLORS.LIGHT_GREY;
const indicatorbackgroundColor  = COLORS.PRIMARY;

////////////////////////////
// Tabbar Navigation Options
////////////////////////////

// Hndles the tabbar
const TabbarNavigationOptions = {
	tabBarOptions:{
    style:{
      backgroundColor: tabarBackgroundColor
    },
    activeTintColor,
    inactiveTintColor,
    indicatorStyle: {backgroundColor: indicatorbackgroundColor},
	}
}

 export default TabbarNavigationOptions