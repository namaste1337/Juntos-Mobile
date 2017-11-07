//////////////////////////////
// Imports
///////////////////////////////

import React, {Component} from 'react';
import {
  StyleSheet,
  View, 
  Button,
  Image,
} 
from 'react-native';


//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles from "../common/styles.js";

////////////////////////
// Constants
////////////////////////

// Images
const logo = require("./../assets/login/mobile_logo.png");
// Properties 
const LOGO_IMAGE_RESIZE_MODE_PROPERTY = "contain";

class LandingView extends Component {
     render(){
      return (
        <View style={CommonStyles.container}>
          <View style={styles.logoWrapper}>
            <Image style={styles.logoImage} source={logo} resizeMode={LOGO_IMAGE_RESIZE_MODE_PROPERTY}/>
          </View>
        </View>
      );
    }
};


////////////////////////
// Screen Styles
////////////////////////

const styles = StyleSheet.create({

  logoWrapper:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logoImage:{
    height: 200,
    width: 200
  }

});

export default LandingView;