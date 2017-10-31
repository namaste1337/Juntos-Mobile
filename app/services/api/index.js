import apiConfig from './config.js'


// Will be used to make all future API request, abtracts and configures.
export default fetchApi = (endPoint, payload = {}, method = apiConfig.GET_METHOD, header = apiConfig.JSON_HEADER, params = {}) => {
	
  console.log(endPoint, payload, method, header)

	let headers = new Headers();
	let url   	= apiConfig.URL + endPoint;

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

  console.log(init);

	return fetch(url, init).then(response => {
      return response.json();
  }).catch(error => {
      return error;
  });


}