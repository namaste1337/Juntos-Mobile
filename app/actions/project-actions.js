// This file host actions related to account authentication

////////////////////////
// Import Modules
////////////////////////

import {NavigationActions} from "react-navigation";

////////////////////////
// Action Creators
////////////////////////

export function navigateToCreateProject(){

 return NavigationActions.navigate({routeName: "CreateProjectDescription"});

}