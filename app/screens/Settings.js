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
StyleSheet 
} from 'react-native';

////////////////////////
// Constants
////////////////////////
const screenCenter                  = Dimensions.get('window').width/2;
const PROJECT_TABBAR_ICON_IMAGE     = require('./../assets/tabbar/settings_icon.png')

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
        style={[styles.tabBarIcon, {tintColor: tintColor}]}
      />
    )
  }

  ////////////////////////
  // Callbacks
  ////////////////////////


  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    return (
     <ScrollView style={styles.container}>
      <Text>Settings</Text>
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
  tabBarIcon:{
    width: 25,
    height: 25
  }
});

////////////////////////
// Map to props
////////////////////////

const mapStateToProps = (state) => {
  return {
    isFetching: state.session.isFetching,
    isErrored: state.session.isErrored
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    sessionLogin: (email, password) => dispatch(sessionLogin(email, password))
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(Settings);