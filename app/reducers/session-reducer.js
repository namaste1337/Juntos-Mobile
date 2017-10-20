import 
{
	SESSION_LOGIN_SUCCESS,
	SESSION_LOGIN_ERROR,
	SESSION_LOGIN_PROCESSING

} from "../actions/sessions-actions"


export default function session(
	state = {
		isFetching: false,
		isLoggedIn: false,
		sessionCookie: null
	}, action)
{
	switch (action.type) {
		case SESSION_LOGIN_SUCCESS:
			return Object.assign({}, state, {
        		isLoggedIn: action.payload.isLoggedIn,
        		isFetching: action.payload.isFetching
      		});
      	case SESSION_LOGIN_ERROR:
      		console.log("Fired sessions error reducer", action.payload);
      		return Object.assign({}, state, {
      			isFetching: action.payload.isFetching,
      			isErorred: action.payload.isErorred
      		});
      	case SESSION_LOGIN_PROCESSING:
      		return Object.assign({}, state, {
      			isFetching: action.payload
      		}); 
      	default:
      		return state;
	}

}