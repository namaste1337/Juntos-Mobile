///////////////////////////
// Imports
///////////////////////////

import Services from "./../"
import Common from "./../common";

///////////////////////////
// Constants
///////////////////////////

// End points
const PROJECTS_END_POINT = "/projects";

///////////////////////////
// Functions
///////////////////////////

// Handles getting all projects
export function createProject(projectObject){

	return Services.fetchApi(PROJECTS_END_POINT, projectObject, Common.POST_METHOD);

}

// Handles getting all projects
export function getAllProjects(){

	return Services.fetchApi(PROJECTS_END_POINT, {}, Common.GET_METHOD);

}