// This file host actions related to viewing, 
// updating and createing a project
////////////////////////
// Import Modules
////////////////////////

import {NavigationActions} from "react-navigation";

/////////////////////////
// Import services
/////////////////////////

import {createProject, getAllProjects} from "./../services/api/projects";
import {imageUpload} from "./../services/api/uploads";

////////////////////////
// Action Types
////////////////////////

// Available Project Navigation Action
export const ProjectActions = {
	POPULATE_TEMP_DESCRIPTION: "POPULATE_TEMP_DESCRIPTION",
	POPULATE_TEMP_DETAILS: "POPULATE_TEMP_DETAILS",
	POPULATE_TEMP_IMAGES: "POPULATE_TEMP_IMAGES",
	POPULATE_PROJECTS: "PopulateProjects"
}

////////////////////////
// Constants
////////////////////////

// Available navigation routes for create project
const PROJECT_NAVIGATION_ROUTES ={
	CREATE_PROJECT_DESCRIPTION: "CreateProjectDescription",
	CREATE_PROJECT_DETAILS: "CreateProjectDetails",
	CREATE_PROJECT_IMAGES: "CreateProjectImages",
	CREATE_PROJECT_PREVIEW: "CreateProjectPreview"
}


////////////////////////
// Constants
////////////////////////

// String
const ROOT_STRING             = "Root";
// Numbers
const ROOT_VIEW_INDEX_NUMBER  = 0;

////////////////////////
// Action Creators
////////////////////////

// Action handles navigating to the create project description screen.
export function navigateToCreateProjectDescription(){

 return NavigationActions.navigate({routeName: PROJECT_NAVIGATION_ROUTES.CREATE_PROJECT_DESCRIPTION});

}

// Action handles navigating to the create project details screen.
export function navigateToCreateProjectDetails(){

 return NavigationActions.navigate({routeName: PROJECT_NAVIGATION_ROUTES.CREATE_PROJECT_DETAILS});

}

// Action handles navigating to the create project images screen.
export function navigateToCreateProjectImages(){

 return NavigationActions.navigate({routeName: PROJECT_NAVIGATION_ROUTES.CREATE_PROJECT_IMAGES});

}

// Action handles navigating to the create project preivew screen.
export function navigateToCreateProjectPreview(){

 return NavigationActions.navigate({routeName: PROJECT_NAVIGATION_ROUTES.CREATE_PROJECT_PREVIEW});

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

// Handles reseting the navigation back to 
// the root view once a project is saved
export function resetProjectNavigation(){

 return NavigationActions.reset({
    index: ROOT_VIEW_INDEX_NUMBER,
    actions: [
      NavigationActions.navigate({ routeName: ROOT_STRING})
    ]
  });

}

// Handles populating the store project data evelope
function populateProjectsData(projects){

	return {
		type: ProjectActions.POPULATE_PROJECTS,
		payload: projects
	};

}

////////////////////////
// Thunks Functions
////////////////////////

// Handles request to fetch all projects
export function getProjects(){

	return dispatch => {

		getAllProjects().then(projects => {
			dispatch(populateProjectsData(projects));
		}).catch(error => {
			console.error(error);
		});

	}

}

// Handles creating a new project 
export function createNewProject(projectObject){

	let images = projectObject.images;

	return dispatch => {
   // Upload the images first
	 imageUpload(images).then( response => {
        let imagesArray = response.data
        projectObject.images = imagesArray;
        return createProject(projectObject);
      }).then(response => {
      	// Segue back to the root screen
        console.log(response);
    }).catch(error => {
       console.log(error);
    })
  }

}



