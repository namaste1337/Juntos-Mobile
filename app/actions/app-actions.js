// This file host actions related to app
// at a global scale example ex. push
// notifications, service call states.


////////////////////////
// Import Modules
////////////////////////

////////////////////////
// Import Services
////////////////////////

////////////////////////
// Import Commmon Files
////////////////////////

////////////////////////
// Constants
////////////////////////

////////////////////////
// Action Types
////////////////////////

// Available app actions
const AppActions = {
	APP_IS_FETCHING: "APP_IS_FETCHING",
	APP_IS_DONE_FETCHING: "APP_IS_FETCHING"
}

////////////////////////
// Action Creatores
////////////////////////

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

////////////////////////
// Thunk Functions
////////////////////////