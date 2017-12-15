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
import CommonStyles from "./../../common/styles"
import {deviceProperties} from "./../../common/device"

////////////////////////
// Actions
////////////////////////

import {
populateTempDescription,
navigateToProjectDetails
} from "./../../actions/project-actions"

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
const PROJECT_NAME_FIELD_PLACEHOLDER_STRING              = "Project Name";
const LOCATION_FIELD_PLACEHOLDER_STRING                  = "Location";
const DESCRIPTION_FIELD_PLACEHOLDER_STRING               = "Description";
const NEXT_BUTTON_STRING                                 = "Next";
const FIELD_VALIDATION_MESSAGE_STRING                    = "Field cannot be empty";
// Properties 
const RETURN_KEY_TYPE_PROPERTY                           = "done";
const DEFAULT_KEYBOARD_TYPE_PROPERTY                     = "default";
const KEYBOARD_AVOIDING_VIEW_BEHAVIOR_PROPERTY           = "position";
const MULTILINE_INPUT_MAX_CHARACTER_PROPERTY             = 300;
const GOOGLE_PLACES_WRAPPER_VISIBLE_PROPERTY             = "flex";
const GOOGLE_PLACES_WRAPPER_INVISIBLE_PROPERTY           = "none";
// Bool 
const GOOGLE_PLACES_FOCUS_ENABLED_TRUE_BOOL              = true;
const MULTILINE_ENABLED_TRUE_BOOL                        = true;
const PROJECT_NAME_VALIDATION_TRUE_STATE_BOOL            = true;
const PROJECT_NAME_VALIDATION_FALSE_STATE_BOOL           = false;
const PROJECT_LOCATION_VALIDATION_TRUE_STATE_BOOL        = true;
const PROJECT_LOCATION_VALIDATION_FALSE_STATE_BOOL       = false;
const PROJECT_DESCRIPTION_VALIDATION_TRUE_STATE_BOOL     = true;
const PROJECT_DESCRIPTION_VALIDATION_FALSE_STATE_BOOL    = false

class CreateProjectDescription extends Component {

  ///////////////////////
  // Constructor
  ///////////////////////

  constructor(props){
    super(props);
    this.state = { 
      placeSearchVisible: "none",
      placeSearchFocus: false,
      projectNameField: "",
      projectDescriptionField: "",
      projectLocationField: "",
      geometryLocation: "",
      projectNameIsValid: PROJECT_NAME_VALIDATION_TRUE_STATE_BOOL,
      projectLocationIsValid: PROJECT_LOCATION_VALIDATION_TRUE_STATE_BOOL,
      projectDescriptionIsValid: PROJECT_DESCRIPTION_VALIDATION_TRUE_STATE_BOOL
    };
  }

  ////////////////////////
  // Callbacks
  ////////////////////////

  _onGooglePlacesPress(data, details){
    this.setState({
      placeSearchVisible: GOOGLE_PLACES_WRAPPER_INVISIBLE_PROPERTY,
      projectLocationField: details.formatted_address,
      geometryLocation: details.geometry.location
    })
  }

  _onSignUpbuttonPress(){

    if(this._validateFields()){
      console.log("Fields are valid");
      let projectName        = this.state.projectNameField;
      let projectLocation    = {
        coordinates: this.state.geometryLocation,
        address: this.state.projectLocationField
      };
      let projectDescription = this.state.projetDescriptionField;

      // Set the the data the store 
      this.props.populateTempDescription(projectName, projectLocation, projectDescription);
      
      // Navigate to next view to continue the create project sequence
      this.props.navigateToProjectDetails();

    }

  }

  ////////////////////////
  // Methods
  ////////////////////////

  // handles validating the projectName value
  _validateProjectName(projectName){

    if(projectName == ""){
      this.setState({projectNameIsValid: PROJECT_NAME_VALIDATION_FALSE_STATE_BOOL});
      return false;
    }else{
      this.setState({projectNameIsValid: PROJECT_NAME_VALIDATION_TRUE_STATE_BOOL});
      return true;
    }

  }

  // Handles validating the ProjectLocation value
  _validateLocation(projectLocation){

    if(projectLocation == ""){
      this.setState({projectLocationIsValid: PROJECT_LOCATION_VALIDATION_FALSE_STATE_BOOL});
      return false;
    }else{
      this.setState({projectLocationIsValid: PROJECT_LOCATION_VALIDATION_TRUE_STATE_BOOL});
      return true;
    }

  }

