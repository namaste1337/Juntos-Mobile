// This file abstracts the ImagePicker behavior
// to reduce duplication.

////////////////////////
// Import Modules
////////////////////////

import {
  Linking
} from "react-native"
import ImagePicker from 'react-native-image-crop-picker';

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import {basicAlert} from  "./../common/alerts";

////////////////////////
// Constants
////////////////////////

// Properties
const MEDIA_OPTIONS_PROPERTY            = { width: 400, height: 300, cropping: true }
// Strings
const PHOTO_WARNING_HEADER_STRING       = "Juntos Requires Photos Access";
const PHOTO_WARNING_BODY_STRING         = "Go to the app settings and enable Photos.";
const CAMERA_WARNING_HEADER_STRING      = "Juntos Requires Camera Access";
const CAMERA_WARNING_BODY_STRING        = "Go to the app settings and enable Camera.";
const APP_SETTINGS_URL_STRING           = "app-settings:";
// Regex Patterns
const IMAGE_ACCCESS_PATTERN             = /Cannot access images/;
const CAMERA_PERMISSIONS_PATTERN        = /camera permission/;

class JTImagePicker {

  ////////////////////////
  // Callbacks
  ////////////////////////

  _onAlertButtonPress = () => {

    Linking.openURL(APP_SETTINGS_URL_STRING)

  }

  ////////////////////////
  // Private Methods
  ////////////////////////


  // Prompts the user to enable Photo permissions 
  // via the iOS app settings screen.
  _photoSettingsAlert(){
    
    if(!this._isAlertVisible){
      basicAlert(
        PHOTO_WARNING_HEADER_STRING, 
        PHOTO_WARNING_BODY_STRING,
        this._onAlertButtonPress
      );
    }

  }
  
  // Prompts the user to enable Camera permissions 
  // via the iOS app settings screen.
  _cameraSettingsAlert(){
  
    if(!this._isAlertVisible){
      basicAlert(
        CAMERA_WARNING_HEADER_STRING, 
        CAMERA_WARNING_BODY_STRING,
        this._onAlertButtonPress
      );
    }
      
  }

  ////////////////////////
  // Public Methods
  ////////////////////////

  // Opens the image media gallery
  openGallery(){

    return new Promise((resolve, reject) => {
      ImagePicker.openPicker(MEDIA_OPTIONS_PROPERTY).then(image => {
        resolve(image);
      }).catch(error=>{
        if(error.message.match(IMAGE_ACCCESS_PATTERN))
          this._photoSettingsAlert();
      });
    })

  }

  // Opens the camera
  openCamera(){

    return new Promise((resolve, reject) => {
      ImagePicker.openCamera(MEDIA_OPTIONS_PROPERTY).then(image => {
        resolve(image);
      }).catch(error=>{
        console.log(error.message);
        if(error.message.match(CAMERA_PERMISSIONS_PATTERN))
          this._cameraSettingsAlert();
      });
    });

  }

}

export default JTImagePicker