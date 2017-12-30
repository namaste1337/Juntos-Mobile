////////////////////////
// Import Modules
////////////////////////

// Note: node module imports
import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  DatePickerIOS,
  DatePickerAndroid,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import PropTypes from "prop-types";
import DatePicker from 'react-native-datepicker'

////////////////////////
// Import Commmon Files
////////////////////////

import {deviceOS, deviceType} from "./../../common/device";
import {COLORS} from "./../../common/styles";

////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import StaticField from './../StaticField';

////////////////////////
// Constants
////////////////////////

// Properties
const DATE_PICKER_MODE_PROPERTY         = "date";
// Strings
const DATE_PICKER_CONFIRM_BUTTON_STRING = "Done";
const DATE_PICKER_CANCEL_BUTTON_STRING  = "Cancel";
const DATE_PICKER_DEFAULT_VALUE_STRING  = "";
// Bools
const DATE_PICKER_SHOW_ICON_BOOL        = false;
const DATE_PICKER_HIDE_TEXT_BOOL        = true;   
const DATE_PICKER_EDITABLE_BOOL         = true;     

////////////////////////
// Component
/////////////////////////

class DatePickerField extends Component {

  ////////////////////////
  // Constructor
  ////////////////////////

  constructor(props){

    super(props)
    this.state = {
    	defaultDate: new Date,
    	textInputValue: DATE_PICKER_DEFAULT_VALUE_STRING
    }

  }

  ////////////////////////
  // Callbacks
  ////////////////////////

  _onDatePickerFocus(){

    if(deviceOS == deviceTypes.ios){

    }else if(deviceOS == deviceTypes.android){

    }

  }

  // Handlee dispalying the date picker when 
  // the input field is focused
  _onPrimaryInputFocus(){
    console.log("Attempting to show date picker");
    Keyboard.dismiss();
    this._datePicker.onPressDate();

  }

  // Handles updating the date selected by the suer
  _onDateChange(date){

  	this.setState({
  		defaultDate: date,
  		textInputValue: date
  	})

  }

  ////////////////////////
  // Methods
  ////////////////////////

  // Note: Publci and private methods

  render(){

    return (
      <View>
        <StaticField
        placeholder={this.props.placeholder}
        value={this.state.textInputValue}
        onPress={() => this._onPrimaryInputFocus() }
        valid={this.props.valid || true}
        validationMessage={this.props.validatioMessage}/>
        <View style={[styles.datePickerWrapper]}>
        	<DatePicker 
          ref={ref => this._datePicker = ref}
        	mode={DATE_PICKER_MODE_PROPERTY}
          showIcon={DATE_PICKER_SHOW_ICON_BOOL}
          hideText={DATE_PICKER_HIDE_TEXT_BOOL}
          confirmBtnText={DATE_PICKER_CONFIRM_BUTTON_STRING}
          cancelBtnText={DATE_PICKER_CANCEL_BUTTON_STRING}
          customStyles={buttonStyles}
        	date={this.state.defaultDate} 
        	onDateChange={(date) => this._onDateChange(date)}/>
        </View>
      </View>
    )
  }

}


/////////////////////////
// Styes
////////////////////////

// Special react-native-datepicker requires
//  a style object with property overrides.
const buttonStyles= {
  btnTextConfirm: {
    color: COLORS.PRIMARY
  }
}

////////////////////////
// Prop Type Checks
////////////////////////

DatePickerField.propTypes = {
  //Prop validation definitions for custom props
}

export default DatePickerField;

