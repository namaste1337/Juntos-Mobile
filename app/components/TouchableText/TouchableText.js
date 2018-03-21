////////////////////////
// Import Modules
////////////////////////

import React, { Component } from 'react';
import {
  View,
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
// Properties
const HIT_SLOP_PROPERTY = {top: 10, left: 10,bottom: 10, right: 10};
////////////////////////
// Component
////////////////////////

class  TouchableText extends Component {

  ////////////////////////
  // Methods
  ////////////////////////

  render(){
    return (
      <TouchableOpacity style={this.props.parentStyle} hitSlop={HIT_SLOP_PROPERTY} onPress={this.props.onPress} activeOpacity={ACTIVE_OPACITY}>
        <Text style={[styles.textButton, this.props.style]} >{this.props.text}</Text>
      </TouchableOpacity>
    )
  }

}

export default TouchableText;