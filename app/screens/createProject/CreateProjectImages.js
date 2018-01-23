////////////////////////
// Imports
////////////////////////

import React,{Component} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import { 
Text, 
Dimensions,
Image,
StyleSheet,
View,
ActionSheetIOS
} from 'react-native';

//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles, {COLORS, FONTS} from "../../common/styles.js"

////////////////////////
// Actions
////////////////////////

import {accountLogout} from "./../../actions/account-actions.js";

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import PrimaryButton from "./../../components/PrimaryButton";
import CardView from "./../../components/CardView";

////////////////////////
// Constants
////////////////////////
const {width, height}                   = Dimensions.get('window');
// Images
const imageAddButton                    = require("./../../assets/createProject/addImageIcon.png");
// Strings
const PREVIEW_PROJECT_BUTTON_STRING     = "Preview Project";
const CANCEL_OPTIONS_STRING             = "Cancel";
const CAMERA_OPTIONS_STRING             = "Camera";
const GALLERY_OPTIONS_STRING            = "Gallery";
const REMOVE_OPTIONS_STRING             = "Remove";
// Properties
const MEDIA_OPTIONS_PROPERTY            = { width: 400, height: 300, cropping: true }
// Numbers
const IMAGE_GRID_OFFSET_NUMBER          = 45;
const CANCEL_BUTTON_INDEX_NUMBER        = 0;
const DESTRUCTIVE_BUTTON_INDEX_NUMBER   = 1;
const OPEN_CAMERA_BUTTON_INDEX_NUMBER   = 1;
const IMAGE_DELETE_COUNT_NUMBER         = 1;
// The image grid placement takes into account the image grid offset
// the image grid offset is calculated from the the padding of the parent
// view component and the margin of each imageCard.
const IMAGE_GRID_PLACEMENT              = (width-IMAGE_GRID_OFFSET_NUMBER)/3;

class CreateProjectImages extends Component {


  ////////////////////////
  // Constructor
  ////////////////////////

  constructor(props){

    super(props);
    this.state = {
      projectImages:[]
    }

  }

  ////////////////////////
  // Methods
  ////////////////////////

  // Displays an action sheet for the available media types
  _displayGalleryCameraMenu(){

    ActionSheetIOS.showActionSheetWithOptions({
      options: [CANCEL_OPTIONS_STRING, CAMERA_OPTIONS_STRING, GALLERY_OPTIONS_STRING],
      cancelButtonIndex: CANCEL_BUTTON_INDEX_NUMBER,
    },
    (buttonIndex) => {
      this._openMediaType(buttonIndex);
    });

  }

  // Display an action sheet that allows for image removal
  _displayRemoveImageMenu(imageIndex){

    ActionSheetIOS.showActionSheetWithOptions({
      options: [CANCEL_OPTIONS_STRING, REMOVE_OPTIONS_STRING],
      destructiveButtonIndex: DESTRUCTIVE_BUTTON_INDEX_NUMBER,
      cancelButtonIndex: CANCEL_BUTTON_INDEX_NUMBER,
    },
    (buttonIndex) => {
      if (buttonIndex === DESTRUCTIVE_BUTTON_INDEX_NUMBER) { 
       this._removeImageByIndex(imageIndex);
      }
    });

  }

  // Removes an image by inded from the projectImages state
  _removeImageByIndex(imageIndex){

    this.setState(function(previousState){
        previousState.projectImages.splice(imageIndex, IMAGE_DELETE_COUNT_NUMBER);
        return previousState;
    });

  }

  // Opens the image media gallery
  _openGallery(){

    ImagePicker.openPicker(MEDIA_OPTIONS_PROPERTY).then(image => {
      this._processImage(image);
    })

  }

  // Opens the camera
  _openCamera(){

    ImagePicker.openCamera(MEDIA_OPTIONS_PROPERTY).then(image => {
      this._processImage(image);
    });

  }

  // Process a newly selected image to be stored on the projectImage state
  _processImage(imageSource){

    let source = { uri: imageSource.path };

    this.setState(function(previousState){
      previousState.projectImages[previousState.projectImages.length] = source;
      return previousState;
    });

  }


  ////////////////////////
  // Callbacks
  ////////////////////////

  // Handles opening the selected media type
  _openMediaType(buttonIndex){

    if(buttonIndex == OPEN_CAMERA_BUTTON_INDEX_NUMBER){
      this._openCamera();
    }else{
      this._openGallery();
    }

  }

  // Handles on image card press
  _onCardImagePress(imageIndex){

    this._displayRemoveImageMenu(imageIndex);

  }

  //Handles add image button press
  _onAddImagePress(){

    this._displayGalleryCameraMenu();

  }

  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    console.log(this.state);
    return (
     <View style={CommonStyles.container}>
      <View style={styles.scrollViewWrapper}>
        <View style={styles.imagesWrapper}>
          {this.state.projectImages.map((image, index) => {
           return (
            <CardView key={index} style={styles.imageCard} onPress={()=> this._onCardImagePress(index)}>
              <Image style={styles.cardImage} source={image}/>
            </CardView>);
          })}
          <CardView style={styles.addImageCardView} onPress={()=> this._onAddImagePress()}>
            <Image style={styles.addImageIcon} source={imageAddButton} />
            <Text style={styles.addImageText}>Add Image</Text>
          </CardView>
        </View>
      </View>
      <View style={CommonStyles.buttonFixedWrapper}> 
        <PrimaryButton style={CommonStyles.buttonFixedBottom} 
        onPress={() => this._onNexButtonPress()} 
        buttonText={PREVIEW_PROJECT_BUTTON_STRING}/>
      </View>
     </View>
    );
  }
}

////////////////////////
// Screen Styles
////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  ////////////////////////
  // Image Card
  ////////////////////////

  imagesWrapper:{
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 7.5,
    paddingVertical: 15
  },

  imageCard:{
    marginHorizontal: 5,
    marginVertical: 5
  },
  cardImage:{
    width: IMAGE_GRID_PLACEMENT,
    height: width/4
  },

  ////////////////////////
  // Add Image 
  ////////////////////////

  addImageCardView:{
    width: IMAGE_GRID_PLACEMENT, 
    height: width/4,
    backgroundColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    marginHorizontal: 5
  },
  addImageIcon:{
    height: 40,
    width: 40
  },
  addImageText: {
    fontSize: 12,
    color: COLORS.WHITE,
    fontFamily: FONTS.PRIMARY,
  }

});

////////////////////////
// Map to props
////////////////////////

const mapStateToProps = (state) => {
  return {
    isFetching: state.session.isFetching,
    isErrored: state.session.isErrored,
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(accountLogout())
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(CreateProjectImages);