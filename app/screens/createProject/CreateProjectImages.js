////////////////////////
// Imports
////////////////////////

import React,{Component} from 'react';
import {connect} from 'react-redux';
import { 
Text, 
Dimensions,
Image,
StyleSheet,
View,
ActionSheetIOS,
} from 'react-native';
import DialogAndroid from 'react-native-dialogs';

//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles, {COLORS, FONTS} from "../../common/styles.js"
// Conditional rendering
import {renderIf} from "./../../common/components";
import {
deviceTypes, 
deviceOS
} from "./../../common/device";

//////////////////////////////
// Imports Libs
///////////////////////////////

import JTImagePicker from "./../../lib/JTImagePicker";

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import PrimaryButton from "./../../components/PrimaryButton";
import CardView from "./../../components/CardView";
import TouchableText from "./../../components/TouchableText";

////////////////////////
// Actions
////////////////////////

import {populateTempImages, navigateToCreateProjectPreview} from "./../../actions/project-actions.js";

////////////////////////
// Constants
////////////////////////

// Images
const imageAddButton                    = require("./../../assets/createProject/addImageIcon.png");
// Strings
const PREVIEW_PROJECT_BUTTON_STRING     = "Preview Project";
const CANCEL_OPTIONS_STRING             = "Cancel";
const CAMERA_OPTIONS_STRING             = "Camera";
const GALLERY_OPTIONS_STRING            = "Gallery";
const REMOVE_OPTIONS_STRING             = "Remove";
const SELECT_MEDIA_DIALOG_TITLE_STRING  = "Select Media";
const MEDIA_ACTION_DIALOG_TITLE_STRING  = "Media Action";
const PREVIEW_BUTTON_STRING             = "Preview";
//Arrays
const MEDIA_OPTIONS_IOS_ARRAY           = [CANCEL_OPTIONS_STRING, CAMERA_OPTIONS_STRING, GALLERY_OPTIONS_STRING];
const MEDIA_OPTIONS_ANDROID_ARRAY       = [GALLERY_OPTIONS_STRING, CAMERA_OPTIONS_STRING];
const REMOVE_OPTIONS_ARRAY              = [CANCEL_OPTIONS_STRING, REMOVE_OPTIONS_STRING];
// Numbers
const IMAGE_GRID_OFFSET_NUMBER          = 45;
const CANCEL_BUTTON_INDEX_NUMBER        = 0;
const DESTRUCTIVE_BUTTON_INDEX_NUMBER   = 1;
const OPEN_CAMERA_BUTTON_INDEX_NUMBER   = 1;
const IMAGE_DELETE_COUNT_NUMBER         = 1; 
// Device
const {width, height}                   = Dimensions.get('window');
// The image grid placement takes into account the image grid offset
// the image grid offset is calculated from the the padding of the parent
// view component and the margin of each imageCard.
const IMAGE_GRID_PLACEMENT              = (width-IMAGE_GRID_OFFSET_NUMBER)/3;

class CreateProjectImages extends Component {

  ////////////////////////
  // Navigation Options
  ////////////////////////

  static navigationOptions = ({navigation}) => {

    const params = navigation.state.params || {};

    return {
      headerRight: (
        <TouchableText parentStyle={CommonStyles.headerParentStyle} style={CommonStyles.headerTextButton} text={PREVIEW_BUTTON_STRING} onPress={params.onPreviewImageButtonPress} />
      ),
    }
  }

  ////////////////////////
  // Constructor
  ////////////////////////

  constructor(props){

    super(props);
    this.state = {
      projectImages:[],
      imagesValid: true,
    }

    //Create an instace of JTImagePicker
    this._jtImagePicker = new JTImagePicker();

  }

  ////////////////////////
  // Life Cycle
  ////////////////////////

  componentWillMount(){

    // Configure the android media dialog
    let andoridCameraDialogOptions = { 
      items: MEDIA_OPTIONS_ANDROID_ARRAY,
      title: SELECT_MEDIA_DIALOG_TITLE_STRING,
      itemsCallback: (id, text) => this._openMediaType(id)
    }

    // Configure the android media dialog
    let androidRemoveDialogOptions = { 
      items: REMOVE_OPTIONS_ARRAY,
      title: MEDIA_ACTION_DIALOG_TITLE_STRING,
      itemsCallback: (id, text) => this._removeImageByIndex(id)
    }

    // Create and set the options for the media dialog
    this.mediaDialog = new DialogAndroid();
    this.mediaDialog.set(andoridCameraDialogOptions);

    // Create nd set the options for the remove dialog
    this.removeDialog = new DialogAndroid();
    this.removeDialog.set(androidRemoveDialogOptions);

    this.props.navigation.setParams({ onPreviewImageButtonPress: () => this._onPreviewImageButtonPress() });
 
  }



