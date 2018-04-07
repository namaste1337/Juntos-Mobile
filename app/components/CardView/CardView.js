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

// Conditional rendering
import {renderIf} from "./../../common/components";

////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";

////////////////////////
// Componenet
////////////////////////

class  CardView extends Component {

  ////////////////////////
  // Methods
  ////////////////////////

  render(){

    return(
      <View onPress={this.props.onPress} style={[styles.cardViewWrapper, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
};     
export default CardView;