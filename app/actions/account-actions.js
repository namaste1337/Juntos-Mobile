////////////////////////
// Imports
////////////////////////

import {login} from "./../services/api/account";
import {basicAlert} from "./../common/alerts";

////////////////////////
// Constants
////////////////////////

// Action types
export const ACCOUNT_LOGIN_ERROR 		= "ACCOUNT_LOGIN_ERORR";
export const ACCOUNT_LOGIN_SUCCESS 		= "ACCOUNT_LOGIN_SUCCESS";
export const ACCOUNT_LOGIN_PROCESSING 	= "ACCOUNT_LOGIN_PROCESSING";
// Strings
const LOGIN_ERROR_STRING = "Login Error";
// Error request fail
const REQUEST_FAIL = "fail"; 

////////////////////////
// Actions
////////////////////////

// Handles login error state 
function accountLoginError(bool, message="None"){

	// Show alert propting the user the type of authentication error
 	basicAlert(LOGIN_ERROR_STRING, message);

	return {
		type: ACCOUNT_LOGIN_ERROR,
		payload: bool
	}

}

// Handles login success state 
function accountLoginSuccess(isFetchingBool, isLoggedInBool){

	console.log("Session creation was successful");
	return {
		type: ACCOUNT_LOGIN_SUCCESS,
		payload: {
			isFetching: isFetchingBool,
			isLoggedIn: isLoggedInBool
		}	
	}

}

// Handles state where login is being processed
function accountLoginProcessing(bool){

	return {
		type: ACCOUNT_LOGIN_PROCESSING,
		payload: {bool}
	}

}

// Handles server call for login request
export function accountLogin(email, password){
	console.log("Attempting to log in");
    return (dispatch) => {
    	// Show the spinner
    	dispatch(accountLoginProcessing(true));
    	// Begin login sequence
    	login(email, password).then(function(response){
    		if(response.status == REQUEST_FAIL){
    			dispatch(accountLoginError(true, response.data.message));
    			throw Error(response.data.message);
    		}
    	})
    	.then(function(reponse){ 
    		// Login Success
    		dispatch(accountLoginSuccess(true, true));
    	})
    	.then(function(){
    		// Hide the spinner
    		dispatch(accountLoginProcessing(false));
    	})
    	.catch(function(error){ 
    		// Display any errors
    		console.warn(error); 
    	});
    }

};



