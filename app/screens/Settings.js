////////////////////////
// Imports
////////////////////////

import React, { Component } from 'react';
import {bindActionCreators, connect} from 'react-redux';
import { 
Text, 
Dimensions,
ScrollView,
Image,
StyleSheet,
TouchableOpacity,
View,
} from 'react-native';
var DeviceInfo = require('react-native-device-info');

//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles from "../common/styles"

////////////////////////
// Actions
////////////////////////

import {accountLogout} from "./../actions/account-actions.js";

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import PrimaryButton from './../components/PrimaryButton';
import StaticField from './../components/StaticField';

////////////////////////
// Constants
////////////////////////
const screenCenter                  = Dimensions.get('window').width/2;
// Images
const PROJECT_TABBAR_ICON_IMAGE     = require('./../assets/tabbar/settings_icon.png');
// Strings
const EMAIL_TITLE_STRING            = "E-mail";
const USERNAME_TITLE_STRING         = "Username";
const VERSION_TITLE_STRING          = "Version";
const LOG_OUT_BUTTON_STRING         = "Log out";

class Settings extends Component {


  tabBarOnPress(){
    
  }


  ////////////////////////
  // Navigation Options
  ////////////////////////

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Image
        source={PROJECT_TABBAR_ICON_IMAGE}
        style={[CommonStyles.tabBarIcon, {tintColor: tintColor}]}
      />
    )
  }

  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    return (
     <ScrollView style={CommonStyles.container}>
      <View style={CommonStyles.contentWrapper}>
        { this.props.currentUser != null &&
        <View>
          <StaticField title={EMAIL_TITLE_STRING} value={this.props.currentUser.email} />
          <StaticField title={USERNAME_TITLE_STRING} value={this.props.currentUser.username} />
          <StaticField title={VERSION_TITLE_STRING} value={DeviceInfo.getVersion()} />
        </View>
        }
        <View style={CommonStyles.contentWrapper}>
           <PrimaryButton 
           buttonText={LOG_OUT_BUTTON_STRING}
           onPress={this.props.logout} />
        </View>
      </View>
     </ScrollView>
    );
  }
}

////////////////////////
// Screen Styles
////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

////////////////////////
// Map to props
////////////////////////

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(accountLogout())
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(Settings);