////////////////////////
// Imports
////////////////////////

import {login, signUp} from "./../services/api/account";
import {imageUpload} from "./../services/api/uploads";
import {basicAlert} from "./../common/alerts";

////////////////////////
// Constants
////////////////////////

// Action types
export const ACCOUNT_ERROR          = "ACCOUNT_ERORR";
export const ACCOUNT_SUCCESS 		= "ACCOUNT_SUCCESS";
export const ACCOUNT_PROCESSING 	= "ACCOUNT_PROCESSING";
// Strings
const LOGIN_ERROR_STRING = "Account Error";
// Error request fail
const REQUEST_FAIL = "fail"; 

////////////////////////
// Actions
////////////////////////

// Handles account error state 
function accountError(bool){

	return {
		type: ACCOUNT_ERROR,
		payload: bool
	}

}

// Handles account success state 
function accountSuccess(isFetchingBool, isLoggedInBool){

	return {
		type: ACCOUNT_SUCCESS,
		payload: {
			isFetching: isFetchingBool,
			isLoggedIn: isLoggedInBool
		}	
	}

}

// Handles state where account is being processed
function accountProcessing(bool){

	return {
		type: ACCOUNT_PROCESSING,
		payload: bool
	}

}

// Handles server call for login request
export function accountLogin(email, password){
    return (dispatch) => {
    	// Show the spinner
    	dispatch(accountProcessing(true));
    	// Begin login sequence
    	login(email, password).then(function(response){
            // Account Success
            dispatch(accountSuccess(true, true));
    	})
    	.catch(function(error){ 
            dispatch(accountError(true));
    	}).then(function(){
            // Hide the activity spinner
            dispatch(accountProcessing(false));
        })
    }

};

//Handles server request for signup
export function accountSignup(email, password, profileImagePath){
	return dispatch => {
		//show spinner 
		dispatch(accountProcessing(true));
		//Begin signup sequence
		signUp(email, password).then(function(response){
            // Account sign up success
            dispatch(accountSuccess(true, true));
		})
    	.catch(function(error){ 
    		// Display any errors
    		console.warn(error); 
    	})
        .then(function(){
            // Hide the activity spinner
            dispatch(accountProcessing(false));
        });
	}
}



