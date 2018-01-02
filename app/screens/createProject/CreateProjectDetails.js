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

////////////////////////
// Constants
////////////////////////
const KEYBOARD_AVOIDING_VIEW_BEHAVIOR               = "position";
const NEXT_BUTTON_STRING                            = "Next";

class CreateProjectDetails extends Component {

  constructor(props){
    super(props)
    this.state = {
      foodProvidedValue: ""
    }
  }

  ////////////////////////
  // Callbacks
  ////////////////////////


  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    return (
      <View style={CommonStyles.container}>
        <View style={CommonStyles.buttonFixedWrapper}> 
          <PrimaryButton style={CommonStyles.buttonFixedBottom} onPress={() => this._onSignUpbuttonPress()} buttonText={NEXT_BUTTON_STRING}/>
        </View>
        <KeyboardAvoidingView behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR} style={CommonStyles.contentWrapper}>
          <DatePickerField  
          placeholder={"Project Start"} 
          validationMessage={"Required Field"} 
          valid={false} />
          <DatePickerField placeholder={"Project End"} 
          validationMessage={"Required Field"}
          valid={false}/>
          <PrimaryTextInput placeholder={"Test"} valid={false} validationMessage={"Test"}/>
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