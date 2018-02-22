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

////////////////////////////
// Import Screen Components
////////////////////////////

import Details from "./components/Details";

////////////////////////
// Actions
////////////////////////


class ProjectDetails extends Component {

  ////////////////////////
  // Navigation Options
  ////////////////////////

  static navigationOptions = {
    headerRight: <TouchableOpacity><Text>Done</Text></TouchableOpacity>,
  }

  ////////////////////////
  // Callbacks
  ////////////////////////

  _onSubmit(){
    const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Root'})
    ]
    })
    this.props.navigation.dispatch(resetAction)
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
    createNewProject: projectObject => dispatch(createNewProject(projectObject))
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(ProjectDetails);