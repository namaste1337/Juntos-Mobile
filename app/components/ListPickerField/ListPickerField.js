////////////////////////
// Import Modules
////////////////////////

import React, { Component } from 'react';
import Picker from 'react-native-picker';
import {
  View,
} from 'react-native'

////////////////////////
// Imports Common Files
////////////////////////

// Conditional rendering
import {renderIf} from "./../../common/components";

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


////////////////////////
// Componenet
////////////////////////

class  ListPickerField extends Component {

  ////////////////////////
  // Constructor
  ////////////////////////

  constructor(props){

    super(props)
    this.state = {
      textInputValue: "",
    }


  }

  componentDidMount(){

    Picker.init({
      pickerData: this.props.pickerData
    });

  }

  ////////////////////////
  // Callbacks
  ////////////////////////

  // Handles dispalyingthe picker when 
  // the input field is focused
  _onPrimaryInputFocus(){

    Picker.show();

  }

  ////////////////////////
  // Methods
  ////////////////////////

  render(){

    return(
      <View>
        <StaticField
        placeholder={this.props.placeholder}
        value={this.state.textInputValue}
        onPress={() => this._onPrimaryInputFocus() }
        valid={this.props.valid}
        validationMessage={this.props.validationMessage}/>
        <View style={[styles.datePickerWrapper]} />
      </View>
    )
  }
};


     

export default ListPickerField;