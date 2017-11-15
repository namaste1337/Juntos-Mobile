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

// Handles sign up request
export function imageUpload(uri, mimeType){

  //Determine files extension
  let imageFileExtension = getImageExtension(mimeType);

	// Will use the unix time stamp as the image name
	let name = (Math.floor(Date.now()/1000)).toString() + imageFileExtension;

  // Create new data object to store image data
	let data = new FormData();
	data.append(IMAGE_DATA_TYPE,{
		uri,
		name,
    type: mimeType
	})

	return Services.fetchApi(UPLOAD_IMAGE_ENDPOINT, data, Common.POST_METHOD, Common.MULTI_PART_HEADER);

}


