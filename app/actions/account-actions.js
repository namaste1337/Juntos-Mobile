// This file host actions related to account authentication

////////////////////////
// Imports
////////////////////////

import {NavigationActions} from "react-navigation";

/////////////////////////
// Import services
/////////////////////////

import {login, signUp} from "./../services/api/account";
import {imageUpload} from "./../services/api/uploads";

/////////////////////////
// Import common files
/////////////////////////

import {basicAlert} from "./../common/alerts";

////////////////////////
// Constants
////////////////////////

// Action types
export const ACCOUNT_ERROR          = "ACCOUNT_ERORR";
export const ACCOUNT_SUCCESS 		    = "ACCOUNT_SUCCESS";
export const ACCOUNT_PROCESSING 	  = "ACCOUNT_PROCESSING";
// Strings
const LOGIN_ERROR_STRING = "Account Error";
// Error request fail
const REQUEST_FAIL = "fail"; 
//Navigation
const NAVIGATE_SIGNED_IN_SCREEN = "signedIn";

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

// Helper function redirects user to protected screens
function redirectToProtected(dispatch){
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: NAVIGATE_SIGNED_IN_SCREEN})
    ]
  })
  dispatch(resetAction);
}

// Handles server call for login request
export function accountLogin(email, password){
  return (dispatch) => {
  	// Show the spinner
  	dispatch(accountProcessing(true));
  	// Begin login sequence
  	login(email, password).then(response =>{
      // Account Success
      dispatch(accountSuccess(true, true));
      redirectToProtected(dispatch);
  	})
  	.catch(error =>{ 
      dispatch(accountError(true));
  	}).then(() => {
      // Hide the activity spinner
      dispatch(accountProcessing(false));
    })
  }

};

//Handles server request for signup
export function accountSignup(email, password, profileImagePath, imageMime){
	return dispatch => {
		//show spinner 
		dispatch(accountProcessing(true));
		//Begin signup sequence
    imageUpload(profileImagePath, imageMime).then( response => {
        let profileImageName = response.data[0];
        return signUp(email, password, profileImageName);
    })
		.then(() => {
      // Account sign up success
      dispatch(accountSuccess(true, true));
      redirectToProtected(dispatch);
    })
    .catch(error => { 
      // Display any errors
      console.warn(error); 
    })
    .then(() => {
      // Hide the activity spinner
      dispatch(accountProcessing(false));
    });
	}
}



