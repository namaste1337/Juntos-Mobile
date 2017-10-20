import apiConfig from './config.js'


// Will be used to make all future API request, abtracts and configures.
export default fetchApi = (endPoint, payload = {}, method = apiConfig.GET_METHOD, header = apiConfig.JSON_HEADER, params = {}) => {
	
  console.log(endPoint, payload, method, header)

	let myHeaders = new Headers();
	let url   	  = apiConfig.URL + endPoint;

	myHeaders.append(apiConfig.HEADER_TYPE, header);

	var init = {   
    method: method,
    headers: myHeaders,
  };

  // Body payload only allowed for POST, PUT, DELETE
  if(method != apiConfig.GET_METHOD){
    init.body = JSON.stringify(payload)
  }

	return fetch(url, init).then(response => {
      return response.json();
  }).catch(error => {
      return error;
  });


}