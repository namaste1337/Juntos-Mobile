export const APP_IS_FETCHING 			= "APP_IS_FETCHING";
export const APP_IS_DONE_FETCHING 		= "APP_IS_DONE_FETCHING";

export function appIsFetching(bool){

	console.log("Session has errored");
	return {
		type: SESSION_LOGIN_ERROR,
		payload: bool
	}

}

export function appDoneFetching(bool){

	console.log("Session has errored");
	return {
		type: SESSION_LOGIN_ERROR,
		payload: bool
	}

}