// This file handles network request to external API's
// at the lowest level. 


////////////////////////
// Import Modules
////////////////////////

import SimpleEvents from 'react-native-simple-events';

////////////////////////
// Import Configs
////////////////////////

import Config from "./config";

////////////////////////
// Import Common
////////////////////////

import Common from "./common";
import {basicAlert} from "./../../common/alerts";

////////////////////////
// Constants
////////////////////////

// Available event types
export const NETWORK_EVENT_TYPES = {
  NETWORK_EVENT_401: "NETWORK_EVENT_401",
  NETWORK_EVENT_201: "NETWORK_EVENT_201",
  NETWORK_EVENT_FAIL: "NETWORK_EVENT_FAIL"
};
// Available status codes
const REPSONSE_CODES = {
  CODE_200: 200,
  CODE_201: 201,
  CODE_401: 401,
  CODE_409: 409
}
//Strings
const INVALID_NETWORK_EVENT_TYPE_STRING     = "Event type must be one of the folllowing: " + Object.values(NETWORK_EVENT_TYPES);
const MISSING_CALLBACK_PARAMETER_STRING     = "Error: Missing callback parameter";
const MISSING_SEND_HEADER_PARAMETER_STRING  = "Error: Missing sendHeader parameter";
const MISSING_HEADERS_PARAMETER_STRING      = "Error: Missing headers parameter";
const MISSING_METHOD_PARAMETER_STRING       = "Error: Missing method parameter";
const MISSING_BODY_PARAMETER_STRING         = "Error: Missing body parameter";
const MISSING_PAYLOAD_PARAMETER_STRING      = "Error: Missing payload parameter";
const MISSING_ENDPOINT_PARAMETER_STRING     = "Error: Missing endPoint parameter";

////////////////////////////
// Getters and Setters
////////////////////////////

// Composes URL for API call
function _getServerURL(endPoint){

  if(endPoint === undefined)
    console.log(MISSING_ENDPOINT_PARAMETER_STRING);

  return Config.URL + Config.PATH + Config.VERSION + endPoint;

}

////////////////////////////
// Private Helper Functions
////////////////////////////

// Handles validating an event type from the NETWORK_EVENT_TYPES object
function _validateEventType(eventType){

  return Object.values(NETWORK_EVENT_TYPES).find(function(networkEvent){
    return eventType == networkEvent;
  });

}

// Handles composition of the header
function _handleHeader(sendHeader){
  
  if(sendHeader === undefined)
    console.error(MISSING_SEND_HEADER_PARAMETER_STRING);

  let headers = new Headers();

  // Define accept header
  headers.append(Common.HEADER_ACCEPT, Common.JSON_HEADER);
  // Define send header
  headers.append(Common.HEADER_CONTENT_TYPE, sendHeader);

  return headers;

}

// Handles determining if body should be a JSON string
function _handleBody(method, sendHeader, payload){

  let body = "";

  if(method === undefined)
    console.error(MISSING_METHOD_PARAMETER_STRING);
  if(sendHeader === undefined)
    console.error(MISSING_SEND_HEADER_PARAMETER_STRING);
  if(payload === undefined)
    console.error(MISSING_PAYLOAD_PARAMETER_STRING);

  // Body payload only allowed for POST, PUT, DELETE methods
  if(method != Common.GET_METHOD){
  
    if(sendHeader == Common.JSON_HEADER){
      body = JSON.stringify(payload)
    }else if(sendHeader == Common.MULTI_PART_HEADER){
      body = payload;
    }
  
    return body;
  }

  return null;

}

// Handles composing init for fetch request
function _handleInit(headers, method, body){

  if(headers === undefined)
    console.error(MISSING_HEADERS_PARAMETER_STRING);
  if(method === undefined)
    console.error(MISSING_METHOD_PARAMETER_STRING);
  if(body === undefined)
    console.error(MISSING_BODY_PARAMETER_STRING);

  let init = {   
    method,
    headers,
    body
  };

  return init;

}

export default Services = {

  ////////////////////////////
  // Public Methods
  ////////////////////////////

  // Handles registering a network event
  on: function(eventType, callback){

    // Validate the eventType and callback parameter
     if(_validateEventType(eventType) === undefined)
        console.error(INVALID_NETWORK_EVENT_TYPE_STRING);
     if(callback === undefined)
        console.error(MISSING_CALLBACK_PARAMETER_STRING);

     //Register Event
     SimpleEvents.on(eventType, eventType, callback);

  },

  // Handles triggering a network event
  trigger: function(eventType, data){

    // Validate the eventType parameter
    if(_validateEventType(eventType) === undefined)
      console.error(INVALID_NETWORK_EVENT_TYPE_STRING);
    // Trigger event
    SimpleEvents.trigger(eventType, data);

  },

  // Handles API calls to a remote server
  fetchApi: function(endPoint, payload = {}, method = Common.GET_METHOD, sendHeader = Common.JSON_HEADER, params = {}){
  
    return new Promise(function(resolve, reject){         

      let url     = _getServerURL(endPoint); //Config.URL + Config.PATH + Config.VERSION + endPoint;
      let body    = _handleBody(method, sendHeader, payload);
      let headers = _handleHeader(sendHeader);
      let init    = _handleInit(headers, method, body);
  
      fetch(url, init).then(response => {
  
        // Retrieve the status code
        let statusCode    = response.status;

        // Handle the response
        response.json().then(function(body){
          if(statusCode === REPSONSE_CODES.CODE_200){
            resolve(body);
          }else if(statusCode === REPSONSE_CODES.CODE_401){
            Services.trigger(NETWORK_EVENT_TYPES.NETWORK_EVENT_401, body);
          }else{
            throw Error(body.data.message);
          }
        }).catch(error =>{
          // Display any application level errors in a alert
          basicAlert("", error.toString());
          // Pass application level errors 
          reject(error);
        });
      }).catch(error => {
          // Log network level errors
          console.log(error);
        });
    });
  
  },

}