/////////////////////////////
// Imports
/////////////////////////////

import React, { Component } from 'react';
import {bindActionCreators, connect} from 'react-redux';
import MapView from 'react-native-maps';
import {
  View,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';

/////////////////////////////
// Import Common Files
/////////////////////////////

import {
deviceTypes, 
deviceProperties
} from "./../common/device";
import {renderIf} from  "./../common/components";
import CommonStyles, {COLORS} from "../common/styles"

////////////////////////
// Actions
////////////////////////

import {navigateToCreateProject} from "./../actions/project-actions.js";

/////////////////////////////
// Import Custom Components
/////////////////////////////

import PrimaryButton from "./../components/PrimaryButton";
import ProjectCarousel from "./../components/ProjectCarousel";
import ActivityIndicatorOverlay from './../components/ActivityIndicatorOverlay';
import Icon from "./../components/Icon";

////////////////////////
// Import Services
////////////////////////

import {getProjects} from "./../services/api/projects";

////////////////////////
// Constants
////////////////////////

// Number
const ASPECT_RATIO_NUMBER                 = deviceProperties.width / deviceProperties.height;
const LATITUDE_DELTA_NUMBER               = 0.0900;
const LONGITUDE_DELTA_NUMBER              = LATITUDE_DELTA_NUMBER * ASPECT_RATIO_NUMBER;
const INITIAL_LONGITUDE_NUMBER            = 95.50; // Center of the U.S.
const INITIAL_LATITUDE_NUMBER             = -98.35; // Center of the U.S.
// Properties
const REGION_ANIMATION_DURATION_PROPERTY  = 500;
// Bools
const GPS_HIGH_ACCURACY_BOOL              = true;
// Image
const PROJECT_TABBAR_ICON_IMAGE           = require("./../assets/tabbar/project_icon.png");
const MAP_MARKER_IMAGE                    = require("./../assets/projects/map_marker.png");
const ADD_PROJECT_BUTTON_IMAGE            = require("./../assets/projects/add_project_button.png")
const TEMP_DATA = [
  {
    id: 1,
    image: "https://www.burney-falls.com/wp-content/uploads/2012/06/burney-cabin-m.jpg",
    title: "Wooden Home",
    lat: 37.27,
    long: -121.90
  },
  {
    id: 2,
    image: "https://odis.homeaway.com/odis/listing/2878aa26-7de3-4e26-95c0-41db54dde043.c10.jpg",
    title: "Stone Home",
    lat: 37.29,
    long: -121.85
  },
  {
    id: 3,
    image: "https://i.pinimg.com/736x/a9/43/4c/a9434cb6118f9ff113e9417b1add0f9c--wood-cottage-cottage-in-the-woods.jpg",
    title: "Recylced Home",
    lat: 37.24,
    long: -121.85
  },
  {
    id: 4,
    image: "https://www.centuryhomesph.com/wp-content/uploads/2015/05/Sustainable-homes-uk.jpg",
    title: "Natural Home",
    lat: 37.22,
    long: -121.78
  },
  {
    id: 5,
    image: "https://www.ignant.com/wp-content/uploads/2014/09/BuildingBetter_Sustainable_homes_01.jpg",
    title: "Natural Home",
    lat: 37.35,
    long: -121.78
  },
  {
    id: 6,
    image: "https://cdn.trendir.com/wp-content/uploads/old/house-design/2015/06/22/sustainable-shipping-container-house-1.jpg",
    title: "Natural Home",
    lat: 37.40,
    long: -121.78
  },
  {
    id: 7,
    image: "https://img.newatlas.com/top_sustainable_homes_2014-5.jpg?auto=format%2Ccompress&fit=max&h=670&q=60&w=1000&s=78310804011f3650cba83bd81eb120f7",
    title: "Natural Home",
    lat: 37.36,
    long: -121.20
  },
  {
    id: 8,
    image: "https://hometipsforwomen.com/wp-content/uploads/2014/09/solar-roof-panels-600.jpg",
    title: "Natural Home",
    lat: 37.20,
    long: -121.25
  },
  {
    id: 9,
    image: "https://www.goodhouseidea.com/wp-content/uploads/2017/08/living-home-c6.1-1.jpg",
    title: "Wooden Home",
    lat: 37.27,
    long: -121.80
  },
  {
    id: 10,
    image: "https://teamnacl.com/wp-content/uploads/2017/06/self-sustainable-homes-for-sale-in-arizonaself-homesteadself-europe-homesteading-videos-homesteads-960x640.jpg",
    title: "Stone Home",
    lat: 37.29,
    long: -121.70
  },
]

class Projects extends Component {


  _onAddIconPress(event){
    console.log("Add Icon Press");

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
  // Constructor
  ////////////////////////

  constructor(props){
    super(props)
    // Set the initial region for the map component
    this.state = {
      region: {
        latitude: INITIAL_LONGITUDE_NUMBER,
        longitude: INITIAL_LATITUDE_NUMBER,
        latitudeDelta: LATITUDE_DELTA_NUMBER,
        longitudeDelta: LONGITUDE_DELTA_NUMBER
      },
    }
  }

  ////////////////////////
  // Helper Method
  ////////////////////////

  // Handles animating the maps
  // to the specified region
  _animateTo(lat, long){
    let region = new MapView.AnimatedRegion({
      latitude: lat,
      longitude: long,
      latitudeDelta: LATITUDE_DELTA_NUMBER,
      longitudeDelta: LONGITUDE_DELTA_NUMBER
    });

    // Animate to the region
    this._map._component.animateToRegion(region, REGION_ANIMATION_DURATION_PROPERTY);
    this.setState({region});
  }

  ////////////////////////
  // Callback
  ////////////////////////

  // Handles animating to the marker corresponding to 
  // the current page of the project carousel
  _onPageChangeEnd(page){

    // Check if the currentPage is within bounds of
    // of the temp coordinate length
    if(page < TEMP_DATA.length){
      let coord = TEMP_DATA[page];
      let long  = coord.lat;
      let lat   = coord.long;

      this._animateTo(long, lat);
    }

  }

  // Handles on map marker press, when
  // a map marker is pressed the carousel is
  // transition to the corresponding page
  // and zooms in to the marker
  _onMarkerPressed(e){
    
    // Determine the page for the marker.
    // The marker page is determined by
    // the assined indentifier props
    // for each marker.n
    let event = e.nativeEvent;
    let id    = Number(event.id);
    let page  = id - 1;
    // Scroll to the page
    this._projectCarousel.goToPage(page);

  }

  ////////////////////////
  // Life Cycle
  ////////////////////////
  
  // Handles login for Map onMapReady callback
  // for the map component
  componentDidMount(){
    // If the users device is iOS, prompt for 
    // location permissions
    if(Platform.OS == deviceTypes.ios)
      navigator.geolocation.requestAuthorization();
    // Get the users current location
    navigator.geolocation.getCurrentPosition(data => {
      // Get coordinated of first project
      let coord = TEMP_DATA[0]; 
      this._animateTo(coord.lat, coord.long);
    }, error => {

      console.log(error);

    }, {
      enableHighAccuracy: GPS_HIGH_ACCURACY_BOOL // Allows for high accuracy gps coordinates
    });
  }

  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {

    return (
      <View style={styles.container}>
        <MapView.Animated
        ref={ref => this._map = ref} 
        showsUserLocation
        style={styles.map}
        >
          {TEMP_DATA.map(coord => 
            <MapView.Marker.Animated
            identifier={coord.id.toString()}
            key={coord.id} 
            image={MAP_MARKER_IMAGE}
            coordinate={{ latitude: coord.lat , longitude: coord.long }}
            onPress={e => this._onMarkerPressed(e)}/>)}
             
        </MapView.Animated>

        <View>
          <ProjectCarousel 
            ref={ref => this._projectCarousel = ref}
            data={TEMP_DATA} 
            onPageChangeEnd={page=> this._onPageChangeEnd(page)}/>
        </View>
        <View style={styles.addButtonWrapper}>
          <Icon source={ADD_PROJECT_BUTTON_IMAGE} style={styles.addProjectIcon} onPress={()=> this.props.goToCreateProject() }/>
        </View>
      </View>
    );
  }
}

////////////////////////
// Screen Styles
////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  addButtonWrapper:{
    position:"absolute",
    top: 10,
    right: 10,
  },
  addProjectIcon:{
    width: 50,
    height: 50,
    backgroundColor: COLORS.WHITE,
    borderRadius: 25,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowRadius: 10
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
    goToCreateProject: () => dispatch(navigateToCreateProject())
  };
}



export default connect(mapStateToProps, mapDistpatchToProps)(Projects);
