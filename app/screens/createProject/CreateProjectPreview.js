////////////////////////
// Imports
////////////////////////

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { 
StyleSheet,
View
} from 'react-native';
import { NavigationActions } from 'react-navigation'

//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles from "./../../common/styles.js"

////////////////////////////
// Import Screen Components
////////////////////////////

import Details from "./../components/Details";
import ActivityIndicatorOverlay from "./../../components/ActivityIndicatorOverlay";
import TouchableText from "./../../components/TouchableText";

////////////////////////
// Actions
////////////////////////

import {createNewProject, resetProjectNavigation} from "./../../actions/project-actions";

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
        <TouchableText parentStyle={CommonStyles.headerParentStyle} style={CommonStyles.headerTextButton} text={SAVE_STRING} onPress={() => params.onSubmit()} />
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
  }

  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    return (
      <View style={styles.detailsWrapper}>
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
        address={this.props.tempProject.location.address}
        latitude={this.props.tempProject.location.coordinates.lat}
        longitude={this.props.tempProject.location.coordinates.lng}/>
        <ActivityIndicatorOverlay isFetching={this.props.isSending}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  detailsWrapper:{
    flex: 1
  }

})

////////////////////////
// Map to props
////////////////////////

const mapStateToProps = (state) => {
  return {
    tempProject: state.project.tempProject,
    isSending: state.project.isSending,
    currentUser: state.session.user
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    createNewProject: projectObject => dispatch(createNewProject(projectObject)),
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(ProjectDetails);