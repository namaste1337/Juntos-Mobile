////////////////////////
// Imports
////////////////////////

import {
  View,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native'
import React from 'react';
import createReactClass from 'create-react-class'


////////////////////////
// Constants
////////////////////////

//Strings
const ACTIVE_OPACITY = 0.5; // Move to commons/styles.js

/////////////////////////////
// Presentational Component
/////////////////////////////

const TouchableText = createReactClass({

  render(){
    return (
      <TouchableOpacity activeOpacity={ACTIVE_OPACITY}>
        <View>
          <Text style={this.props.style} onPress={this.props.onPress}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
});

export default TouchableText;