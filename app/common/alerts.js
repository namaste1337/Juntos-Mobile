// This file will host functions
// that abstract the Alerts API

////////////////////////
// Import Modules
////////////////////////

import { Alert } from 'react-native';

////////////////////////
// Constants
////////////////////////

//Strings
const OK_STRING = "OK";
//Bools
const CANCELABEL_BOOL = true;

////////////////////////
// Helper Functions
////////////////////////

////////////////////////
// Functions
////////////////////////

// Basic alerts will display a header, message, and ok button
export function basicAlert(header, message){

    Alert.alert( header, message, [ {text: OK_STRING }], { cancelable: CANCELABEL_BOOL } )

}