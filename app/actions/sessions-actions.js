////////////////////////
// Imports
////////////////////////

import {login} from "./../services/api/session";
import {basicAlert} from "./../common/alerts";

////////////////////////
// Constants
////////////////////////

// Action types
export const SESSION_LOGIN_ERROR 		= "SESSION_USER_LOGIN_ERORR";
export const SESSION_LOGIN_SUCCESS 		= "SESSION_USER_LOGIN_SUCCESS";
export const SESSION_LOGIN_PROCESSING 	= "SESSION_USER_LOGIN_PROCESSING";
// Strings
const LOGIN_ERROR_STRING = "Login Error";
// Error request fail
const REQUEST_FAIL = "fail"; 

////////////////////////
// Actions
////////////////////////

// Handles login error state 
export function sessionLoginError(bool, message="None"){

	// Show alert propting the user the type of authentication error
 	basicAlert(LOGIN_ERROR_STRING, message);

	return {
		type: SESSION_LOGIN_ERROR,
		payload: bool
	}

}

// Handles login success state 
export function sessionLoginSuccess(isFetchingBool, isLoggedInBool){

	console.log("Session creation was successful");
	return {
		type: SESSION_LOGIN_SUCCESS,
		payload: {
			isFetching: isFetchingBool,
			isLoggedIn: isLoggedInBool
		}	
	}

}

// Handles state where login is being processed
export function sessionLoginProcessing(bool){

	return {
		type: SESSION_LOGIN_PROCESSING,
		payload: bool
	}

}

// Handles server call for login request
export function sessionLogin(email, password){
    console.log("Fired Session Login Action");
    console.log(email, password);
    return (dispatch) => {
    	login(email, password).then(function(response){
    		if(response.status == REQUEST_FAIL){
    			dispatch(sessionLoginError(true, response.data.message));
    			throw Error(response.data.message);
    		}
    	})
    	.then(function(reponse){ dispatch(sessionLoginSuccess(true, true))})
    	.catch(function(error){ console.warn(error); });
    }

};

