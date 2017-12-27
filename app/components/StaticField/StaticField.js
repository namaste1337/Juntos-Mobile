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
  // Methods
  ////////////////////////

  render(){

    return(
      <TouchableOpacity>
        <InputValidation valid={true} validationMessage={"Message"}>
 
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