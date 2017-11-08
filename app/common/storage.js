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

export function setLoginState(bool){

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
      return value;
	}catch(error){
    console.warn(error);
  }

}
