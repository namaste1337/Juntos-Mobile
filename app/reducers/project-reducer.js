import { ProjectActions } from "./../actions/project-actions"

export default function session(
	state = {
    tempProject: {},
	}, action)
{
	switch (action.type) {
		case ProjectActions.POPULATE_TEMP_DESCRIPTION:
			return Object.assign({}, state, {
        		projectName: action.payload.projectName,
        		projectCoords: action.payload.projectCoords,
            projectDescription: action.payload.projectDescription
      		});
    default:
      return state;
	}

}