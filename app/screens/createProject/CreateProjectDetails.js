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

import {accountLogout} from "./../../actions/account-actions.js";

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
const EMPTY_STRING                              = "";
const PROJECT_START_PLACEHOLDER_STRING          = "Project Start";
const PROJECT_END_PLACEHOLDER_STRING            = "Project End";
const FOOD_PROVIDED_PLACEHOLDER_STRING          = "Food Provided";
const CURRENT_STATUS_PLACEHOLDER_STRING         = "Current Status";
const PROJECT_TYPE_PLACEHOLDER_STRING           = "Project Type";
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
      isProjetStartDateValid: PROJECT_START_VALID_TRUE_BOOL,
      isProjectEndDateValid: PROJECT_END_VALID_TRUE_BOOL,
      isFoodProvidedValid: FOOD_PROVIDED_VALID_TRUE_BOOL,
      isCurrentStatusValid: CURRENT_STATUS_VALID_TRUE_BOOL,
      isProjectTypeValid: PROJECT_TYPE_VALID_TRUE_BOOL

    }
  }

  ////////////////////////
  // Setters and Getters
  ////////////////////////

  // Sets the project start date value to state
  set _projectStartDate(value){

    this.setState({
      projectStartDateValue: value
    });
    
  }

  // Retrieves the project start date value from state
  get _projectStartDate(){

    return this.state.projectStartDateValue;

  }

  // Sets the project end date value to state
  set _projectEndDate(value){

    this.setState({
      projectEndDateValue: value
    });

  }

  // Retrieves the project end date value from state
  get _projectStartDate(){

    return this.state.projectEndDateValue;

  }

  // Sets the food provided value to state
  set _foodProvided(value){

    this.setState({
      foodProvidedValue: value
    });

  }

  // Retrieves the food provided value from state
  get _foodProvided(){

    return this.state.foodProvidedValue;

  }

  // Sets the current status date value to state
  set _currentStatus(value){

    this.setState({
      currentStatusValue: value
    })

  }

  // Retrieves the current status value from state
  get _currentStatus(){

    return this.state.currentStatusValue

  }

   // Sets the project type date value to state
  set _projectType(value){

    this.setState({
      projectTypeValue: value
    })

  }

  // Retrieves the project type value from state
  get _projectType(){

    return this.state.projectTypeValue;

  }

  ////////////////////////
  // Callbacks
  ////////////////////////

  // Handles on project start date value change
  _onProjectStartDateChange(value){

    this._projectStartDate = value;

  }

  // Handles on project end date value change
  _onProjectEndDateChange(value){

    this._projectEndDate = value;

  }

  // Handles on food provided value change
  _onFoodProvidedChange(value){

    this._foodProvided = value;

  }

  // Handles on current status value change
  _onCurrentStatusChange(value){

    this._currentStatus = value;

  }

  // Handles on project type value change
  _onProjectTypeValueChange(value){

    this._projectType = value;

  }


  // Handles on project start date value change
  _onNexButtonPress(){
    
    let isValid = this._validateFields();

    // if(isValid)
      // Proceed to the next screen
  }

  ////////////////////////
  // Methods
  ////////////////////////



  _validateFields(){

    // if()


    // return true
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
          valid={this.state.isProjetStartDateValid} 
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
// Screen Styles
////////////////////////


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
    logout: () => dispatch(accountLogout())
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(CreateProjectDetails);