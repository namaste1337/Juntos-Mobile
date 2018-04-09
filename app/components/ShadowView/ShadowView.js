////////////////////////
// Import Modules
////////////////////////

import React, { Component } from 'react';
import {
  View,
} from 'react-native'

////////////////////////
// Imports Common Files
////////////////////////


////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";

////////////////////////
// Componenet
////////////////////////

class  ShadowView extends Component {

  ////////////////////////
  // Methods
  ////////////////////////

  render(){

    return(
      <View onPress={this.props.onPress} style={[styles.shadowViewWrapper, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
};     
export default ShadowView;