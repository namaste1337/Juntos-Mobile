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
View
} from 'react-native';

//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles from "./../../common/styles.js"

////////////////////////
// Actions
////////////////////////

import {accountLogout} from "./../../actions/account-actions.js";

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import PrimaryButton from './../../components/PrimaryButton';

////////////////////////
// Constants
////////////////////////
const screenCenter                  = Dimensions.get('window').width/2;

class CreateProjectDetails extends Component {


  tabBarOnPress(){
    
  }


  ////////////////////////
  // Navigation Options
  ////////////////////////

  static navigationOptions = {
    headerRight: <TouchableOpacity><Text>Next</Text></TouchableOpacity>,
  }

  ////////////////////////
  // Callbacks
  ////////////////////////


  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    return (
     <ScrollView style={CommonStyles.container}>
     <Text> Create Project Details </Text>
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
    logout: () => dispatch(accountLogout())
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(CreateProjectDetails);