  // Handles validating the projectDescriptionf field value
  _validateDescription(projectDescription){
    console.log(projectDescription);
    if(projectDescription == ""){
      this.setState({projectDescriptionIsValid: PROJECT_DESCRIPTION_VALIDATION_FALSE_STATE_BOOL});
      return false;
    }else{
      this.setState({projectDescriptionIsValid: PROJECT_DESCRIPTION_VALIDATION_TRUE_STATE_BOOL});
      return true; 
    }

  }

  // Handles field validation
  _validateFields(){

    let isValid = true;
    //Fields
    let projectName             = this.state.projectNameField;
    let projectLocation         = this.state.projectLocationField;
    let projectDescriptionField = this.state.projectDescriptionField;

    // Validate project name field
    isValid = this._validateProjectName(projectName);
    if(!isValid)
       return isValid;
    // Validate project location field
    isValid = this._validateLocation(projectLocation);
    if(!isValid)
      return isValid;
    // Validate project description field
    isValid = this._validateDescription(projectDescriptionField)
    if(!isValid)
      return isValid;

    return true;

  }

  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {

    return (
      <View style={CommonStyles.container}>
      <KeyboardAvoidingView behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR_PROPERTY} style={CommonStyles.contentWrapper}>
        <PrimaryTextInput
          onChangeText={projectNameField => this.setState({projectNameField})} 
          placeholder={PROJECT_NAME_FIELD_PLACEHOLDER_STRING}
          returnKeyType={RETURN_KEY_TYPE_PROPERTY} 
          validationMessage={FIELD_VALIDATION_MESSAGE_STRING} 
          valid={this.state.projectNameIsValid}/>
        <PrimaryTextInput  
          placeholder={LOCATION_FIELD_PLACEHOLDER_STRING} 
          returnKeyType={RETURN_KEY_TYPE_PROPERTY}
          keyboardType={DEFAULT_KEYBOARD_TYPE_PROPERTY}
          value={this.state.projectLocationField}
          validationMessage={FIELD_VALIDATION_MESSAGE_STRING}
          valid={this.state.projectLocationIsValid}
          onFocus={()=>{
            this.setState({placeSearchVisible: GOOGLE_PLACES_WRAPPER_VISIBLE_PROPERTY, placeSearchFocus: GOOGLE_PLACES_FOCUS_ENABLED_TRUE_BOOL});
            this._places.triggerFocus()
          }}/>
        <PrimaryTextInput 
          onChangeText={projectDescriptionField => this.setState({projectDescriptionField})} 
          placeholder={DESCRIPTION_FIELD_PLACEHOLDER_STRING} 
          multiline={MULTILINE_ENABLED_TRUE_BOOL}
          maxLength={MULTILINE_INPUT_MAX_CHARACTER_PROPERTY}
          returnKeyType={RETURN_KEY_TYPE_PROPERTY}
          keyboardType={DEFAULT_KEYBOARD_TYPE_PROPERTY}
          validationMessage={FIELD_VALIDATION_MESSAGE_STRING}
          valid={this.state.projectDescriptionIsValid} />
      </KeyboardAvoidingView>
      <View style={CommonStyles.buttonFixedWrapper}> 
        <PrimaryButton style={CommonStyles.buttonFixedBottom} onPress={() => this._onSignUpbuttonPress()} buttonText={NEXT_BUTTON_STRING}/>
      </View>
      <View style={[styles.googlePlacesWrapper, { display: this.state.placeSearchVisible }]}>
        <GooglePlaces 
        ref={ref=> this._places = ref}
        onPress={(data, details) => this._onGooglePlacesPress(data, details)}/>
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
  googlePlacesWrapper:{
    position: "absolute",
    backgroundColor: '#FFF',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

////////////////////////
// Map to props
////////////////////////

const mapStateToProps = (state) => {
  return {
    tempProject: state.project
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    populateTempDescription: (projectName, projectLocation, projectDescription) => dispatch(populateTempDescription(projectName, projectLocation, projectDescription)),
    navigateToProjectDetails: () => dispatch(navigateToProjectDetails())
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(CreateProjectDescription);