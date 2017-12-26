////////////////////////
// Import Modules
////////////////////////

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native'

////////////////////////
// Imports Common Files
////////////////////////

// Conditional rendering
import {renderIf} from "./../../common/components";

////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";

////////////////////////
// Componenet
////////////////////////

class  InputValidation extends Component {

  ////////////////////////
  // Methods
  ////////////////////////

  render(){

    return(
      <View style={styles.inputValidationWrapper}>
        {this.props.children}
        {renderIf(!this.props.valid, <Text style={styles.inputValidationMessage}> {this.props.validationMessage} </Text>)}
      </View>
    )
  }
};     

export default InputValidation;