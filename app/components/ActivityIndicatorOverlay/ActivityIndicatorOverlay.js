////////////////////////
// Import Modules
////////////////////////

import React, { Component } from 'react';
import {
  ActivityIndicator,
  View
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
// Constants
////////////////////////

//Strings
const ACTIVITY_INDICATOR_SIZE = "large";
//Bools
const IS_ANIMATION = true;

////////////////////////
// Componenet
////////////////////////

class  ActivityIndicatorOverlay extends Component {

  ////////////////////////
  // Methods
  ////////////////////////

  render(){
    
    // Property is required to determine if
    // the activity is visible or hidden
    let isFetching = this.props.isFetching;

    return(
      renderIf(isFetching,
        <View style={styles.overlay}>
            <ActivityIndicator 
          style={styles.centering}
          animating={IS_ANIMATION} size={ACTIVITY_INDICATOR_SIZE}/>
        </View>
      )
    )
  }
};
     

export default ActivityIndicatorOverlay;