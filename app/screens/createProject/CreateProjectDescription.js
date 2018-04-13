////////////////////////
// Imports
////////////////////////

import React, { Component } from 'react';
import {bindActionCreators, connect} from 'react-redux';
import {  
StyleSheet,
View,
KeyboardAvoidingView,
Keyboard
} from 'react-native';

 
//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles, {COLORS} from "./../../common/styles";
import {
deviceProperties,
deviceTypes, 
deviceOS 
} from "./../../common/device";

////////////////////////
// Actions
////////////////////////

import {
populateTempDescription,
navigateToCreateProjectDetails
} from "./../../actions/project-actions";

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import PrimaryButton from "./../../components/PrimaryButton";
import PrimaryTextInput from "./../../components/PrimaryTextInput";
import GooglePlaces from "./../../components/GooglePlaces";
import TouchableText from "./../../components/TouchableText";
import ShadowView from "./../../components/ShadowView";

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
const PROJECT_DESCRIPTION_VALIDATION_FALSE_STATE_BOOL    = false;

class CreateProjectDescription extends Component {

  ////////////////////////
  // Navigation Options
  ////////////////////////

  static navigationOptions = ({navigation}) => {

    const params = navigation.state.params || {};

    return {
      headerRight: (
        <TouchableText parentStyle={CommonStyles.headerParentStyle} style={CommonStyles.headerTextButton} text={NEXT_BUTTON_STRING} onPress={params.onNextButtonPress} />
      ),
    }

  }

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
  // Life Cycle
  ////////////////////////

  componentWillMount(){
    this.props.navigation.setParams({ onNextButtonPress: () => this._onNextButtonPress() });
  }

  ////////////////////////
  // Callbacks
  ////////////////////////

  // Handles google places on address press event
  _onGooglePlacesPress(data, details){
    this.setState({
      placeSearchVisible: GOOGLE_PLACES_WRAPPER_INVISIBLE_PROPERTY,
      projectLocationField: details.formatted_address,
      geometryLocation: details.geometry.location
    })
  }

  // Handles next button on press event
  _onNextButtonPress(){

    if(this._validateFields()){
     
      let projectName        = this.state.projectNameField;
      let projectLocation    = {
        coordinates: this.state.geometryLocation,
        address: this.state.projectLocationField
      };
      
      let projectDescription = this.state.projectDescriptionField;

      // Set the the data the store 
      this.props.populateTempDescription(projectName, projectLocation, projectDescription);
      
      // Navigate to next view to continue the create project sequence
      this.props.navigateToCreateProjectDetails();

      // Close the keyboard 
      if(deviceOS == deviceTypes.android)
        Keyboard.dismiss();

    }

  }

  // Handles on location focuse, makes the google place module visible
  _onLocationFieldFocus(){
    this.setState({placeSearchVisible: GOOGLE_PLACES_WRAPPER_VISIBLE_PROPERTY, placeSearchFocus: GOOGLE_PLACES_FOCUS_ENABLED_TRUE_BOOL});
    this._places.triggerFocus()
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
      <View style={[CommonStyles.container, {backgroundColor: "white"}]}>
                <View style={{borderColor: COLORS.MID_GREY, borderWidth: StyleSheet.hairlineWidth, flex: 1, margin: 20, paddingLeft: 10, paddingRight: 10, paddingBottom: 30, backgroundColor: "white", borderRadius: 10}}>
                  <KeyboardAvoidingView behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR_PROPERTY}>
                    <PrimaryTextInput
                      onChangeText={projectNameField => this.setState({projectNameField})} 
                      title={PROJECT_NAME_FIELD_PLACEHOLDER_STRING}
                      returnKeyType={RETURN_KEY_TYPE_PROPERTY} 
                      validationMessage={FIELD_VALIDATION_MESSAGE_STRING} 
                      valid={this.state.projectNameIsValid}/>
                    <PrimaryTextInput  
                      title={LOCATION_FIELD_PLACEHOLDER_STRING} 
                      returnKeyType={RETURN_KEY_TYPE_PROPERTY}
                      keyboardType={DEFAULT_KEYBOARD_TYPE_PROPERTY}
                      value={this.state.projectLocationField}
                      validationMessage={FIELD_VALIDATION_MESSAGE_STRING}
                      valid={this.state.projectLocationIsValid}
                      onFocus={() => this._onLocationFieldFocus() }/>
                    <PrimaryTextInput 
                      onChangeText={projectDescriptionField => this.setState({projectDescriptionField})} 
                      title={DESCRIPTION_FIELD_PLACEHOLDER_STRING} 
                      multiline={MULTILINE_ENABLED_TRUE_BOOL}
                      maxLength={MULTILINE_INPUT_MAX_CHARACTER_PROPERTY}
                      returnKeyType={RETURN_KEY_TYPE_PROPERTY}
                      keyboardType={DEFAULT_KEYBOARD_TYPE_PROPERTY}
                      validationMessage={FIELD_VALIDATION_MESSAGE_STRING}
                      valid={this.state.projectDescriptionIsValid} />
                  </KeyboardAvoidingView>
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
  tabBarIcon:{
    width: 25,
    height: 25
  },
  googlePlacesWrapper:{
    position: "absolute",
    backgroundColor: COLORS.WHITE,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10
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
    navigateToCreateProjectDetails: () => dispatch(navigateToCreateProjectDetails())
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(CreateProjectDescription);