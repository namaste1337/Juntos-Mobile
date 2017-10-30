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
const profilePlaceholder                        = require("./../assets/signup/profile_image_placeholder.png");
const imageAddButton                            = require("./../assets/signup/plus_button.png");
//Strings
const EMAIL_FIELD_PLACEHOLDER_STRING            = "E-mail";
const PASSWORD_FIELD_PLACEHOLDER_STRING         = "Password";
const CONFIRM_PASSWORD_FIELD_PLACEHOLDER_STRING = "Confirm Password";
const SIGNUP_BUTTON_STRING                      = "Sign Up";
const EMAIL_VALIDATION_MESSAGE_STRING           = "E-mail is invalid";
const PASSWORD_VALIDATION_MESSAGE_STRING        = "Password is invalid or does not match";
//Properties
const RETURN_KEY_TYPE                           = "done";
const EMAIL_KEYBOARD_TYPE                       = "email-address";
const DEFAULT_KEYBOARD_TYPE                     = "default";
const KEYBOARD_AVOIDING_VIEW_BEHAVIOR           = "position";
const PROFILE_IMAGE_BEHAVIOR                    = "contain";
const IMAGE_PICKER_WIDTH                        = 400;
const IMAGE_PICKER_HEIGHT                       = 400;
const IMAGE_PICKER_CROPPING                     = true;
//States
const EMAIL_VALIDATION_TRUE_STATE               = true;
const EMAIL_VALIDATION_FALSE_STATE              = false;
const PASSWORD_VALIDATION_TRUE_STATE            = true;
const PASSWORD_VALIDATION_FALSE_STATE           = false;


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
      emailIsValid: EMAIL_VALIDATION_TRUE_STATE,
      confirmPasswordIsValid: PASSWORD_VALIDATION_TRUE_STATE,
    };
  }

  ////////////////////
  // Private Callbacks
  ////////////////////

  //Handles profile image button press
  _onProfileImagePress(){

    ImagePicker.openPicker({
      width: IMAGE_PICKER_WIDTH,
      height: IMAGE_PICKER_HEIGHT,
      cropping: IMAGE_PICKER_CROPPING
    }).then(image => {
      let source = { uri: image.path };
      this.setState({
        profileImage: source
      });

    }).catch(error => {
      console.log(error);
    });

  }

  //Handles sign up button press
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
      this.setState({emailIsValid: EMAIL_VALIDATION_FALSE_STATE});
      return false
    }else{
      this.setState({emailIsValid: EMAIL_VALIDATION_TRUE_STATE});
    }

  }

  //Handles validating password, returns false if invlaid
  _validatePassword(passwordOne, passwordTwo){

    // White space in password is not allowed
    if(passwordOne.hasWhiteSpace() || passwordTwo.hasWhiteSpace()){
      this.setState({confirmPasswordIsValid: PASSWORD_VALIDATION_FALSE_STATE});
      return false;
    }

    // Removes white space from password fields
    password        = passwordOne.removeWhiteSpace();
    confirmPassword = passwordTwo.removeWhiteSpace();

    // Empty password fields are not allowed
    if(password === "" | confirmPassword === ""){
      this.setState({confirmPasswordIsValid: PASSWORD_VALIDATION_FALSE_STATE});
   
    } // PasswordsOne and PasswordTwo must be equal
    else if(passwordOne !== passwordTwo){
      this.setState({confirmPasswordIsValid: PASSWORD_VALIDATION_FALSE_STATE});
      return false;
    }
    else{
      this.setState({confirmPasswordIsValid: PASSWORD_VALIDATION_TRUE_STATE});
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

    return isValid
  }

  ////////////////////
  // Screen UI
  ////////////////////

  render() {
    return (
      <View style={CommonStyles.container}>
        <KeyboardAvoidingView behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR} style={CommonStyles.contentWrapper}>
          <View style={styles.profileImageUploadWrapper}>
            <TouchableOpacity onPress={() => this._onProfileImagePress()}>
              <Image source={this.state.profileImage} behavior={PROFILE_IMAGE_BEHAVIOR} style={styles.profileImage} />
              <Image style={styles.profileImageAddButton} source={imageAddButton} />
            </TouchableOpacity>
            <Text style={styles.profileImageText}> 
              Please select an image for your profile. This image will be shown to other users on the platform.
            </Text>
          </View>
          <PrimaryTextInput
            onChangeText={emailField => this.setState({emailField})} 
            placeholder={EMAIL_FIELD_PLACEHOLDER_STRING}
            returnKeyType={RETURN_KEY_TYPE} 
            keyboardType={EMAIL_KEYBOARD_TYPE}
            valid={this.state.emailIsValid}
            validationMessage={EMAIL_VALIDATION_MESSAGE_STRING} />
          <PrimaryTextInput 
            onChangeText={passwordField => this.setState({passwordField})} 
            placeholder={PASSWORD_FIELD_PLACEHOLDER_STRING} 
            secureTextEntry
            returnKeyType={RETURN_KEY_TYPE}
            keyboardType={DEFAULT_KEYBOARD_TYPE}/>
          <PrimaryTextInput 
            onChangeText={confirmPasswordField => this.setState({confirmPasswordField})} 
            placeholder={CONFIRM_PASSWORD_FIELD_PLACEHOLDER_STRING} 
            secureTextEntry
            returnKeyType={RETURN_KEY_TYPE}
            keyboardType={DEFAULT_KEYBOARD_TYPE}
            valid={this.state.confirmPasswordIsValid}
            validationMessage={PASSWORD_VALIDATION_MESSAGE_STRING} />
          <PrimaryButton onPress={() => this._onSignUpbuttonPress()} buttonText={SIGNUP_BUTTON_STRING}/>
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
    accountSignUp: (email, password) => dispatch(accountSignup(email, password))
  };
}



export default connect(mapStateToProps, mapDistpatchToProps)(Signup);
