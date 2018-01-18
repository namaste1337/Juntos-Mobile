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
	POPULATE_TEMP_DETAILS: "POPULATE_TEMP_DETAILS",
}

////////////////////////
// Action Creators
////////////////////////

export function navigateToCreateProject(){

	 // return NavigationActions.navigate({routeName: "CreateProjectDetails"});
 return NavigationActions.navigate({routeName: "CreateProjectDescription"});

}

export function navigateToProjectDetails(){

 return NavigationActions.navigate({routeName: "CreateProjectDetails"});

}

export function navigateToProjectImages(){

 return NavigationActions.navigate({routeName: "CreateProjectImages"});

}

export function populateTempDescription(projectName, projectLocation, projectDescription){
	
	let data = {};
	data.projectName 		= projectName;
	data.projectLocation 	= projectLocation;
	data.projectDescription = projectDescription;
 
	return {
		type: ProjectActions.POPULATE_TEMP_DESCRIPTION,
		payload: data
	}

}

export function populateTempDetails(startDate, endDate, foodProvided, currentStatus, projectType){
	
	let data = {};

	data.startDate 		= startDate;
	data.endDate 		= endDate;
	data.foodProvided 	= foodProvided;
	data.currentStatus 	= currentStatus;
	data.projectType 	= projectType;

	return {
		type: ProjectActions.POPULATE_TEMP_DETAILS,
		payload: data
	}

}

export function populateTempImage(projectImageArray){


}

export function clearTempProject(){

}