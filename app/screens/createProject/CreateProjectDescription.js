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

import PrimaryButton from "./../../components/PrimaryButton";
import PrimaryTextInput from "./../../components/PrimaryTextInput";
import GooglePlaces from "./../../components/GooglePlaces"

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
const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
 

class CreateProjectDescription extends Component {


  ////////////////////////
  // Callbacks
  ////////////////////////
  ////////////////////
  // Constructor
  ////////////////////

  constructor(props){
    super(props);
    this.state = { 
      placeSearchVisible: "none",
      placeSearchFocus: false,
      projectNameField: "",
      projetDescriptionField: "",
      locationValue: "",
      geometryLocation: "",
    };
  }


  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    console.log(this.state);
    return (
      <View style={CommonStyles.container}>
      <KeyboardAvoidingView behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR} style={CommonStyles.contentWrapper}>
        <PrimaryTextInput
          onChangeText={projectNameField => this.setState({projectNameField})} 
          placeholder={PROJECT_NAME_FIELD_PLACEHOLDER_STRING}
          returnKeyType={RETURN_KEY_TYPE} 
          validationMessage={EMAIL_VALIDATION_MESSAGE_STRING} />
        <PrimaryTextInput 
          onChangeText={projetDescriptionField => this.setState({projetDescriptionField})} 
          placeholder={LOCATION_FIELD_PLACEHOLDER_STRING} 
          returnKeyType={RETURN_KEY_TYPE}
          keyboardType={DEFAULT_KEYBOARD_TYPE}
          value={this.state.locationValue}
          onFocus={()=>{
            this.setState({placeSearchVisible: "flex", placeSearchFocus: true});
            this._places.triggerFocus()
          }}/>
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
      <View style={{
        position: "absolute",
        backgroundColor: '#FFF',
        display: this.state.placeSearchVisible,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}>
        <GooglePlaces 
        ref={ref=> this._places = ref}/>
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
  },
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