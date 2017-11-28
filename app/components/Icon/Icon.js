// Component renders a touchable icon.
// Icon defaults to 25 x 25

////////////////////////
// Import Modules
////////////////////////

import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image
} from 'react-native';
import PropTypes from "prop-types";

////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";

////////////////////////
// Component
/////////////////////////

/*
  -Required Props

  source: type String, Icon image source

  -Optional Props

  onPress: type Function, onPress event for icon

*/

class Icon extends Component {

  ////////////////////////
  // Methods
  ////////////////////////


  render(){

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image style={styles.iconImage} source={this.props.source} />
      </TouchableOpacity>
    )
  }

}

////////////////////////
// Prop Type Checks
////////////////////////

Icon.propTypes = {
  source: PropTypes.string.isRequired
}

export default Icon;
