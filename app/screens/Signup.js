////////////////////
// Imports
////////////////////

import React, { Component } from 'react';
import {bindActionCreators, connect} from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView
} from 'react-native';

//////////////////////////////
// Imports Actions
///////////////////////////////

import { accountSignup } from '../actions/account-actions';

//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles, {COLORS, FONTS} from "../common/styles";
import {validateEmail} from "../common/validations";
import {renderIf} from "../common/components";

//////////////////////////////
// Imports Libs
///////////////////////////////

import JTImagePicker from "./../lib/JTImagePicker";

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import ActivityIndicatorOverlay from "./../components/ActivityIndicatorOverlay";
import PrimaryTextInput from "./../components/PrimaryTextInput";
import PrimaryButton from "./../components/PrimaryButton";
import CardView from "./../components/CardView";

//////////////////
// Constants
//////////////////

//Images
const profilePlaceholder                        = require("./../assets/signup/profile_image_placeholder.png");
const imageAddButton                            = require("./../assets/signup/plus_button.png");
//Strings
const USER_NAME_PLACEHOLDER_STRING              = "Username";
const EMAIL_FIELD_PLACEHOLDER_STRING            = "E-mail";
const PASSWORD_FIELD_PLACEHOLDER_STRING         = "Password";
const CONFIRM_PASSWORD_FIELD_PLACEHOLDER_STRING = "Confirm Password";
const SIGNUP_BUTTON_STRING                      = "Sign Up";
const USER_NAME_VALIDATION_MESSAGE_STRING       = "Username is required"
const EMAIL_VALIDATION_MESSAGE_STRING           = "E-mail is invalid";
const PASSWORD_VALIDATION_MESSAGE_STRING        = "Password is invalid or does not match";
//Properties
const RETURN_KEY_TYPE                           = "done";
const EMAIL_KEYBOARD_TYPE                       = "email-address";
const DEFAULT_KEYBOARD_TYPE                     = "default";
const KEYBOARD_AVOIDING_VIEW_BEHAVIOR           = "position";
const PROFILE_IMAGE_BEHAVIOR                    = "contain";
const AUTO_CAPITIALIZE_NONE_PROPERTY            = "none";
//States
const USERNAME_VALIDATION_TRUE_STATE            = true;
const USERNAME_VALIDATION_FALSE_STATE           = false;
const EMAIL_VALIDATION_TRUE_STATE               = true;
const EMAIL_VALIDATION_FALSE_STATE              = false;
const PASSWORD_VALIDATION_TRUE_STATE            = true;
const PASSWORD_VALIDATION_FALSE_STATE           = false;
const PROFILE_IMAGE_FALSE_STATE                 = false;
const PROFILE_IMAGE_TRUE_STATE                  = true;


class Signup extends Component {

  ////////////////////
  // Constructor
  ////////////////////

  constructor(props){
    super(props);
    this.state = { 
      usernameField: "",
      emailField: "",
      passwordField: "",
      confirmPasswordField: "",
      bioField: "",
      profileImage: null,
      profileImageData: {},
      usernameIsValid: USERNAME_VALIDATION_TRUE_STATE,
      emailIsValid: EMAIL_VALIDATION_TRUE_STATE,
      confirmPasswordIsValid: PASSWORD_VALIDATION_TRUE_STATE,
      profileImageValid: PROFILE_IMAGE_TRUE_STATE
    };

    // Create a new instance of JTImagePicker
    this._jtImagePicker =  new JTImagePicker();
  }

  ////////////////////
  // Life Cycle
  ////////////////////

  componentDidMount(){
    this.onSignInPressed = async () => {

    }
  }

  ////////////////////
  // Private Callbacks
  ////////////////////

  //Handles profile image button press
  _onProfileImagePress(){

    this._jtImagePicker.openGallery().then(image => {

      let source = { uri: image.path };
      this.setState({
        profileImageData: {
          uri: image.path,
          mime: image.mime
        },
        profileImage: source,
        profileImageValid: PROFILE_IMAGE_TRUE_STATE
      });

    })
    
  }

  //Handles sign up button press
  _onSignUpbuttonPress(){
    if(this._validateFields())
      this.props.accountSignup(this.state.usernameField, this.state.emailField.toLowerCase(), this.state.passwordField, this.state.profileImageData.uri, this.state.profileImageData.mime);
  }


  ////////////////////
  // Private Methods
  ////////////////////

  // Handles username validation, return false if invalid
  _validateUsername(username){

    if(username == ""){
      this.setState({usernameIsValid: USERNAME_VALIDATION_FALSE_STATE})
      return false;
    }else{
      this.setState({usernameIsValid: USERNAME_VALIDATION_TRUE_STATE})
      return true;
    }
  
  }

  // Handles email validation, returns false if invlalid
  _validateEmail(email){

    if(!validateEmail(email)){
      this.setState({emailIsValid: EMAIL_VALIDATION_FALSE_STATE});
      return false
    }else{
      this.setState({emailIsValid: EMAIL_VALIDATION_TRUE_STATE});
      return true;
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
      return false;
    } // PasswordsOne and PasswordTwo must be equal
    else if(passwordOne !== passwordTwo){
      this.setState({confirmPasswordIsValid: PASSWORD_VALIDATION_FALSE_STATE});
      return false;
    }
    else{
      this.setState({confirmPasswordIsValid: PASSWORD_VALIDATION_TRUE_STATE});
      return true;
    }

  }

