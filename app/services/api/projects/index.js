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

export default {

	// Handles getting all projects
	createProject: function(projectObject){

		return Services.fetchApi(PROJECTS_END_POINT, projectObject, Common.POST_METHOD);

	},

	// Handles getting all projects
	getAllProjects: function(){

	return Services.fetchApi(PROJECTS_END_POINT, {}, Common.GET_METHOD);

	},

	// Handles getting project by location
	getProjectsByLocation: function(lat, lng, radius, limit){

		let query = "?geo=true&lat="+lat+"&lng="+lng+"&radius="+radius+"&limit="+limit;

		return Services.fetchApi(PROJECTS_END_POINT+query, {}, Common.GET_METHOD);

	}

}