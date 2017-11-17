////////////////////////
// Import Modules
////////////////////////

import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native'

////////////////////////
// Constants
////////////////////////

//Strings
const ACTIVE_OPACITY = 0.5; // Move to commons/styles.js

////////////////////////
// Component
////////////////////////

class  TouchableText extends Component {

  ////////////////////////
  // Methods
  ////////////////////////

  render(){
    return (
      <TouchableOpacity activeOpacity={ACTIVE_OPACITY}>
        <View>
          <Text style={this.props.style} onPress={this.props.onPress}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }

}

export default TouchableText;