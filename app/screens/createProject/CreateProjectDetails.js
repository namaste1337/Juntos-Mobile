////////////////////////
// Imports
////////////////////////

import React, { Component } from 'react';
import {bindActionCreators, connect} from 'react-redux';
import { 
View,
KeyboardAvoidingView,
StyleSheet,
Picker
} from 'react-native';

//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles from "./../../common/styles.js"

////////////////////////
// Actions
////////////////////////

import {populateTempDetails, navigateToCreateProjectImages} from "./../../actions/project-actions.js";

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import PrimaryTextInput from './../../components/PrimaryTextInput';
import DatePickerField from './../../components/DatePickerField';
import PrimaryButton from './../../components/PrimaryButton';
import ListPickerField from './../../components/ListPickerField';

////////////////////////
// Constants
////////////////////////
// Properties
const KEYBOARD_AVOIDING_VIEW_BEHAVIOR_PROPERTY  = "position";
// Strings
const REQUIRED_FIELDS_STRING                    = "Required Field";
const NEXT_BUTTON_STRING                        = "Next";
const PROJECT_START_PLACEHOLDER_STRING          = "Project Start";
const PROJECT_END_PLACEHOLDER_STRING            = "Project End";
const FOOD_PROVIDED_PLACEHOLDER_STRING          = "Food Provided";
const CURRENT_STATUS_PLACEHOLDER_STRING         = "Current Status";
const PROJECT_TYPE_PLACEHOLDER_STRING           = "Project Type";
const EMPTY_STRING                              = "";
// Bools
const PROJECT_START_VALID_TRUE_BOOL             = true;
const PROJECT_START_VALID_FALSE_BOOL            = false;
const PROJECT_END_VALID_TRUE_BOOL               = true;
const PROJECT_END_VALID_FALSE_BOOL              = false;
const FOOD_PROVIDED_VALID_TRUE_BOOL             = true;
const FOOD_PROVIDED_VALID_FALSE_BOOL            = false;
const CURRENT_STATUS_VALID_TRUE_BOOL            = true;
const CURRENT_STATUS_VALID_FALSE_BOOL           = false;
const PROJECT_TYPE_VALID_TRUE_BOOL              = true;
const PROJECT_TYPE_VALID_FALSE_BOOL             = false;
// Data
const FOOD_PROVIDED_PICKER_DATA                 = ["Yes", "No"];
const CURRENT_STATUS_PICKER_DATA                = ["Planning", "In Progress", "Finalizing"];
const PROJECT_TYPE_PICKER_DATA                  = ["Donation", "Senior Citizens", "Animals", "Enviroment", "School"];

class CreateProjectDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      projectStartDateValue: EMPTY_STRING,
      projectEndDateValue: EMPTY_STRING,
      foodProvidedValue: EMPTY_STRING,
      currentStatusValue: EMPTY_STRING,
      projectTypeValue: EMPTY_STRING,
      isProjectStartDateValid: PROJECT_START_VALID_TRUE_BOOL,
      isProjectEndDateValid: PROJECT_END_VALID_TRUE_BOOL,
      isFoodProvidedValid: FOOD_PROVIDED_VALID_TRUE_BOOL,
      isCurrentStatusValid: CURRENT_STATUS_VALID_TRUE_BOOL,
      isProjectTypeValid: PROJECT_TYPE_VALID_TRUE_BOOL

    }
  }

  ////////////////////////
  // Setters and Getters
  ////////////////////////

  // Sets the project start date validation state
  set _isProjectStartDateValid(bool){
    this.setState({
      isProjectStartDateValid: bool
    })

  }

  // Sets the project end date validation state
  set _isProjectEndDateValid(bool){

    this.setState({
      isProjectEndDateValid: bool
    })

  }

  // Sets the food provided validation state
  set _isFoodProvidedValid(bool){

    this.setState({
      isFoodProvidedValid: bool
    })

  }

  // Sets the current status valid validation state
  set _isCurrentStatusValid(bool){

    this.setState({
      isCurrentStatusValid: bool
    })

  }

  // Sets the project type validation state
  set _isProjectTypeValid(bool){

    this.setState({
      isProjectTypeValid: bool
    })

  }

  ////////////////////////
  // Callbacks
  ////////////////////////

  // Handles on project start date value change
  _onProjectStartDateChange(value){

    this.setState({
      projectStartDateValue: value
    });

  }

  // Handles on project end date value change
  _onProjectEndDateChange(value){

    this.setState({
      projectEndDateValue: value
    });

  }

  // Handles on food provided value change
  _onFoodProvidedChange(value){

    this.setState({
      foodProvidedValue: value
    });


  }

  // Handles on current status value change
  _onCurrentStatusChange(value){

    this.setState({
      currentStatusValue: value
    })

  }

  // Handles on project type value change
  _onProjectTypeValueChange(value){

    this.setState({
      projectTypeValue: value
    })

  }


  // Handles on project start date value change
  _onNexButtonPress(){
    
    let isValid = this._validateFields();
    if(isValid){
 
        // Set the data to the store
        this.props.populateTempDetails(
          this.state.projectStartDateValue, 
          this.state.projectEndDateValue, 
          this.state.foodProvidedValue, 
          this.state.currentStatusValue, 
          this.state.projectTypeValue
        );

        // Navigate to the next screen
        this.props.navigateToCreateProjectImages();

    }
      
  }

  ////////////////////////
  // Methods
  ////////////////////////

  // Helper method validates for empty string
  _validateForEmptyField(value){

    return (value !== EMPTY_STRING);

  }


  // Handles validating project start date value
  _validateProjectStartDate(dateValue){
    
    let isValid;

    // Validate for Empty Field
    this._isProjectStartDateValid = isValid = this._validateForEmptyField(dateValue);

    return isValid; 

  }


  //Handles validating project end date
  _validateProjectEndDate(dateValue){  

    let isValid;

    // Validate for Empty Field
    this._isProjectEndDateValid = isValid = this._validateForEmptyField(dateValue);

    return isValid;

  }

  // Handles validating for food provided value
  _validateFoodProvided(foodProvidedValue){

    let isValid;
     // Validate for Empty Field
    this._isFoodProvidedValid = isValid = this._validateForEmptyField(foodProvidedValue);
 
    return isValid

  }

  // Handles validating of current status value
  _validateCurrentStatus(currentStatusValue){

    let isValid;

    // Validate for Empty Field
    this._isCurrentStatusValid = isValid = this._validateForEmptyField(currentStatusValue);

    return isValid 

  }

  // Handles validating of project type value
  _validateProjectType(projectTypeValue){

    let isValid;

     // Validate for Empty Field
    this._isProjectTypeValid = isValid = this._validateForEmptyField(projectTypeValue);

    return isValid

  }

  // Handles validating all required field values
  _validateFields(){

    let isValid = true;

    // Validate project state date value
    isValid = this._validateProjectStartDate(this.state.projectStartDateValue);
    if(!isValid)
       return isValid;

    // Validate project end date value
    isValid = this._validateProjectEndDate(this.state.projectEndDateValue);
    if(!isValid)
       return isValid;

    // Validate food provided value
    isValid = this._validateFoodProvided(this.state.foodProvidedValue);
    if(!isValid)
       return isValid;

    // Validate current status value
    isValid = this._validateCurrentStatus(this.state.currentStatusValue);
    if(!isValid)
       return isValid;

    // Validate project type value
    isValid = this._validateProjectType(this.state.projectTypeValue);
    if(!isValid)
       return isValid;

    return isValid

  }


  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {

    return (
      <View style={CommonStyles.container}>
        <View style={CommonStyles.buttonFixedWrapper}> 
          <PrimaryButton style={CommonStyles.buttonFixedBottom} onPress={() => this._onNexButtonPress()} buttonText={NEXT_BUTTON_STRING}/>
        </View>
        <KeyboardAvoidingView behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR_PROPERTY} style={CommonStyles.contentWrapper}>
          <DatePickerField  
          placeholder={PROJECT_START_PLACEHOLDER_STRING} 
          validationMessage={REQUIRED_FIELDS_STRING} 
          valid={this.state.isProjectStartDateValid} 
          onDateChange={value => this._onProjectStartDateChange(value)}/>
          <DatePickerField placeholder={PROJECT_END_PLACEHOLDER_STRING} 
          validationMessage={REQUIRED_FIELDS_STRING}
          valid={this.state.isProjectEndDateValid}
          onDateChange={value => this._onProjectEndDateChange(value)}/>
         <ListPickerField 
          placeholder={FOOD_PROVIDED_PLACEHOLDER_STRING} 
          validationMessage={REQUIRED_FIELDS_STRING} 
          pickerData={FOOD_PROVIDED_PICKER_DATA}
          valid={this.state.isFoodProvidedValid}
          onValueChange={(value)=> this._onFoodProvidedChange(value)}/>
          <ListPickerField 
          placeholder={CURRENT_STATUS_PLACEHOLDER_STRING} 
          validationMessage={REQUIRED_FIELDS_STRING} 
          pickerData={CURRENT_STATUS_PICKER_DATA}
          valid={this.state.isCurrentStatusValid}
          onValueChange={(value)=> this._onCurrentStatusChange(value)}/>
          <ListPickerField 
          placeholder={PROJECT_TYPE_PLACEHOLDER_STRING} 
          validationMessage={REQUIRED_FIELDS_STRING} 
          valid={this.state.isProjectTypeValid}
          pickerData={PROJECT_TYPE_PICKER_DATA}
          onValueChange={(value)=> this._onProjectTypeValueChange(value)}/>
        </KeyboardAvoidingView>
      </View>
    );
  }
  
}

////////////////////////
// Map to props
////////////////////////

const mapStateToProps = (state) => {
  return {
    isFetching: state.session.isFetching,
    isErrored: state.session.isErrored
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    populateTempDetails: (startDate, endDate, foodProvided, currentStatus, projectType) => dispatch(populateTempDetails(startDate, endDate, foodProvided, currentStatus, projectType)),
    navigateToCreateProjectImages: () => dispatch(navigateToCreateProjectImages())
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(CreateProjectDetails);