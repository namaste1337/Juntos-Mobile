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
  Keyboard
} from 'react-native';

//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles from "../common/styles";
import {validateEmail} from "../common/validations";

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import ActivityIndicatorOverlay from "./../components/ActivityIndicatorOverlay";
import PrimaryTextInput from "./../components/PrimaryTextInput";
import PrimaryButton from "./../components/PrimaryButton";

//////////////////
// Constants
//////////////////

//Images
const profilePlaceholder  = require("./../assets/signup/profile_image_placeholder.png");
const imageAddButton      = require("./../assets/signup/plus_button.png");


class Signup extends Component {

  ////////////////////
  // Constructor
  ////////////////////

  constructor(props){
    super(props);
    this.state = { 
      emailField: "",
      passwordField: "",
      confirmPasswordField: "",
      bioField: "",
      profileImage: profilePlaceholder,
      emailIsValid: true,
      confirmPasswordIsValid: true,
      bioFieldIsValid: true,
      bioFieldLength: 0
    };
  }

  ////////////////////
  // Private Callbacks
  ////////////////////

  //Handles on profile image button press
  _onProfileImagePress(){

    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true
    }).then(image => {
      let source = { uri: image.path };
      this.setState({
        profileImage: source
      });

    }).catch(error => {
      console.log(error);
    });

  }

  //Handles on sign up button press
  _onSignUpbuttonPress(){

    // If the field are valid, we process the user data
    // and execute the appropriate action
    if(this._validateFields()){


    }

  }


  ////////////////////
  // Private Methods
  ////////////////////

  // Handles email validation, returns false if invlalid
  _validateEmail(email){

    if(!validateEmail(email)){
      this.setState({emailIsValid: false});
      return false
    }else{
      this.setState({emailIsValid: true});
    }

  }

  //Handles validating password, return false if invlaid
  _validatePassword(passwordOne, passwordTwo){

    // White space in password is not allowed
    if(passwordOne.hasWhiteSpace() || passwordTwo.hasWhiteSpace()){
      this.setState({confirmPasswordIsValid: false});
      return false;
    }

    // Remove white space from password fields to check 
    // for emptyfields
    password        = passwordOne.removeWhiteSpace();
    confirmPassword = passwordTwo.removeWhiteSpace();

    // Empty password field are not allowed
    if(password === "" | confirmPassword === ""){
      this.setState({confirmPasswordIsValid: false});
   
    } // PasswordsOne and PasswordTwo must be equal
    else if(passwordOne !== passwordTwo){
      this.setState({confirmPasswordIsValid: false});
      return false;
    }
    else{
      this.setState({confirmPasswordIsValid: true});
    }

  }

  //Handles validating bio, returns false if invalid
  _validateBio(bio){

    // Empty bio field is not allowed
    if(bio === ""){
      this.setState({bioFieldIsValid: false})
      return false;
    }else{
      this.setState({bioFieldIsValid: true});
    }

  }

  //Validates sign up form fields, returns true if all fields are valid
  _validateFields(){

    let isValid         = true;
    // Fields
    let email           = this.state.emailField;
    let password        = this.state.passwordField
    let confirmPassword = this.state.confirmPasswordField
    let bio             = this.state.bioField;

    // Validate email
    isValid = this._validateEmail(email);
    // Vaidate password
    isValid = this._validatePassword(password, confirmPassword);
    // Validate bio
    isValid = this._validateBio(bio);
    console.log(isValid);
    return isValid
  }

  ////////////////////
  // Screen UI
  ////////////////////

  render() {
    return (
      <View style={CommonStyles.container}>
        <KeyboardAvoidingView behavior={"position"}  style={CommonStyles.contentWrapper}>
          <View style={styles.profileImageUploadWrapper}>
            <TouchableOpacity onPress={() => this._onProfileImagePress()}>
              <Image source={this.state.profileImage} behavior={"contain"} style={styles.profileImage} />
              <Image style={styles.profileImageAddButton} source={imageAddButton} shadowColor={"#000"} />
            </TouchableOpacity>
            <Text style={styles.profileImageText}> 
              Please select an image for your profile. This image will be shown to other users on the platform.
            </Text>
          </View>
          <PrimaryTextInput
            onChangeText={emailField => this.setState({emailField})} 
            placeholder={"E-mail"}
            returnKeyType={"done"} 
            keyboardType={"email-address"}
            valid={this.state.emailIsValid}
            validationMessage={"Email is Invalid"} />
          <PrimaryTextInput 
            onChangeText={passwordField => this.setState({passwordField})} 
            placeholder={"Password"} 
            secureTextEntry
            returnKeyType={"done"}
            KeyboardType={"default"}/>
          <PrimaryTextInput 
            onChangeText={confirmPasswordField => this.setState({confirmPasswordField})} 
            placeholder={"Confirm Password"} 
            secureTextEntry
            returnKeyType={"done"}
            KeyboardType={"default"}
            valid={this.state.confirmPasswordIsValid}
            validationMessage={"Password is invalid or does not match"} />
          <PrimaryTextInput 
            onChangeText={bioField => this.setState({bioField})} 
            multiline={true} 
            maxLength={100}
            placeholder={"Tell us about yourself?"}
            returnKeyType={"done"}
            valid={this.state.bioFieldIsValid}
            validationMessage={"Required"} 
            blurOnSubmit
            onSubmitEditing={() => Keyboard.dismiss}/>
          <PrimaryButton onPress={() => this._onSignUpbuttonPress()} buttonText={"Sign Up"}/>
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
    fontFamily: "Roboto-Light"
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
