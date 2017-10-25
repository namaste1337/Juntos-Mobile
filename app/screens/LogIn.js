//////////////////////////////
// Imports
///////////////////////////////

import React, { Component } from 'react';
import {bindActionCreators, connect} from 'react-redux';
import { sessionLogin } from '../actions/sessions-actions';
import { NavigationActions } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
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
import PrimaryButton from './../components/PrimaryButton';
import TouchableText from './../components/TouchableText';

////////////////////////
// Constants
////////////////////////

// Images
const logo = require("./../assets/login/mobile_logo.png");
//Navigation
const NAVIGATE_SIGNUP                       = "Signup";
const NAVIGATE_FORGOT_PASSWORD              = "ForgotPassword";
//Properties
const LOGO_IMAGE_RESIZE_MODE_PROPERTY       = "contain";
const KEYBOARD_AVOIDING_BEHAVIOR_PROPERTY   = "padding";
const USERNAME_FIELD_KEYBOARD_TYPE_PROPERTY = "email-address";
const USERNAME_FIELD_AUTO_CORRECT_PROPERTY  = false;
const PASSWORD_FIELD_KEYBOARD_TYPE_PROPERTY = "default";
const INPUT_FIELD_RETURN_KEY_TYPE           = "done";
//Strings
const USERNAME_FIELD_PLACE_HOLDER_STRING    = "E-mail";
const PASSWORD_FIELD_PLACE_HOLDER_STRING    = "Password";
const FORGOT_PASSWORD_TEXT_STRING           = "Forgot Password?";
const SIGN_IN_TEXT_STRING                   = "Sign In";
const SIGN_UP_TEXT_STRING                   = "Sign Up";
// Bools
const SCROLL_ENABLED_BOOL                   = false;
const SECURE_FIELD_BOOL                     = true;


class Login extends Component {

  ////////////////////////
  // Life Cycle
  ////////////////////////

  componentWillMount() {

    ////////////////////////
    // Callbacks
    ////////////////////////

    this.onSignInPressed         = () => this.props.sessionLogin(this.state.usernameField, this.state.passwordField);
    this.onSignUpPressed         = () => this.props.navigation.navigate(NAVIGATE_SIGNUP);
    this.onForgotPasswordPressed = () => this.props.navigation.navigate(NAVIGATE_FORGOT_PASSWORD);
    
  }

  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    // Handles login once the user has been authenticated
    // Should be moved else where, currently react native
    // is throwing a warning in regards to segues while
    // re-redering

    if(this.props.isLoggedIn){
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Main'})
         ]
      })
      this.props.navigation.dispatch(resetAction);
    }

    return (
      <View style={CommonStyles.container} >
        <KeyboardAvoidingView behavior={KEYBOARD_AVOIDING_BEHAVIOR_PROPERTY} style={CommonStyles.keyboardViewWrapper}>
          <View style={styles.logoWrap}>
            <Image 
              source={logo} 
              style={styles.logo} 
            resizeMode={LOGO_IMAGE_RESIZE_MODE_PROPERTY} />
          </View>
          <View style={CommonStyles.contentWrapper}>
            <PrimaryTextInput 
              placeholder={USERNAME_FIELD_PLACE_HOLDER_STRING} 
              keyboardType={USERNAME_FIELD_KEYBOARD_TYPE_PROPERTY}
              autoCorrect={USERNAME_FIELD_AUTO_CORRECT_PROPERTY}
              returnKeyType={INPUT_FIELD_RETURN_KEY_TYPE}
              onChangeText={(usernameField) => this.setState({usernameField})} />
            <PrimaryTextInput 
              placeholder={PASSWORD_FIELD_PLACE_HOLDER_STRING} 
              keyboardType={PASSWORD_FIELD_KEYBOARD_TYPE_PROPERTY}
              returnKeyType={INPUT_FIELD_RETURN_KEY_TYPE} 
              onChangeText={(passwordField) => this.setState({passwordField})}
              secureTextEntry/>
            <TouchableText 
              text={FORGOT_PASSWORD_TEXT_STRING} 
              onPress={this.onForgotPasswordPressed} 
              style={styles.forgotPasswordText} /> 
            <PrimaryButton 
              buttonText={SIGN_IN_TEXT_STRING} 
              onPress={this.onSignInPressed} />
          </View>
          <View style={CommonStyles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Dont have an account?</Text>
              <TouchableText 
                text={SIGN_UP_TEXT_STRING} 
                onPress={this.onSignUpPressed} 
              style={styles.signupLinkText} /> 
            </View>
          </View>
        </KeyboardAvoidingView>
        <ActivityIndicatorOverlay isFetching={this.props.isFetching}/>
      </View>
    );
  }
}



////////////////////////
// Screen Styles
////////////////////////

const styles = StyleSheet.create({

  logoWrap: {
    marginVertical: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 1,
  },
  forgotPasswordText: {
    color: "#404040",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
    paddingBottom: 10,
    fontFamily: 'Roboto-Light'
  },
  accountText: {
    color: "#404040",
    alignItems: "center",
    fontFamily: 'Roboto-Light'
  },
  signupWrap: {
    marginVertical: 20,
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  signupLinkText: {
    marginLeft: 5,
    color: "#FF3366",
    fontFamily: 'Roboto-Light'
  },

});


////////////////////////
// Map to props
////////////////////////

const mapStateToProps = (state) => {
  return {
    isFetching: state.session.isFetching,
    isErrored: state.session.isErrored,
    isLoggedIn: state.session.isLoggedIn,
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    sessionLogin: (email, password) => dispatch(sessionLogin(email, password))
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(Login);
