///////////////////////////
// Imports
///////////////////////////

import Services from "./../";
import Common from "./../common";

///////////////////////////
// Constants
///////////////////////////

// End points
const UPLOAD_IMAGE_ENDPOINT    = "/image_upload";
// Image file extensions
const IMAGE_FILE_EXTENSION_JPG = ".jpg";
const IMAGE_FILE_EXTENSION_PNG = ".png";
//Mime types
const JPEG_MIME_TYPE           = "image/jpeg";
const PNG_MIME_TYPE            = "image/png";
//Date type
const IMAGE_DATA_TYPE           = "image";

///////////////////////////
// Helper Functions
///////////////////////////

// Handles retrieving the file extension type
// based on the image mimeType
function getImageExtension(mimeType){
  switch (mimeType) {
    case JPEG_MIME_TYPE:
      return IMAGE_FILE_EXTENSION_JPG;
    case PNG_MIME_TYPE:
      return IMAGE_FILE_EXTENSION_PNG;
    default:
      return null;
  }
}

///////////////////////////
// Functions
///////////////////////////

// imageArray: type Array
// Description: An Array containing image objects containing the image uri
// and the mime type
// Definiition: [
//  {uri: <local_image_uri>, mimeType: "image/png"},
//  {uri: <local_image_uri>, mimeType: "image/png"}
// ]
// Default: none

// Handles image uploads
export function imageUpload(imagesArray){

  // Create new data object to store image data
  let data = new FormData();

  imagesArray.map(imageObject => {

    //Determine files extension
    let imageFileExtension = getImageExtension(imageObject.mimeType);
    
    // Will use the unix time stamp as the image name
    let name = (Math.floor(Date.now()/1000)).toString() + imageFileExtension;
    
    // Append the image data
    data.append(IMAGE_DATA_TYPE,{
     uri: imageObject.uri,
     name,
     type: imageObject.mimeType
    });
  
   });


	return Services.fetchApi(UPLOAD_IMAGE_ENDPOINT, data, Common.POST_METHOD, Common.MULTI_PART_HEADER);

}


