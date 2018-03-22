// This file abstracts the ImagePicker behavior
// to reduce duplication.

////////////////////////
// Import Modules
////////////////////////

import {
  Linking
} from "react-native"
import ImagePicker from 'react-native-image-crop-picker';
import OpenAppSettings from 'react-native-app-settings';

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import {basicAlert} from  "./../common/alerts";

////////////////////////
// Constants
////////////////////////

// Properties
const MEDIA_OPTIONS_PROPERTY              = { width: 400, height: 300, cropping: true }
// Strings  
const PHOTO_WARNING_HEADER_STRING         = "Juntos Requires Photos Access";
const PHOTO_WARNING_BODY_STRING           = "Go to the app settings and enable Photos Permissions.";
const CAMERA_WARNING_HEADER_STRING        = "Juntos Requires Camera Access";
const CAMERA_WARNING_BODY_STRING          = "Go to the app settings and enable Camera Permissions.";
const FILE_WARNING_HEADER_STRING          = "Juntos Requires Storage Access";
const FILE_WARNING_BODY_STRING            = "Go to the app settings and enable Storage Permissions.";
// Regex Patterns
const IMAGE_ACCCESS_PATTERN               = /Cannot access images/;
const CAMERA_PERMISSIONS_PATTERN          = /camera permission/;
const ANDROID_FILE_PERMISSIONS_PATTERN    = /open failed: ENOENT/;

class JTImagePicker {

  ////////////////////////
  // Constructor
  ////////////////////////

  constructor(){

    this._isAlertVisible = false;

  }

  ////////////////////////
  // Callbacks
  ////////////////////////

  // Handles on Alert buttton press
  _onAlertButtonPress = () => {

    OpenAppSettings.open();
    this._isAlertVisible = false;

  }

  ////////////////////////
  // Private Methods
  ////////////////////////

  // Creates an alert takes a header and body
  _createAlert(header, body){
    if(!this._isAlertVisible){
      this._isAlertVisible = true;
      basicAlert(
        header, 
        body,
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
          this._createAlert(PHOTO_WARNING_HEADER_STRING, PHOTO_WARNING_BODY_STRING);
      });
    })

  }

  // Opens the camera
  openCamera(){

    return new Promise((resolve, reject) => {
      ImagePicker.openCamera(MEDIA_OPTIONS_PROPERTY).then(image => {
        resolve(image);
      }).catch(error=>{
        if(error.message.match(CAMERA_PERMISSIONS_PATTERN)){
          this._createAlert(CAMERA_WARNING_HEADER_STRING, CAMERA_WARNING_BODY_STRING); 
        }else if(error.message.match(ANDROID_FILE_PERMISSIONS_PATTERN)){
          this._createAlert(FILE_WARNING_HEADER_STRING, FILE_WARNING_BODY_STRING);
        }
      });
    });

  }

}

export default JTImagePicker