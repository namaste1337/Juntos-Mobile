////////////////////////
// Imports
////////////////////////

import React, { Component } from 'react';
import {bindActionCreators, connect} from 'react-redux';
import { 
Text, 
Dimensions,
ScrollView,
StyleSheet } from 'react-native';

////////////////////////
// Constants
////////////////////////
const screenCenter                  = Dimensions.get('window').width/2;

class Profile extends Component {


  tabBarOnPress(){
    
  }

  ////////////////////////
  // Navigation options
  ////////////////////////

  static navigationOptions = {
   
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