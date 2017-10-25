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
const PLACE_HOLDER_TEXT_COLOR = "#858384"; // Move to commons/styles.js
const ANDROID_UNDERLINE_COLOR = 'rgba(0,0,0,0)'; // Move to commons/styles.js

/////////////////////////////
// Presentational Component
/////////////////////////////

const PrimaryTextInput = createReactClass({




  render(){

    //Configure the style for singleline and multiline
    let textInputWrapStyle = styles.inputWrap;
    let textInputStyle     = styles.input;

    if(this.props.multiline){
      textInputWrapStyle = styles.multilineInputWrapSmall;
      textInputStyle     = styles.multilineInputSmall;
    }

    return (
      <View style={textInputWrapStyle}>
        <TextInput
          {...this.props}
          placeholderTextColor={PLACE_HOLDER_TEXT_COLOR}
          underlineColorAndroid={ANDROID_UNDERLINE_COLOR} 
          style={textInputStyle} />
      </View>
    )
  }
});


export default PrimaryTextInput;