  _validateProfileImage(){

    let imageData = Object.keys(this.state.profileImageData)

    if(imageData.length === 0){
      this.setState({profileImageValid: PROFILE_IMAGE_FALSE_STATE});
      return false
    }else{
      this.setState({profileImageValid: PROFILE_IMAGE_TRUE_STATE});
      return true
    }

  }

  //Validates sign up form fields, returns true if all fields are valid
  _validateFields(){

    let isValid         = true;
    // Fields
    let username        = this.state.usernameField;
    let email           = this.state.emailField;
    let password        = this.state.passwordField
    let confirmPassword = this.state.confirmPasswordField
    let bio             = this.state.bioField;

    //Validate username
    isValid = this._validateUsername(username)
    if(!isValid)
      return isValid;
    // Validate email
    isValid = this._validateEmail(email);
    if(!isValid)
      return isValid;
    // Vaidate password
    isValid = this._validatePassword(password, confirmPassword);
    if(!isValid)
      return isValid;
    // Validate profile image data
    isValid = this._validateProfileImage();
    if(!isValid)
      return isValid;

    return isValid

  }

  ////////////////////
  // Screen UI
  ////////////////////

  render() {
    return (
      <View style={CommonStyles.container}>
        <ScrollView>
          <KeyboardAvoidingView behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR}>
            <CardView>
              <View style={styles.profileImageUploadWrapper}>
                <TouchableOpacity onPress={() => this._onProfileImagePress()}>
                  <Image source={profilePlaceholder} behavior={PROFILE_IMAGE_BEHAVIOR} style={styles.profileImagePlaceHolder} />
                  <Image source={this.state.profileImage} behavior={PROFILE_IMAGE_BEHAVIOR} style={styles.profileImage} />
                  <Image style={styles.profileImageAddButton} source={imageAddButton} />
                  {renderIf(!this.state.profileImageValid, <Text style={styles.profileValidation}>Required</Text>)}
                </TouchableOpacity>
                <Text style={styles.profileImageText}> 
                  Please select an image for your profile. This image will be shown to other users on the platform.
                </Text>
              </View>
              <PrimaryTextInput
                onChangeText={usernameField => this.setState({usernameField})}
                title={USER_NAME_PLACEHOLDER_STRING}
                returnKeyType={RETURN_KEY_TYPE} 
                keyboardType={DEFAULT_KEYBOARD_TYPE}
                valid={this.state.usernameIsValid}
                validationMessage={USER_NAME_VALIDATION_MESSAGE_STRING} 
                autoCapitalize={AUTO_CAPITIALIZE_NONE_PROPERTY}/>
              <PrimaryTextInput
                onChangeText={emailField => this.setState({emailField})}
                title={EMAIL_FIELD_PLACEHOLDER_STRING}
                returnKeyType={RETURN_KEY_TYPE} 
                keyboardType={EMAIL_KEYBOARD_TYPE}
                valid={this.state.emailIsValid}
                validationMessage={EMAIL_VALIDATION_MESSAGE_STRING} 
                autoCapitalize={AUTO_CAPITIALIZE_NONE_PROPERTY}/>
              <PrimaryTextInput 
                onChangeText={passwordField => this.setState({passwordField})}
                title={PASSWORD_FIELD_PLACEHOLDER_STRING}
                secureTextEntry
                returnKeyType={RETURN_KEY_TYPE}
                keyboardType={DEFAULT_KEYBOARD_TYPE}
                autoCapitalize={AUTO_CAPITIALIZE_NONE_PROPERTY}/>
              <PrimaryTextInput 
                onChangeText={confirmPasswordField => this.setState({confirmPasswordField})} 
                title={CONFIRM_PASSWORD_FIELD_PLACEHOLDER_STRING}
                secureTextEntry
                returnKeyType={RETURN_KEY_TYPE}
                keyboardType={DEFAULT_KEYBOARD_TYPE}
                valid={this.state.confirmPasswordIsValid}
                validationMessage={PASSWORD_VALIDATION_MESSAGE_STRING} 
                autoCapitalize={AUTO_CAPITIALIZE_NONE_PROPERTY}/>
              <PrimaryButton onPress={() => this._onSignUpbuttonPress()} buttonText={SIGNUP_BUTTON_STRING}/>
            </CardView>
          </KeyboardAvoidingView>
        </ScrollView>
        <ActivityIndicatorOverlay isFetching={this.props.isFetching}/>
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
    paddingBottom: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems:"center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.MID_GREY
  },
  profileImagePlaceHolder:{
    width: 120,
    height: 120,
    borderRadius: 60,
    tintColor: COLORS.PRIMARY
  },
  profileImage:{
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    top: 0,
    left: 0
  },
  profileImageText:{
    marginLeft: 20,
    flex: 1,
    flexWrap: "wrap",
    fontFamily: FONTS.PRIMARY
  },
  profileImageAddButton:{
    position: "absolute",
    right: 0, 
    top: 0,
    width: 35,
    height: 35,
    opacity: 0.9
  },
  profileValidation:{
    textAlign: "center",
    fontFamily: FONTS.PRIMARY,
    color: COLORS.RED
  }
})

///////////////////////
// Map to props
///////////////////////

const mapStateToProps = (state) => {
  return {
    isFetching: state.session.isFetching,
    isErrored: state.session.isErrored,
    isLoggedIn: state.session.isLoggedIn
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    accountSignup: (username, email, password, profileImagePath, imageMime) => dispatch(accountSignup(username, email, password, profileImagePath, imageMime))
  };
}



export default connect(mapStateToProps, mapDistpatchToProps)(Signup);
