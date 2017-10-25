////////////////////
// Imports
////////////////////

import React, { Component } from 'react';
import {bindActionCreators, connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles from "../common/styles.js"

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import ActivityIndicatorOverlay from './../components/ActivityIndicatorOverlay';
import PrimaryTextInput from './../components/PrimaryTextInput';
import PrimaryButton from './../components/PrimaryButton'

//////////////////
// Constants
//////////////////

//Images
const profilePlaceholder  = require("./../assets/signup/profile_image_placeholder.png");
const imageAddButton  = require("./../assets/signup/plus_button.png");


class Signup extends Component {

  constructor(props){
    super(props);
    this.state = { profileImage: profilePlaceholder };
  }

  ////////////////////
  // Callbacks
  ////////////////////

  onProfileImagePress(){

    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      let source = { uri: image.path };

      this.setState({
        profileImage: source
      });

    });

  }

  ////////////////////
  // Screen UI
  ////////////////////

  render() {
    return (
      <View style={CommonStyles.container}>
        <KeyboardAvoidingView behavior={"position"}  style={CommonStyles.contentWrapper}>
          <View style={styles.profileImageUploadWrapper}>
            <TouchableOpacity onPress={() => this.onProfileImagePress()}>
              <Image source={this.state.profileImage} behavior={"contain"} style={styles.profileImage} />
              <Image style={styles.profileImageAddButton} source={imageAddButton} shadowColor={"#000"} />
            </TouchableOpacity>
            <Text style={styles.profileImageText}> 
              Please select an image for your profile. This image will be shown to other users on the platform.
            </Text>
          </View>
          <PrimaryTextInput placeHolder={"E-mail"}/>
          <PrimaryTextInput placeHolder={"Password"} />
          <PrimaryTextInput placeHolder={"Confirm Password"} />
          <PrimaryButton buttonText={"Sign Up"}/>
        </KeyboardAvoidingView>
      </View>
    );
  }
}



//////////////////////////////
// Styles
///////////////////////////////

const styles = StyleSheet.create({

  ///////////////////////
  // Profile Image
  ///////////////////////

  profileImageUploadWrapper:{
    paddingVertical: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems:"center",
    borderBottomWidth: 1,
    borderColor: "#CCC"
  },
  profileImage:{
    width: 120,
    height: 120,
    borderRadius: 60
  },
  profileImageText:{
    marginLeft: 20,
    flex: 1,
    flexWrap: "wrap",
    fontWeight: "100"
  },
  profileImageAddButton:{
    position: "absolute",
    right: 0, 
    top: 0,
    width: 35,
    height: 35,
    opacity: 0.9
  }
})

///////////////////////
// Map to props
///////////////////////

const mapStateToProps = (state) => {
  return {
    isFetching: state.session.isFetching,
    isErrored: state.session.isErrored
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    sessionLogin: (email, password) => dispatch(sessionLogin(email, password))
  };
}



export default connect(mapStateToProps, mapDistpatchToProps)(Signup);
