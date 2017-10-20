////////////////////////
// Imports
////////////////////////

import {
  ActivityIndicator,
  View
} from 'react-native'
import React from 'react';
import createReactClass from 'create-react-class'
import styles from "./styles"
import {renderIf} from "./../../common/components"

////////////////////////
// Constants
////////////////////////

//Strings
const ACTIVITY_INDICATOR_SIZE = "large";

//Bools
const IS_ANIMATION = true;

/////////////////////////////
// Presentational Component
/////////////////////////////

const ActivityIndicatorOverlay = createReactClass({
  
      render(){
        // Property is requires to determine if
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
});
     

export default ActivityIndicatorOverlay;