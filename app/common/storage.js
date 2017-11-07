//////////////////////////////
// Imports
///////////////////////////////
import {AsyncStorage} from "react-native"


//////////////////////////////
// Constants
///////////////////////////////

// This file will host constats & functions related to async storage

// This key will be utilizes to fetch and store the currect 
// user login state
export const USER_LOGIN_STATE_KEY = "@UserLginState:key";

//////////////////////////////
// Functions
///////////////////////////////

// Handles setting a values by key to async storage
export default function setValue(key, value){

  try{
    await AsyncStorage.setItem(key, value);
  }catch(error){
    console.warn(error);
  }

}

// Handles fetching a value from async storage
export default function getValue(key){

	try {
		const value = await AsyncStorage.getItem(key);
    if(value)
      return value;
	}catch(error){
    console.warn(error);
  }

}