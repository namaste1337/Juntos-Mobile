import 
{
	ACCOUNT_LOGIN_SUCCESS,
	ACCOUNT_LOGIN_ERROR,
	ACCOUNT_LOGIN_PROCESSING

} from "../actions/account-actions"


export default function session(
	state = {
    isErrored: false,
		isFetching: false,
		isLoggedIn: false,
		sessionCookie: null
	}, action)
{
	switch (action.type) {
		case ACCOUNT_LOGIN_SUCCESS:
			return Object.assign({}, state, {
        		isLoggedIn: action.payload.isLoggedIn,
        		isFetching: action.payload.isFetching
      		});
      	case ACCOUNT_LOGIN_ERROR:
      		return Object.assign({}, state, {
      			isFetching: action.payload.isFetching,
      			isErorred: action.payload.isErorred
      		});
      	case ACCOUNT_LOGIN_PROCESSING:
      		return Object.assign({}, state, {
      			isFetching: action.payload
      		}); 
      	default:
      		return state;
	}

}