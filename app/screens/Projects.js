/////////////////////////////
// Imports
/////////////////////////////

import React, { Component } from 'react';
import {bindActionCreators, connect} from 'react-redux';
import MapView from 'react-native-maps';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  Image
} from 'react-native';

/////////////////////////////
// Import Common Files
/////////////////////////////

import {deviceTypes} from "./../common/device";

/////////////////////////////
// Import Custom Components
/////////////////////////////

import PrimaryButton from "./../components/PrimaryButton";
import ActivityIndicatorOverlay from './../components/ActivityIndicatorOverlay';

////////////////////////
// Import Services
////////////////////////

import {getProjects} from "./../services/api/projects";

////////////////////////
// Constants
////////////////////////

const { width, height }                   = Dimensions.get('window');
const ASPECT_RATIO                        = width / height;
const LATITUDE_DELTA                      = 0.0500;
const LONGITUDE_DELTA                     = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_LONGITUDE                   = 95.50; // Center of the U.S.
const INITIAL_LATITUDE                    = -98.35; // Center of the U.S.
const REGION_ANIMATION_DURATION_PROPERTY  = 500;
const GPS_HIGH_ACCURACY_BOOL              = true;
const PROJECT_TABBAR_ICON_IMAGE           = require('./../assets/tabbar/project_icon.png')

class Projects extends Component {

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
  // Constructor
  ////////////////////////

  constructor(props){
    super(props)
    // Set the initial region for the map component
    this.state = {
      region: {
        latitude: INITIAL_LONGITUDE,
        longitude: INITIAL_LATITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
    }
  }

  ////////////////////////
  // Callback
  ////////////////////////
 
 // Handles on region changes for the map component
  _onRegionChange(region){

    this.setState({region});

  }
  
  // Handles login for Map onMapReady callback
  // for the map component
  _onMapReady(){

    // If the users device is iOS, prompt for 
    // location permissions
    if(Platform.OS == deviceTypes.ios)
      navigator.geolocation.requestAuthorization();
    // Get the users current location
    navigator.geolocation.getCurrentPosition(data => {
      console.log(data);
      // Compose animated map region
      let region = new MapView.AnimatedRegion({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA

      });

      // Animate to the region
      this._map.animateToRegion(region, REGION_ANIMATION_DURATION_PROPERTY);
      this.setState({region});

    }, error => {

      console.log(error);

    }, {
      enableHighAccuracy: GPS_HIGH_ACCURACY_BOOL // Allows for high accuracy gps coordinates
    }); 

  }

  ////////////////////////
  // LifeCycle
  ////////////////////////

  componentDidMount(){

  }

  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {

    return (
      <View style={styles.container}>
        <MapView
        ref={ref => this._map = ref}  
        showsUserLocation 
        style={styles.map}
        onRegionChange={ region => this._onRegionChange(region)}
        onMapReady={ () => this._onMapReady() }
        />
      </View>
    );
  }

}

////////////////////////
// Screen Styles
////////////////////////

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    // Props go here
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    // Action props that require dispatch go here
  };
}



export default connect(mapStateToProps, mapDistpatchToProps)(Projects);
