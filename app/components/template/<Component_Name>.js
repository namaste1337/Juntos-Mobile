// The prupose of this file is to define 
// and standardize the organization of an
// Custom Comonent file. Each section below
// has been defined to organize code in regards 
// to it's function.


// Note:
// Each action file must have a descriptive 
// purpose at the top of the file.


////////////////////////
// Import Modules
////////////////////////

// Note: node module imports
import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text
} from 'react-native';
import PropTypes from "prop-types";

////////////////////////
// Import Commmon Files
////////////////////////

// Note: Common files located in app/common
// Conditional rendering
import {renderIf} from "./../../common/components";

////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";

////////////////////////
// Constants
////////////////////////

// Note: Constants must be defined with all uppercase
// letters seprating words with by underscore (_).
// The constants must be seperated by purpose, and each 
// constant name followed by a pre-defined type.

// Ex:
// //Images
// const PROFILE_IMAGE = require("../assets/profile/profile_image.png");
// //Strings
// const PROFILE_NAME_STRING = @"John";
// //Numbers
// const IMAGE_COUNT_NUMBER = 5;
// //Properties 
// const IMAGE_SIZE_WIDTH_PROPERTY  = 100;
// const IMAGE_SIZE_HEIFHT_PROPERTY = 100
// //States
// const INITIAL_PROFILE_IMAGE_SOURCE_STATE =  require("../assets/profile/default_profile.png")


////////////////////////
// Component
/////////////////////////

class  <Component_Name> extends Component {


  ////////////////////////
  // Default Props
  ////////////////////////

  static defaultProps = {
    ...Component.defaultProps,
    // Default props definitions
  }

  ////////////////////////
  // Constructor
  ////////////////////////

  constructor(props){

    super(props)
    this.state = {
    // Initial state definitions
    }
  }

  ////////////////////////
  // Life Cycle
  ////////////////////////


  ////////////////////////
  // Getters and Setters
  ////////////////////////

  //Note: Public and private getters and setters

  ////////////////////////
  // Callbacks
  ////////////////////////

  ////////////////////////
  // Methods
  ////////////////////////

  // Note: Publci and private methods

  render(){

    return (

    )
  }

}


////////////////////////
// Prop Type Checks
////////////////////////

<Component_Name>.propTypes = {
  //Prop validation definitions for custom props
}

export default <Component_Name>;

