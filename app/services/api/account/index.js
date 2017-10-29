///////////////////////////
// Imports
///////////////////////////

import fetchApi from "./../";
import apiConfig from "./../config";

///////////////////////////
// Constants
///////////////////////////

// End points
const LOGIN_END_POINT  = "/login";
const LOGOUT_END_POINT = "/logout";



// Handles sign up request
export function signUp(email, password){

	let payload = {
		email: email,
		password: password
	}

	return fetchApi(SIGNUP_END_POINT, payload, apiConfig.POST_METHOD);

}

// Handles login request
export function login(email, password){
	
	console.log(email, password);
	
	let payload = {
		email: email,
		password: password
	}

	return fetchApi(LOGIN_END_POINT, payload, apiConfig.POST_METHOD);

}

// Handles logout request
export function logout(){

	return fetchApi(LOGOUT_END_POINT, null, apiConfig.GET_METHOD);

}