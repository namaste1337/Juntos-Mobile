// This file will host constants & functions 
// related to async storage

//////////////////////////////
// Imports
///////////////////////////////

import {AsyncStorage} from "react-native"

//////////////////////////////
// Constants
///////////////////////////////


// Keys

// This key will be utilizes to fetch and store the current 
// user login state
export const USER_LOGIN_STATE_KEY = "@UserLoginState:key";
export const USER_OBJECT_KEY = "@UserObject:key";

//////////////////////////////
// Helper Functions
///////////////////////////////

// Helper function to set the profile data for 
// the current logged in user
export function setUser(userObject){

  setValue(USER_OBJECT_KEY, userObject);

}

// Helper function to get the current logged 
// in user profile data
export function getUser(){

  return getValue(USER_OBJECT_KEY);

}

//////////////////////////////
// Functions
///////////////////////////////

// Handles setting a value by key to async storage
export async function setValue(key, value){

  try{
    await AsyncStorage.setItem(key, value);
  }catch(error){
    console.warn(error);
  }

}

// Handles fetching a value from async storage by key
export async function getValue(key){

	try {
		const value = await AsyncStorage.getItem(key);
    if(value){
      return value
    }
	}catch(error){
    console.warn(error);
  }

}
