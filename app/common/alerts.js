////////////////////////
// Imports
////////////////////////

import { Alert } from 'react-native';

////////////////////////
// Constants
////////////////////////

//Strings
const OK_STRING = "OK";
// Bools
const CANCELABEL_BOOL = true;

////////////////////////
// Methods
////////////////////////

// Basic alerts will display a header, message, and ok button,/
export function basicAlert(header, message){

    Alert.alert( header, message, [ {text: OK_STRING }], { cancelable: CANCELABEL_BOOL } )

}