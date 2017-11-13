import 
{ AccountActions } from "../actions/account-actions"


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
        		isFetching: action.payload.isFetching
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