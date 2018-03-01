

////////////////////////
// Import Constants
////////////////////////

import { ProjectActions } from "./../actions/project-actions"

////////////////////////
//  Import Configs
////////////////////////

import Settings from "./../config/settings";

/////////////////////
// Helper Functions
/////////////////////


// Handles appending the image type to the 
// project image before sending to the store
function mutateProjectData(projectData){

  console.log(projectData);

  // Add the image server path to all images in each project
  projectData.map(project => {
    console.log(project)
    project.images.map((image, index) => {
      console.log(image, index)
      project.images[index] = Settings.IMAGE_SERVER + Settings.IMAGE_PATH + image; 
      console.log( project.images[index]);
    })
  })

  console.log(projectData);

  return projectData;

} 


////////////////////
//  Reducers
////////////////////

export default function project(
	state = {
    tempProject: {},
    data: [],
	}, action)
{
	switch (action.type) {
		case ProjectActions.POPULATE_TEMP_DESCRIPTION:
			return Object.assign(state, { tempProject:{
        		  name: action.payload.projectName,
        		  location: action.payload.projectLocation,
              description: action.payload.projectDescription
            }
      		});
      case ProjectActions.POPULATE_TEMP_DETAILS:
        return (function () {
          let newState = Object.assign(state);
          let tempProject = Object.assign(newState.tempProject,{
                start_date: action.payload.startDate,
                end_date: action.payload.endDate,
                food_provided: action.payload.foodProvided,
                current_status: action.payload.currentStatus,
                type: action.payload.projectType
              });
          newState.tempProject = tempProject;
          return newState;
        })();
      case ProjectActions.POPULATE_TEMP_IMAGES: 
        return (function(){
          let newState = Object.assign(state);
          let tempProject = Object.assign(newState.tempProject,{
            images: action.payload.images
          })
          newState.tempProject = tempProject;
          return newState;
        })();
      case ProjectActions.POPULATE_PROJECTS:
        return(function(){
          state.data = mutateProjectData(action.payload.data);
          return state; 
        })()
    default:
      return state;
	}
}



