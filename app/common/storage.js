// This file will host constats & functions related to async storage
//////////////////////////////
// Imports
///////////////////////////////
import {AsyncStorage} from "react-native"


//////////////////////////////
// Constants
///////////////////////////////

// This key will be utilizes to fetch and store the currect 
// user login state
export const USER_LOGIN_STATE_KEY = "@UserLoginState:key";

//////////////////////////////
// Helper Functions
///////////////////////////////

// Helper function to set the login state
export function setLoginState(bool){
  setValue(USER_LOGIN_STATE_KEY, bool);
}

// Helper function to get the login state
export function getLoginState(){
  return getValue(USER_LOGIN_STATE_KEY);
}

//////////////////////////////
// Functions
///////////////////////////////

// Handles setting a values by key to async storage
export async function setValue(key, value){

  try{
    await AsyncStorage.setItem(key, value);
  }catch(error){
    console.warn(error);
  }

}

// Handles fetching a value from async storage
export async function getValue(key){

	try {
		const value = await AsyncStorage.getItem(key);
    if(value)
      return (value == "true") ? true : false;
	}catch(error){
    console.warn(error);
  }

}
