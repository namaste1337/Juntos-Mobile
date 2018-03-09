
////////////////////////
// Import Action Constants
////////////////////////

import { AccountActions } from "./../actions/account-actions"

////////////////////////
//  Import Configs
////////////////////////

import Settings from "./../config/settings";

////////////////////////
// Helper Functions
////////////////////////

// Handles any changes that need to occure to the user object
// before sending it to the store.
function mutateUser(userObject){

  let user = userObject;
  // Append the remote location of the user
  user.profile.images[0] = Settings.IMAGE_SERVER + Settings.IMAGE_PATH + user.profile.images[0];

  return user;

}

////////////////////
//  Reducers
////////////////////

export default function session(
	state = {
    isErrored: false,
		isFetching: false,
		isLoggedIn: false,
		sessionCookie: null
	}, action)
{
	switch (action.type) {
		case AccountActions.ACCOUNT_SUCCESS:
			return Object.assign({}, state, {
        		isLoggedIn: action.payload.isLoggedIn,
        		isFetching: action.payload.isFetching,
            user: mutateUser(action.payload.user)
      		});
      	case AccountActions.ACCOUNT_ERROR:
      		return Object.assign({}, state, {
      			isErorred: action.payload
      		});
      	case AccountActions.ACCOUNT_PROCESSING:
      		return Object.assign({}, state, {
      			isFetching: action.payload
      		}); 
      	default:
      		return state;
	}

}
