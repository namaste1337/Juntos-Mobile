////////////////////////
// Imports
////////////////////////

import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {bindActionCreators, connect} from 'react-redux';
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
const {width, height}                  = Dimensions.get('window');
// Images
const imageAddButton                   = require("./../../assets/createProject/addImageIcon.png");
// Strings
const PREVIEW_PROJECT_BUTTON_STRING    = "Preview Project"
// Integers
const IMAGE_GRID_OFFSET                = 45;
// The image grid placement takes into account the image grid offset
// the image grid offset is calculated from the the padding of the parent
// view component and the margin of each imageCard.
const IMAGE_GRID_PLACEMENT             = (width-IMAGE_GRID_OFFSET)/3;

class CreateProjectImages extends Component {

  constructor(props){
    super(props);
    this.state = {
      projectImages:[]
    }

  }

  _displayGalleryCameraMenu(){

    ActionSheetIOS.showActionSheetWithOptions({
      options: ["Cancel","Camera", "Gallery"],
      cancelButtonIndex: 0,
    },
    (buttonIndex) => {
      this._openMediaType(buttonIndex);
    });

  }

  // Display an action sheet that allows for image removal
  _displayRemoveImageMenu(imageIndex){

    ActionSheetIOS.showActionSheetWithOptions({
      options: ["Cancel", "Remove"],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 0,
    },
    (buttonIndex) => {
      if (buttonIndex === 1) { 
       this._removeImageByIndex(imageIndex);
      }
    });

  }

  // Removes an image by inded from the projectImages state
  _removeImageByIndex(imageIndex){

    this.setState(function(previousState){
        previousState.projectImages.splice(imageIndex, 1)
        return previousState;
    })

  }

  // Opens the image media gallery
  _openGallery(){

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this._processImage(image);
    }).catch(error => {
      console.log(error);
    });

  }

  // Opens the camera
  _openCamera(){

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this._processImage(image);
    }).catch(error => {
      console.log(error);
    });

  }

  // Process a newly selected image to be stored on the projectImage state
  _processImage(imageSource){

    let source = { uri: imageSource.path };

    this.setState(function(previousState){
      previousState.projectImages[previousState.projectImages.length] = source;
      return previousState;
    })

  }


  ////////////////////////
  // Callbacks
  ////////////////////////

  // Handles opening the selected media type
  _openMediaType(buttonIndex){

    if(buttonIndex == 1){
      this._openGallery();
    }else{
      this._openCamera();
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
    backgroundColor: '#FFF',
  },
  tabBarIcon:{
    width: 25,
    height: 25
  },
  imagesWrapper:{
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 7.5,
    paddingVertical: 15
  },

  ////////////////////////
  // Image Card
  ////////////////////////

  imageCard:{
    marginHorizontal: 5,
    marginVertical: 5
  },
  // 10 + 40
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
    borderColor: "#FFFFFF",
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