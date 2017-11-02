import apiConfig from './config.js'
import {basicAlert} from "./../../common/alerts"


// Will be used to make all future API request, abtracts and configures.
export default fetchAPI = (endPoint, payload = {}, method = apiConfig.GET_METHOD, header = apiConfig.JSON_HEADER, params = {}) => {

  return new Promise(function(resolve, reject){

    console.log(endPoint, payload, method, header)
  
    let headers = new Headers();
    let url     = apiConfig.URL + endPoint;
  
    // Define accept header
    headers.append(apiConfig.HEADER_ACCEPT, apiConfig.JSON_HEADER);
    // Define send header
    headers.append(apiConfig.HEADER_CONTENT_TYPE, header);
  
    var init = {   
      method,
      headers,
    };
  
    // Body payload only allowed for POST, PUT, DELETE
    if(method != apiConfig.GET_METHOD){

      if(header == apiConfig.JSON_HEADER){
        init.body = JSON.stringify(payload)
      }else if(header == apiConfig.MULTI_PART_HEADER){
        init.body = payload;
      }

    }

    fetch(url, init).then(response => {

      // Round the status code;
      let statusCode    = Math.floor(response.status/100);
      
      // Handle the response
      response.json().then(function(body){
        if(statusCode === 2){
          resolve(body)
        }else{
          throw Error(body.data.message);
        }
      }).catch(error =>{
        // Display any application level error in a alert
        basicAlert("", error.toString());
        // Pass application level errors 
        reject(error);
      });
    }).catch(error => {
      // Log network level errors
      console.log(error);
    });
  });

}