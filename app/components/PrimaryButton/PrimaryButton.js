////////////////////////
// Imports
////////////////////////

import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native'

////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";

////////////////////////
// Constants
////////////////////////

//Strings
const ACTIVE_OPACITY = 0.5; // Move to commons/styles.js

////////////////////////
// Component
////////////////////////

class  PrimaryButton extends Component {

  ////////////////////////
  // Methods
  ////////////////////////

  render(){
    return (
      <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={this.props.onPress}>
        <View style={[styles.button, this.props.style]}><Text style={[styles.buttonText, this.props.textStyle]}>{this.props.buttonText}</Text></View>
      </TouchableOpacity>
    )
  }
}

export default PrimaryButton;