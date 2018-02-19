import { ProjectActions } from "./../actions/project-actions"

export default function session(
	state = {
    tempProject: {},
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
    default:
      return state;
	}
}



