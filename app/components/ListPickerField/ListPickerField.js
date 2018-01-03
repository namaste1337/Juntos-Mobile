////////////////////////
// Import Modules
////////////////////////

import React, { Component } from 'react';
import Pickerrr from 'react-native-picker';
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

    let data = [];
    for(var i=0;i<100;i++){
        data.push(i);
    }

    console.log(Pickerrr)

    Pickerrr.init();

  }

  ////////////////////////
  // Callbacks
  ////////////////////////

  // Handles dispalyingthe picker when 
  // the input field is focused
  _onPrimaryInputFocus(){

    // this._datePicker.onPressDate();
    Pickerrr.show();
    console.log(Pickerrr)

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