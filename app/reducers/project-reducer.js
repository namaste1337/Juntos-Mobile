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
        let newState = Object.assign(state);
        let tempProject = Object.assign(newState.tempProject,{
              startDate: action.payload.startDate,
              endDate: action.payload.endDate,
              foodProvided: action.payload.foodProvided,
              currentStatus: action.payload.currentStatus,
              projectType: action.payload.projectType
            });
        newState.tempProject = tempProject;
        return newState;
    default:
      return state;
	}

}