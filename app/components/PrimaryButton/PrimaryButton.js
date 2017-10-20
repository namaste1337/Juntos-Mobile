////////////////////////
// Imports
////////////////////////

import {
  View,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native'
import styles from "./styles"
import React from 'react';
import createReactClass from 'create-react-class'


////////////////////////
// Constants
////////////////////////

//Strings
const ACTIVE_OPACITY = 0.5; // Move to commons/styles.js

/////////////////////////////
// Presentational Component
/////////////////////////////

const PrimaryButton = createReactClass({

  render(){
    return (
      <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={this.props.onPress}>
        <View style={styles.button}><Text style={styles.buttonText}>{this.props.buttonText}</Text></View>
      </TouchableOpacity>
    )
  }
});

export default PrimaryButton;