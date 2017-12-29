////////////////////////
// Import Modules
////////////////////////

import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native'

////////////////////////
// Imports Common Files
////////////////////////

// Conditional rendering
import {renderIf} from "./../../common/components";

////////////////////////
// Custom Components
////////////////////////

import InputValidation from "./../InputValidation"

////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";

////////////////////////
// Componenet
////////////////////////

class  StaticField extends Component {

  ////////////////////////
  // Callbacks
  ////////////////////////

  // Handles on press callback from touch opacity
  _onPress(){

    if(this.props.onPress != null){
      this.props.onPress();
    }

  }

  ////////////////////////
  // Methods
  ////////////////////////

  render(){

    return(
      <TouchableOpacity onPress={()=> this._onPress() }>
        <InputValidation valid={this.props.valid} validationMessage={this.props.validationMessage}>
 
          {renderIf(this.props.value == null || this.props.value === "" ,
            <Text style={styles.text}> {this.props.placeHolder} </Text>
          )}
          {renderIf(this.props.value !== "",
            <Text style={styles.text}> {this.props.value} </Text>
          )}
        </InputValidation>
      </TouchableOpacity>
    )
  }

};
     

export default StaticField;