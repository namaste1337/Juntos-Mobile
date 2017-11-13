// This file will host helper functions that will
// validate strings

////////////////////////
// Import Modules
////////////////////////

////////////////////////
// Constants
////////////////////////

////////////////////////
// Helper Functions
////////////////////////

////////////////////////
// Functions
////////////////////////

// Handles email validation, return true if email is valid
// false if the email is invalid
export function validateEmail(email){
	
  var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);

}