  ////////////////////////
  // Callbacks
  ////////////////////////

  // Handles opening the selected media type
  _openMediaType(buttonIndex){

    if(buttonIndex == OPEN_CAMERA_BUTTON_INDEX_NUMBER){
      this._jtImagePicker.openCamera().then(image => {
        this._processImage(image);
      });
    }else{
      this._jtImagePicker.openGallery().then(image => {
        this._processImage(image);
      });
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

  // Handles on project preview button press
  _onPreviewImageButtonPress(){

    let isValid = this._validate();

    if(isValid){
      this.props.populateTempImages(this.state.projectImages);

      // Navigation to Project Preview screen
      this.props.navigateToCreateProjectPreview()

    }

  }

  ////////////////////////
  // Methods
  ////////////////////////

  // Handles all validation for required fields
  _validate(){

    let isValid = true;

    isValid = this._validateRequiredImages();

    if(!isValid)
      return isValid;

    return isValid;

  }

  // Validates for required image count
  _validateRequiredImages(){

    let valid = (this.state.projectImages.length > 0);
    // Update the imagesValid state
    this.setState({
      imagesValid: valid
    });
    
    return valid;

  }

  // Displays an action sheet for the available media types
  _displayGalleryCameraMenu(){

    if(deviceOS == deviceTypes.ios){

      // Show the iOS Action Sheet
      ActionSheetIOS.showActionSheetWithOptions({
        options: MEDIA_OPTIONS_IOS_ARRAY,
        cancelButtonIndex: CANCEL_BUTTON_INDEX_NUMBER,
      },
      (buttonIndex) => {
        this._openMediaType(buttonIndex);
      });

    }else{

      // Show the android dialog
      this.mediaDialog.show();

    }

  }

  // Display an action sheet that allows for image removal
  _displayRemoveImageMenu(imageIndex){

    if(deviceOS == deviceTypes.ios){

      ActionSheetIOS.showActionSheetWithOptions({
        options: REMOVE_OPTIONS_ARRAY,
        destructiveButtonIndex: DESTRUCTIVE_BUTTON_INDEX_NUMBER,
        cancelButtonIndex: CANCEL_BUTTON_INDEX_NUMBER,
      },
      (buttonIndex) => {
        if (buttonIndex === DESTRUCTIVE_BUTTON_INDEX_NUMBER) { 
         this._removeImageByIndex(imageIndex);
        }
      });

    }else{

      // Show the android remove dialog
      this.removeDialog.show();

    }

  }

  // Removes an image by inded from the projectImages state
  _removeImageByIndex(imageIndex){

    this.setState(function(previousState){
        previousState.projectImages.splice(imageIndex, IMAGE_DELETE_COUNT_NUMBER);
        return previousState;
    });

  }

  // Process a newly selected image to be stored on the projectImage state
  _processImage(imageSource){

    let source = { uri: imageSource.path, mimeType: imageSource.mime};

    this.setState(function(previousState){
      previousState.projectImages[previousState.projectImages.length] = source;
      return previousState;
    })

  }  

  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    console.log(this.state);
    return (
     <View style={CommonStyles.container}>
     {renderIf(!this.state.imagesValid, <View style={styles.validationTextWrapper}><Text style={styles.validationText}> You must add 1 image to your project</Text></View>)}
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
  },

  ////////////////////////
  // Validation
  ////////////////////////

  validationTextWrapper:{
    paddingTop: 10,
    alignItems: "center"
  },

  validationText:{
    fontFamily: FONTS.PRIMARY,
    color: COLORS.RED,
    fontSize: 12
  }

});

////////////////////////
// Map to props
////////////////////////

const mapStateToProps = (state) => {
  return {
    project: state.project
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    populateTempImages: (imagesArray) => dispatch(populateTempImages(imagesArray)),
    navigateToCreateProjectPreview: () => dispatch(navigateToCreateProjectPreview())
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(CreateProjectImages);