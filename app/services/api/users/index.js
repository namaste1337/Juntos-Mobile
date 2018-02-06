///////////////////////////
// Imports
///////////////////////////

import Services from "./../";
import Common from "./../common";

///////////////////////////
// Constants
///////////////////////////

// End points
const USERS_END_POINT = "/user";

///////////////////////////
// Functions
///////////////////////////

// Handles sign up request
export function signUp(email, password, profileImageName){

	let payload = {
		email,
		password,
		profileImageName
	}

	return Services.fetchApi(USERS_END_POINT, payload, Common.POST_METHOD);

}