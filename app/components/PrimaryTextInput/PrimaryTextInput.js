////////////////////////
// Imports
////////////////////////

import {
  View,
  TextInput,
  Text
} from 'react-native';
import styles from "./styles";
import React from 'react';
import PropTypes from "prop-types";
import createReactClass from 'create-react-class';

////////////////////////
// Imports Common Files
////////////////////////

// Conditional rendering
import {renderIf} from "./../../common/components";

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

  ////////////////////////
  // Getters & Setters
  ////////////////////////


  // Set initial state
  getInitialState(){
    return {multilineCount: 0}
  },

  // Set default props
  getDefaultProps(){
    return{
      valid: true,
      validationMessage: ""
    }
  },

   ////////////////////////
  // Component
  ////////////////////////

  // Renders component
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
          onChangeText={field =>{
            {/* If multiline is enabled increment the count */}
            if(this.props.multiline){
              this.setState({multilineCount: field.length});
            }
            {/* Pass the field to the parent component */}
            this.props.onChangeText(field);
          }}
          placeholderTextColor={PLACE_HOLDER_TEXT_COLOR}
          underlineColorAndroid={ANDROID_UNDERLINE_COLOR} 
          style={textInputStyle} />
          <View style={styles.footer}>
            {/* Render the multilineCounter when multiline is enabled */}
            {renderIf(this.props.multiline, 
            <View>
              <Text style={styles.multilineCounter}>{this.state.multilineCount}/{this.props.maxLength}</Text>
            </View>
            )}
            {/* Render the validation */}
          </View>
          {renderIf(!this.props.valid, <Text style={styles.inputValidationMessage}> {this.props.validationMessage} </Text>)}
      </View>
    )
  }
});

////////////////////////
// Prop type checking
////////////////////////

PrimaryTextInput.propTypes ={
  valid: PropTypes.bool,
  validationMessage: PropTypes.string
}

export default PrimaryTextInput;