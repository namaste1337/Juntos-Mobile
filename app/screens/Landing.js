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

import { 
  redirectToSignedIn, 
  redirectToSignedOut,
  accountUpdateUser
} from '../actions/account-actions';

//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles,{COLORS} from "../common/styles";
import {getUser} from "../common/storage"

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
        getUser().then(user => {
         if(user != undefined && user != "null"){
          this.props.accountUpdateUser(JSON.parse(user));
          this.props.redirectToSignedIn();
          // Check if the users session is still valid
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

        <View style={[CommonStyles.container, styles.containerOverrides]}>
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

  containerOverrides:{
    backgroundColor: COLORS.WHITE
  },
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
    redirectToSignedOut: redirectToSignedOut,
    accountUpdateUser: accountUpdateUser
  }, dispatch);
  
}

export default connect(null, matchDistpatchToProps)(LandingView);