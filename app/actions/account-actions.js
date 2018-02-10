// This file host actions related to account authentication

////////////////////////
// Import Modules
////////////////////////

import {NavigationActions} from "react-navigation";

/////////////////////////
// Import services
/////////////////////////

import {login, ping} from "./../services/api/sessions";
import {signUp} from "./../services/api/users";
import {imageUpload} from "./../services/api/uploads";

/////////////////////////
// Import common files
/////////////////////////

import {basicAlert} from "./../common/alerts";
import {setLoginState} from "./../common/storage";

////////////////////////
// Constants
////////////////////////

//Navigation
const NAVIGATE_SIGNED_IN_SCREEN = "Root";
const NAVIGATE_SIGNED_OUT_SCREEN = "Login";

////////////////////////
// Action Types
////////////////////////

// Available account actions
export const AccountActions = {
  ACCOUNT_ERROR: "ACCOUNT_ERORR",
  ACCOUNT_SUCCESS: "ACCOUNT_SUCCESS",
  ACCOUNT_PROCESSING: "ACCOUNT_PROCESSING"
}

////////////////////////
// Action Creators
////////////////////////

// Handles account error state 
function accountError(bool){

	return {
		type: AccountActions.ACCOUNT_ERROR,
		payload: bool
	}

}

// Updates the currently logged in user data
function accountUpdateUser(user){

  return {
    type: AccountActions.ACCOUNT_SUCCESS,
    payload:{
      user
    }
  }

}

// Handles account success state 
function accountSuccess(isFetchingBool, isLoggedInBool, user){

  // Update sign in state to true 
  setLoginState("true");

	return {
		type: AccountActions.ACCOUNT_SUCCESS,
		payload: {
			isFetching: isFetchingBool,
			isLoggedIn: isLoggedInBool,
      user
		}	
	}

}

// Handles state where account is being processed
function accountProcessing(bool){

	return {
		type: AccountActions.ACCOUNT_PROCESSING,
		payload: bool
	}

}

// action redirects user to singedin portion of the app
export function redirectToSignedIn(){
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: NAVIGATE_SIGNED_IN_SCREEN})
    ]
  })
  return resetAction;
}

// Action redirects user to signedOut portion of the app
export function redirectToSignedOut(){
    const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: NAVIGATE_SIGNED_OUT_SCREEN})
    ]
  })
  return resetAction;
}

// Handles updating the login state and transition 
// the user to the logout portion of the app
export function accountLogout(){

    // Update sign in state to false 
    setLoginState("false");
    return redirectToSignedOut();
  
}

////////////////////////
// Thunks Functions
////////////////////////

// Handles server call to ping for active session
export function accountPing(){
  return (dispatch) => {
    ping().then(function(response){
      console.log(response)
      let user = response.data.local;
      dispatch(accountUpdateUser(user));
    })
  }
}

// Handles server call for login request
export function accountLogin(email, password){
  return (dispatch) => {
  	// Show the spinner
  	dispatch(accountProcessing(true));
  	// Begin login sequence
  	login(email, password).then(response =>{
      // Account Success
      let user = response.data.user.local;
      dispatch(accountSuccess(true, true, user));
      dispatch(redirectToSignedIn());
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
export function accountSignup(username, email, password, profileImagePath, imageMime){
	return dispatch => {
		//show spinner 
		dispatch(accountProcessing(true));
		//Begin signup sequence
    imageUpload(profileImagePath, imageMime).then( response => {
        let profileImageName = response.data[0];
        return signUp(username, email, password, profileImageName);
    })
		.then((response) => {
      let user = response.data.user.local;
      // Account sign up success
      dispatch(accountSuccess(true, true, user));
      dispatch(redirectToSignedIn());
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



