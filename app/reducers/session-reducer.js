import 
{
	ACCOUNT_SUCCESS,
	ACCOUNT_ERROR,
	ACCOUNT_PROCESSING

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
		case ACCOUNT_SUCCESS:
			return Object.assign({}, state, {
        		isLoggedIn: action.payload.isLoggedIn,
        		isFetching: action.payload.isFetching
      		});
      	case ACCOUNT_ERROR:
      		return Object.assign({}, state, {
      			isErorred: action.payload
      		});
      	case ACCOUNT_PROCESSING:
      		return Object.assign({}, state, {
      			isFetching: action.payload
      		}); 
      	default:
      		return state;
	}

}