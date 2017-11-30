///////////////////////////
// Imports
///////////////////////////

import Services from "./../";
import Common from "./../common";

///////////////////////////
// Constants
///////////////////////////

// End points
const SESSIONS_END_POINT = "/session";

///////////////////////////
// Functions
///////////////////////////

// Handles login request
export function login(email, password){
	
	console.log(email, password);
	
	let payload = {
		email: email,
		password: password
	}

	return Services.fetchApi(SESSIONS_END_POINT, payload, Common.POST_METHOD);

}

// Handles logout request
export function logout(){

	return Services.fetchApi(SESSIONS_END_POINT, null, Common.DELETE_METHOD);

}