/////////////////////////////
// Imports
/////////////////////////////

import React, { Component } from 'react';
import {bindActionCreators, connect} from 'react-redux';
import MapView from 'react-native-maps';
import {
  View,
  Dimensions,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Text
} from 'react-native';

/////////////////////////////
// Import Common Files
/////////////////////////////

import {deviceTypes} from "./../common/device";

/////////////////////////////
// Import Custom Components
/////////////////////////////

import PrimaryButton from "./../components/PrimaryButton";
import ProjectCarousel from "./../components/ProjectCarousel";
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
const LATITUDE_DELTA                      = 0.0900;
const LONGITUDE_DELTA                     = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_LONGITUDE                   = 95.50; // Center of the U.S.
const INITIAL_LATITUDE                    = -98.35; // Center of the U.S.
const REGION_ANIMATION_DURATION_PROPERTY  = 500;
const GPS_HIGH_ACCURACY_BOOL              = true;
const PROJECT_TABBAR_ICON_IMAGE           = require('./../assets/tabbar/project_icon.png')
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

  ////////////////////////
  // Navigation Options
  ////////////////////////

  static navigationOptions = {
    headerLeft: <View style={{paddingLeft: 10}}><Button title="Add" /></View>,
    headerRight: <View style={{paddingRight: 10}}><Button title="List" /></View>,
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
  // Helper Method
  ////////////////////////

  _animateTo(lat, long){
    let region = new MapView.AnimatedRegion({
      latitude: lat,
      longitude: long,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    });

    // Animate to the region
    this._map._component.animateToRegion(region, REGION_ANIMATION_DURATION_PROPERTY);
    this.setState({region});
  }


  ////////////////////////
  // Callback
  ////////////////////////

  _onPageChangeEnd(page){
    // console.log("On page did end: " + page);
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
    let event = e.nativeEvent;
    let id    = Number(event.id);
    let page  = id - 1;
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

    // Set the initial page indicator the 
    // first in the pageIndicators array
    // this._setActivePageIndicator(0);

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
            image={require("./../assets/projects/map_marker.png")}
            title={coord.title} 
            coordinate={{ latitude: coord.lat , longitude: coord.long }}
            onPress={e => this._onMarkerPressed(e)}/>)}
             
        </MapView.Animated>
        <View>
          <ProjectCarousel 
            ref={ref => this._projectCarousel = ref}
            data={TEMP_DATA} 
            onPageChangeEnd={page=> this._onPageChangeEnd(page)}/>
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
  tabBarIcon:{
    width: 25,
    height: 25
  },
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
