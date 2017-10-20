////////////////////////
// Imports
////////////////////////

import {
  View,
  TextInput
} from 'react-native'
import styles from "./styles"
import React from 'react';
import createReactClass from 'create-react-class'


////////////////////////
// Constants
////////////////////////

//Strings
const PLACE_HOLDER_TEXT_COLOR = "#000"; // Move to commons/styles.js
const ANDROID_UNDERLINE_COLOR = 'rgba(0,0,0,0)'; // Move to commons/styles.js

/////////////////////////////
// Presentational Component
/////////////////////////////

const PrimaryTextInput = createReactClass({

  render(){
    return (
      <View style={styles.inputWrap}>
        <TextInput
          underlineColorAndroid={ANDROID_UNDERLINE_COLOR}
          placeholderTextColor={PLACE_HOLDER_TEXT_COLOR}
          placeholder={this.props.placeHolder}
          style={styles.input}
          keyboardType={this.props.keyboardType} 
          autoCorrect={this.props.autoCorrect}
          returnKeyType={this.props.returnKeyType} 
          onChangeText={(passwordField) => this.props.onTextChange(passwordField)}
          secureTextEntry={this.props.secure} />
      </View>
    )
  }
});

export default PrimaryTextInput;