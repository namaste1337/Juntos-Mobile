///////////////////////////
// Imports
///////////////////////////

import Services from "./../";
import Common from "./../common";

///////////////////////////
// Constants
///////////////////////////

// End points
const USERS_END_POINT = "/users";

///////////////////////////
// Functions
///////////////////////////

// Handles sign up request
export function signUp(username, email, password, profileImageName){

	let payload = {
		username,
		email,
		password,
		profileImageName
	}

	return Services.fetchApi(USERS_END_POINT, payload, Common.POST_METHOD);

}
