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

/////////////////////////////
// Import Common Files
/////////////////////////////

import CommonStyles from "./../common/styles"

////////////////////////
// Constants
////////////////////////
const screenCenter                  = Dimensions.get('window').width/2;
const PROJECT_TABBAR_ICON_IMAGE     = require('./../assets/tabbar/messages_icon.png')

class Profile extends Component {


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
  // Callbacks
  ////////////////////////


  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    return (
     <ScrollView style={styles.container}>
      <Text>Messages</Text>
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
    isFetching: state.session.isFetching,
    isErrored: state.session.isErrored
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    sessionLogin: (email, password) => dispatch(sessionLogin(email, password))
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(Profile);