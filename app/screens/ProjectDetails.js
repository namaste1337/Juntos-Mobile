////////////////////////
// Imports
////////////////////////

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { 
Text, 
StyleSheet,
TouchableOpacity,
View
} from 'react-native';
import { NavigationActions } from 'react-navigation'

//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles from "./../common/styles.js"

////////////////////////////
// Import Screen Components
////////////////////////////

import Details from "./components/Details";

////////////////////////
// Actions
////////////////////////

import {createNewProject, resetProjectNavigation} from "../actions/project-actions";

////////////////////////
// Constants
////////////////////////

//Strings
const SAVE_STRING = "Save";

class ProjectDetails extends Component {

  ////////////////////////
  // Navigation Options
  ////////////////////////

  static navigationOptions = ({navigation}) => {

    const params = navigation.state.params || {};

    return {
      headerRight: (
        <TouchableOpacity onPress={() => params.onSubmit()}>
          <Text style={CommonStyles.headerTextButton}>{SAVE_STRING}</Text>
        </TouchableOpacity>
      ),
    }

  }

  ////////////////////////
  // Life Cycle
  ////////////////////////

  componentWillMount(){
    this.props.navigation.setParams({ onSubmit: this._onSubmit });
  }

  ////////////////////////
  // Callbacks
  ////////////////////////

  // Handles saving the project to the server
  // and reseting the navigation back to the root screen
  _onSubmit = () => {
    this.props.createNewProject(this.props.tempProject);
    this.props.resetProjectNavigation();
  }

  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    return (
      <Details
      images={this.props.tempProject.images}
      projectName={this.props.tempProject.name}
      startDate={this.props.tempProject.start_date}
      endDate={this.props.tempProject.end_date}
      currentStatus={this.props.tempProject.current_status}
      projectType={this.props.tempProject.type}
      foodProvided={this.props.tempProject.food_provided}
      description={this.props.tempProject.description}
      user={this.props.currentUser}
      location={this.props.tempProject.location}/>
    );
  }
}


////////////////////////
// Map to props
////////////////////////

const mapStateToProps = (state) => {
  return {
    tempProject: state.project.tempProject,
    currentUser: state.session.user
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    createNewProject: projectObject => dispatch(createNewProject(projectObject)),
    resetProjectNavigation : () => dispatch(resetProjectNavigation())
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(ProjectDetails);