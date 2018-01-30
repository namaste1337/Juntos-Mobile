// This file host actions related to viewing and created a project

////////////////////////
// Import Modules
////////////////////////

import {NavigationActions} from "react-navigation";

////////////////////////
// Action Types
////////////////////////

// Available Project Navigation Action
export const ProjectActions = {
	POPULATE_TEMP_DESCRIPTION: "POPULATE_TEMP_DESCRIPTION",
	POPULATE_TEMP_DETAILS: "POPULATE_TEMP_DETAILS",
	POPULATE_TEMP_IMAGES: "POPULATE_TEMP_IMAGES"
}

////////////////////////
// Constants
////////////////////////

// Available navigation routes for create project
const PROJECT_NAVIGATION_ROUTES ={
	CREATE_PROJECT_DESCRIPTION: "CreateProjectDescription",
	CREATE_PROJECT_DETAILS: "CreateProjectDetails",
	CREATE_PROJECT_IMAGES: "CreateProjectImages"
}

////////////////////////
// Action Creators
////////////////////////

// Action handles navigating to the create project description screen.
export function navigateToCreateProject(){

 return NavigationActions.navigate({routeName: PROJECT_NAVIGATION_ROUTES.CREATE_PROJECT_DESCRIPTION});

}

// Action handles navigating to the create project details screen.
export function navigateToCreateProjectDetails(){

 return NavigationActions.navigate({routeName: PROJECT_NAVIGATION_ROUTES.CREATE_PROJECT_DETAILS});

}

// Action handles navigating to the create project images screen.
export function navigateToProjectImages(){

 return NavigationActions.navigate({routeName: PROJECT_NAVIGATION_ROUTES.CREATE_PROJECT_IMAGES});

}

// Action handles populating the temp project description to the store project.tempProject.
// This function is usually called when a new project is being created.
export function populateTempDescription(projectName, projectLocation, projectDescription){

	let data = {};
	data.projectName 		= projectName;
	data.projectLocation 	= projectLocation;
	data.projectDescription = projectDescription;
 
	return {
		type: ProjectActions.POPULATE_TEMP_DESCRIPTION,
		payload: data
	};

}

// Action handles populating the temp details to the store project.tempProject.
// This function is usually called when a new project is being created.
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
	};

}

// Action handles populating the temp image to the stpre project.tempProject.
// This function is usually called when a new project is being created.
export function populateTempImages(imageArray){

	let data = {};

	data.images = imageArray

	return{
		type: ProjectActions.POPULATE_TEMP_IMAGES,
		payload: data
	}

}

export function clearTempProject(){

}