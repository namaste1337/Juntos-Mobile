// This file host actions related to session state.

////////////////////////
// Import Modules
////////////////////////

import {NavigationActions} from "react-navigation";

/////////////////////////
// Import services
/////////////////////////

import {login, logout} from "./../services/api/sessions";
import {signUp} from "./../services/api/users";
import {imageUpload} from "./../services/api/uploads";

/////////////////////////
// Import common files
/////////////////////////

import {basicAlert} from "./../common/alerts";
import {setLoginState, setUser} from "./../common/storage";

////////////////////////
// Constants
////////////////////////

//Navigation
const NAVIGATE_SIGNED_IN_SCREEN = "Root";
const NAVIGATE_SIGNED_OUT_SCREEN = "Login";

////////////////////////
// Action Types
////////////////////////

// Available account actions.
export const AccountActions = {
  ACCOUNT_ERROR: "ACCOUNT_ERORR",
  ACCOUNT_SUCCESS: "ACCOUNT_SUCCESS",
  ACCOUNT_PROCESSING: "ACCOUNT_PROCESSING"
}

////////////////////////
// Action Creators
////////////////////////

// Action handles account error state. 
function accountError(bool){

	return {
		type: AccountActions.ACCOUNT_ERROR,
		payload: bool
	}

}

// Action handles account success state. 
function accountSuccess(isFetchingBool, user){
  
  // Set the user profile data
  setUser(JSON.stringify(user));

	return {
		type: AccountActions.ACCOUNT_SUCCESS,
		payload: {
			isFetching: isFetchingBool,
      user
		}	
	}

}

// Action handles account pocessing state.
function accountProcessing(bool){

	return {
		type: AccountActions.ACCOUNT_PROCESSING,
		payload: bool
	}

}

// Action handles updates user data state.
export function accountUpdateUser(user){

  return {
    type: AccountActions.ACCOUNT_SUCCESS,
    payload:{
      user
    }
  }

}

// Action handles redirects user to singed in portion of the app.
export function redirectToSignedIn(){

  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: NAVIGATE_SIGNED_IN_SCREEN})
    ]
  })
  return resetAction;

}

// Action handles redirects user to signed out portion of the app.
export function redirectToSignedOut(){

    const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: NAVIGATE_SIGNED_OUT_SCREEN})
    ]
  })
  return resetAction;

}

// Action handles updating the login state and transitioning 
// the user to the logged out portion of the app.
export function accountLogout(){

    // Remove the user profile information
    // And send a log out request to the server.
    setUser("");
    logout();
    return redirectToSignedOut();
  
}

////////////////////////
// Thunks Functions
////////////////////////

// Action handles server login request.
export function accountLogin(email, password){

  return (dispatch) => {
  	// Show the spinner
  	dispatch(accountProcessing(true));
  	// Begin login sequence
  	login(email, password).then(response =>{
      // Account Success
      let user = response.data.user.local;
      dispatch(accountSuccess(true, user));
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

// Action handles server sign up request.
export function accountSignup(username, email, password, profileImagePath, imageMime){

	return dispatch => {
		// Show spinner 
		dispatch(accountProcessing(true));
    // Image upload expects and array
    let imageArray = [];
    imageArray.push({
      uri: profileImagePath,
      mimeType: imageMime
    }) 
    imageUpload(imageArray).then( response => {
        let profileImageName = response.data[0];
        return signUp(username, email, password, profileImageName);
    })
		.then((response) => {
      let user = response.data.user.local;
      // Account sign up success
      dispatch(accountSuccess(true, user));
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



