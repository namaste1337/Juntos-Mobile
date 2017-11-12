//////////////////////////////
// Imports
///////////////////////////////

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import React, {Component} from 'react';
import {
  StyleSheet,
  View, 
  Button,
  Image,
} 
from 'react-native';

//////////////////////////////
// Imports actions
///////////////////////////////

import { redirectToSignedIn, redirectToSignedOut } from '../actions/account-actions';

//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles from "../common/styles";
import {getLoginState} from "../common/storage"

////////////////////////
// Constants
////////////////////////

// Images
const logo                            = require("./../assets/login/mobile_logo.png");
// Properties 
const LOGO_IMAGE_RESIZE_MODE_PROPERTY = "contain";
const LANDING_TIMER                   = 3000;

class LandingView extends Component {

    ////////////////////////
    // Methods
    ////////////////////////

     // The following method determines the next transitions
     // based on a logInState boolean retrieved from async store.
     determineTransition(){
        getLoginState().then(value => {
         let isSignedIn = value;
         if(isSignedIn || isSignedIn === "undefined"){
          this.props.redirectToSignedIn();
         }else{
          this.props.redirectToSignedOut();
         }
        }).catch( error => {
         console.log(error);
        })

     }

     componentDidMount(){
      console.log(this.props);
      // Show the landing screen for 3 seconds
      setTimeout(() => this.determineTransition(), LANDING_TIMER);

     }

    ////////////////////////
    // Screen UI
    ////////////////////////

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

////////////////////////
// Map to props
////////////////////////

function matchDistpatchToProps(dispatch){

  return bindActionCreators({
    redirectToSignedIn: redirectToSignedIn,
    redirectToSignedOut: redirectToSignedOut
  }, dispatch);
  
}

export default connect(null, matchDistpatchToProps)(LandingView);