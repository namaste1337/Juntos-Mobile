import 
{ ProjectActions } from "../actions/account-actions"


export default function session(
	state = {
    tempProject: {},
	}, action)
{
	switch (action.type) {
		case AccountActions.POPULATE_TEMP_DESCRIPTION:
			return Object.assign({}, state, {
        		isLoggedIn: action.payload.isLoggedIn,
        		isFetching: action.payload.isFetching
      		});
      	default:
      		return state;
	}

}