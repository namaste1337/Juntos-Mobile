// This file will host functions commonly
// used to create and trigger network events

////////////////////////
// Import Modules
////////////////////////

import SimpleEvents from 'react-native-simple-events';

////////////////////////
// Constants
////////////////////////

const API_401_EVENT    = "API_401";

////////////////////////
// Helper Functions
////////////////////////

////////////////////////
// Functions
////////////////////////

// Handles listening for 401 network request error
// Typically this method will only be needed once 
// in the app and will be utlized to perform appropriate 
// logout logic when a 401 event error is triggered.
export function listenFor401Error(callback){

  SimpleEvents.on(API_401_EVENT, API_401_EVENT, callback);

}

// Handles triggering a 401 network request error
// Typically this will be utilized at the lowest level 
// of the network abstraction.
export function trigger401ErrorEvent(data){

  SimpleEvents.trigger(API_401_EVENT, data);

}

