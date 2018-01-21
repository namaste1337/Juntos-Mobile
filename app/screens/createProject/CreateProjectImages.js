////////////////////////
// Imports
////////////////////////

import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {bindActionCreators, connect} from 'react-redux';
import { 
Text, 
Dimensions,
ScrollView,
Image,
StyleSheet,
TouchableOpacity,
View
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
import ImageCardView from "./../../components/ImageCardView";
import CardView from "./../../components/CardView";

////////////////////////
// Constants
////////////////////////
const {width, height}                  = Dimensions.get('window');
const imageAddButton                   = require("./../../assets/createProject/addImageIcon.png");

class CreateProjectImages extends Component {

  constructor(props){
    super(props);
    this.state = {
      projectImages:[]
    }

  }


  tabBarOnPress(){
    
  }

  ////////////////////////
  // Callbacks
  ////////////////////////
    //Handles profile image button press
  _onAddImagePress(){

    ImagePicker.openPicker({
      width: 300,
      height: 200,
      cropping: 300
    }).then(image => {
      let source = { uri: image.path };
      // this.setState({
      //   profileImageData: {
      //     uri: image.path,
      //     mime: image.mime
      //   },
      //   profileImage: source,
      //   profileImageValid: PROFILE_IMAGE_TRUE_STATE
      // });
      
      this.setState(function(previousState){
        previousState.projectImages[previousState.projectImages.length] = source;
        return previousState;
      })
    }).catch(error => {
      console.log(error);
    });

  }

  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    console.log(this.state);
    return (
     <View style={CommonStyles.container}>
      <View style={styles.imagesWrapper}>
        {this.state.projectImages.map(function(image){
         console.log(image);
         return (<ImageCardView source={image} />);
        })}
        <CardView style={styles.addImageCardView} onPress={()=> this._onAddImagePress()}>
          <Image style={styles.addImageIcon} source={imageAddButton} />
          <Text style={styles.addImageText}>Add Image</Text>
        </CardView>
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
  // Add Image 
  ////////////////////////

  addImageCardView:{
    width: 80, 
    height: 100,
    backgroundColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderStyle: "dashed",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
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