// This file host actions related to account authentication

////////////////////////
// Import Modules
////////////////////////

import {NavigationActions} from "react-navigation";



////////////////////////
// Action Types
////////////////////////

// Available 
export const ProjectActions = {
	POPULATE_TEMP_DESCRIPTION: "POPULATE_TEMP_DESCRIPTION",
}

////////////////////////
// Action Creators
////////////////////////

export function navigateToCreateProject(){

 return NavigationActions.navigate({routeName: "CreateProjectDescription"});

}

export function populateTempDescription(projectName, projectLocation, projectDescription){

	let data = {}
	data.projectName 		= projectName;
	data.projectLocation 	= projectLocation;
	data.projectDescription = projectDescription;
 
	return {
		type: ProjectActions.POPULATE_TEMP_DESCRIPTION,
		payload: data
	}

}

export function populateTempDetails(projectDetailsTime, projectDetails){

}

export function populateTempImage(projectImageArray){


}

export function clearTempProject(){

}