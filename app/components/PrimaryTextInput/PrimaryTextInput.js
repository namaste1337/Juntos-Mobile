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
          {...this.props}
          placeholderTextColor={PLACE_HOLDER_TEXT_COLOR}
          onChangeText={(passwordField) => this.props.onTextChange(passwordField)}
          underlineColorAndroid={ANDROID_UNDERLINE_COLOR} 
          style={styles.input} />
      </View>
    )
  }
});

          

          // placeholder={this.props.placeHolder}
          // keyboardType={this.props.keyboardType} 
          // autoCorrect={this.props.autoCorrect}
          // returnKeyType={this.props.returnKeyType} 
          // secureTextEntry={this.props.secure}

export default PrimaryTextInput;