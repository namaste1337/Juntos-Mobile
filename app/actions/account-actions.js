////////////////////////
// Imports
////////////////////////

import {login, signUp} from "./../services/api/account";
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
function accountError(bool, message="None"){

	// Show alert propting the user the type of authentication error
 	basicAlert(LOGIN_ERROR_STRING, message);

	return {
		type: ACCOUNT_LOGIN_ERROR,
		payload: bool
	}

}

// Handles login success state 
function accountSuccess(isFetchingBool, isLoggedInBool){

	return {
		type: ACCOUNT_LOGIN_SUCCESS,
		payload: {
			isFetching: isFetchingBool,
			isLoggedIn: isLoggedInBool
		}	
	}

}

// Handles state where login is being processed
function accountProcessing(bool){

	return {
		type: ACCOUNT_LOGIN_PROCESSING,
		payload: {bool}
	}

}

// Handles server call for login request
export function accountLogin(email, password){
    return (dispatch) => {
    	// Show the spinner
    	dispatch(accountProcessing(true));
    	// Begin login sequence
    	login(email, password).then(function(response){
    		if(response.status == REQUEST_FAIL){
    			dispatch(accountError(true, response.data.message));
    			throw Error(response.data.message);
    		}
    	})
    	.then(function(reponse){ 
    		// Login Success
    		dispatch(accountSuccess(true, true));
    	})
    	.then(function(){
    		// Hide the spinner
    		dispatch(accountProcessing(false));
    	})
    	.catch(function(error){ 
    		// Display any errors
    		console.warn(error); 
    	});
    }

};

//Handles server request for signup
export function accountSignup(email, password){
	return dispatch => {
		//show spinner 
		dispatch(accountProcessing(true));
		//Begin signup sequence
		signUp(email, password).then(function(response){
			if (response.state == REQUEST_FAIL) {
				dispatch(accountError(true, response.data.message));
    			throw Error(response.data.message);
			}
		})
		.then(function(reponse){ 
    		// Login Success
    		dispatch(accountSuccess(true, true));
    	})
    	.then(function(){
    		// Hide the spinner
    		dispatch(accountProcessing(false));
    	})
    	.catch(function(error){ 
    		// Display any errors
    		console.warn(error); 
    	});
	}
}



