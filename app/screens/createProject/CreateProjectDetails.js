////////////////////////
// Imports
////////////////////////

import React, { Component } from 'react';
import {bindActionCreators, connect} from 'react-redux';
import { 
View,
KeyboardAvoidingView,
StyleSheet
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

import DatePickerField from './../../components/DatePickerField';
import PrimaryButton from './../../components/PrimaryButton';

////////////////////////
// Constants
////////////////////////
const KEYBOARD_AVOIDING_VIEW_BEHAVIOR               = "position";
const NEXT_BUTTON_STRING                            = "Next";

class CreateProjectDetails extends Component {


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
          <DatePickerField placeHolder={"Project Start"}/>
          <DatePickerField placeHolder={"Project End"}/>
        </KeyboardAvoidingView>
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
  }
});

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