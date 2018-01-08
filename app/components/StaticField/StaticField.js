////////////////////////
// Import Modules
////////////////////////

import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native'
import PropTypes from "prop-types";

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
            <Text style={styles.placeHolderText}> {this.props.placeholder} </Text>
          )}
          {renderIf(this.props.value !== "" && this.props.value != null,
            <Text style={styles.text}> {this.props.value} </Text>
          )}
        </InputValidation>
      </TouchableOpacity>
    )
  }

};

////////////////////////
// Prop Type Checks
////////////////////////

StaticField.propTypes = {
  //Prop validation definitions for custom props
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired

}

export default StaticField;