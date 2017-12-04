////////////////////////
// Imports
////////////////////////

import React, { Component } from 'react';
import {bindActionCreators, connect} from 'react-redux';
import {  
StyleSheet,
View,
KeyboardAvoidingView
} from 'react-native';

//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles from "./../../common/styles.js"
import {deviceProperties} from "./../../common/device.js"

////////////////////////
// Actions
////////////////////////


//////////////////////////////
// Imports Custom Components
///////////////////////////////

import PrimaryButton from './../../components/PrimaryButton';
import PrimaryTextInput from "./../../components/PrimaryTextInput";

////////////////////////
// Constants
////////////////////////

// Strings
const PROJECT_NAME_FIELD_PLACEHOLDER_STRING     = "Project Name";
const LOCATION_FIELD_PLACEHOLDER_STRING         = "Location";
const DESCRIPTION_FIELD_PLACEHOLDER_STRING      = "Description";
const NEXT_BUTTON_STRING                        = "Next";
const EMAIL_VALIDATION_MESSAGE_STRING           = "E-mail is invalid";
const PASSWORD_VALIDATION_MESSAGE_STRING        = "Password is invalid or does not match";
// Properties
const RETURN_KEY_TYPE                           = "done";
const DEFAULT_KEYBOARD_TYPE                     = "default";
const KEYBOARD_AVOIDING_VIEW_BEHAVIOR           = "position";
const MULTILINE_INPUT_MAX_CHARACTER_PROPERTY    = 300;
// Bools
const MULTILINE_ENABLED_BOOL                    = true;


class CreateProjectDescription extends Component {


  ////////////////////////
  // Callbacks
  ////////////////////////


  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    return (
      <View style={CommonStyles.container}>
        <KeyboardAvoidingView behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR} style={CommonStyles.contentWrapper}>
          <PrimaryTextInput
            onChangeText={emailField => this.setState({emailField})} 
            placeholder={PROJECT_NAME_FIELD_PLACEHOLDER_STRING}
            returnKeyType={RETURN_KEY_TYPE} 
            validationMessage={EMAIL_VALIDATION_MESSAGE_STRING} />
          <PrimaryTextInput 
            onChangeText={passwordField => this.setState({passwordField})} 
            placeholder={LOCATION_FIELD_PLACEHOLDER_STRING} 
            returnKeyType={RETURN_KEY_TYPE}
            keyboardType={DEFAULT_KEYBOARD_TYPE}/>
          <PrimaryTextInput 
            onChangeText={confirmPasswordField => this.setState({confirmPasswordField})} 
            placeholder={DESCRIPTION_FIELD_PLACEHOLDER_STRING} 
            multiline={MULTILINE_ENABLED_BOOL}
            maxLength={MULTILINE_INPUT_MAX_CHARACTER_PROPERTY}
            returnKeyType={RETURN_KEY_TYPE}
            keyboardType={DEFAULT_KEYBOARD_TYPE}
            validationMessage={PASSWORD_VALIDATION_MESSAGE_STRING} />
        </KeyboardAvoidingView>
        <View style={styles.buttonWrapper}> 
          <PrimaryButton style={styles.nextButton} onPress={() => this._onSignUpbuttonPress()} buttonText={NEXT_BUTTON_STRING}/>
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
  buttonWrapper:{
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  nextButton:{
    flex: 1,
    left: 0,
    marginHorizontal: 20,
    marginVertical: 20,
  }
});

////////////////////////
// Map to props
////////////////////////

const mapStateToProps = (state) => {
  return {

  };
}

const mapDistpatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(CreateProjectDescription);