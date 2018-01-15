import { ProjectActions } from "./../actions/project-actions"

export default function session(
	state = {
    tempProject: {},
	}, action)
{
	switch (action.type) {
		case ProjectActions.POPULATE_TEMP_DESCRIPTION:
			return Object.assign({}, state, {
            tempProject:{
        		  name: action.payload.projectName,
        		  coords: action.payload.projectCoords,
              description: action.payload.projectDescription
            }
      		});
      case ProjectActions.POPULATE_TEMP_DETAILS:
      return Object.assign({}, state, {
            tempProject:{
              startDate: action.payload.startDate,
              endDate: action.payload.endDate,
              foodProvided: action.payload.foodProvided,
              currentStatus: action.payload.currentStatus,
              projectType: action.payload.projectType
            }
          });
    default:
      return state;
	}

}