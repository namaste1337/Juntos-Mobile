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
  Text
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

import {navigateToCreateProjectDescription, getProjects} from "./../actions/project-actions.js";

/////////////////////////////
// Import Custom Components
/////////////////////////////

import PrimaryButton from "./../components/PrimaryButton";
import Carousel, {Poster, Indicator} from "./../components/Carousel";
import ActivityIndicatorOverlay from './../components/ActivityIndicatorOverlay';
import Icon from "./../components/Icon";


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
const PAGE_INDICATOR_BOOL                 = true;
const GPS_HIGH_ACCURACY_BOOL              = true;
// Image
const PROJECT_TABBAR_ICON_IMAGE           = require("./../assets/tabbar/project_icon.png");
const MAP_MARKER_IMAGE                    = require("./../assets/projects/map_marker.png");
const ADD_PROJECT_BUTTON_IMAGE            = require("./../assets/projects/add_project_button.png")
// String 
const MILES_UNIT_STRING                   = "Miles";
const KILOMETERS_UNIT_STRING              = "Kilometers";

class Projects extends Component {


  _onAddIconPress(event){

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
    // Set initial state
    this.state = {
      // NOTE: The radius will be a fixed for now,
      // but the following is to future proof for
      // a radius adjustment feature.
      radius: 10000000,
    }
    // The follwoing properties will be assgined in 
    // navigator.geolocation.getCurrentPosition and
    // will be used to calcaulte the distance form the
    // user location to each project location.
    this._userLng = null;
    this._userLat = null;
  }

  ////////////////////////
  // Private Methods
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

    this._map._component.animateToRegion(region, REGION_ANIMATION_DURATION_PROPERTY);
   
  }

  // Handles calucalting the distance of two lat/lng points
  // and return a string with the appropraite distance
  // and unit.git 
  _distance(lat1, lon1, lat2, lon2, unit) {

    let unitString = MILES_UNIT_STRING;

    let radlat1 = Math.PI * lat1/180
    let radlat2 = Math.PI * lat2/180
    let theta = lon1-lon2
    let radtheta = Math.PI * theta/180
    // Calcaulte thet distance 
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515

    if (unit===KILOMETERS_UNIT_STRING) { 
      dist = dist * 1.609344 
      unitString = KILOMETERS_UNIT_STRING;
    }

    return parseInt(dist).toString() + " " + unitString;
  }

  ////////////////////////
  // Callback
  ////////////////////////

  // Handles animating to the marker corresponding to 
  // the current page of the project carousel
  _onPageChangeEnd(page){

    // Check if the currentPage is within bounds of
    // of the temp coordinate length
    if(page < this.props.projects.length){
      let project = this.props.projects[page];
      let coords  = project.location.loc.coordinates;
      let long    = coords[1];
      let lat     = coords[0];

      this._animateTo(long, lat);
    }

    // Set the carousel indicator the corresponding page
    this._carouselIndicator.setActivePageIndicator(page);

  }

  // Handles on map marker press, when
  // a map marker is pressed the carousel is
  // transition to the corresponding page
  // and zooms in to the marker
  _onMarkerPressed(e){
    
    // Determine the page for the marker.
    // The marker page is determined by
    // the assined indentifier props
    // for each marker.
    let event = e.nativeEvent;
    let page  = parseInt(event.id);
    // Scroll to the page
    this._projectCarousel.goToPage(page);

  }

  ////////////////////////
  // Life Cycle
  ////////////////////////

  componentDidUpdate(){
    // Retrieve the project data from the server

    let project   = this.props.projects[0];
    let location  = project.location.loc.coordinates;
    let lat       = location[0];
    let lng       = location[1];

    this._animateTo(lng, lat);

  }
  
  // Handles login for Map onMapReady callback
  // for the map component
  componentDidMount(){
    // If the users device is iOS, prompt for 
    // location permissions
    if(Platform.OS == deviceTypes.ios)
      navigator.geolocation.requestAuthorization();
    // Get the users current location
    navigator.geolocation.getCurrentPosition(data => {
      this.props.getProjects();
    }, error => {
      console.error(error);
    }, {
      enableHighAccuracy: GPS_HIGH_ACCURACY_BOOL // Allows for high accuracy gps coordinates
    });

  }

  ////////////////////////
  // Screen UI
  ////////////////////////

  // Handles rendering the carousel posters if data is available 
  // else an activity indicator is shown.
  _renderCarouselPosters = (props) => {
    if (props.projects.length > 0){
      return (
          props.projects.map(project => 
             <Poster 
              source={project.images[0]}
              title={project.name}
              description={project.description}
              distance={this._distance(
                this._userLat, 
                this._userLng,
                project.location.loc.coordinates[1],
                project.location.loc.coordinates[0],
                )}
              key={project.project_id}/>
          )
        );
    }
    else{
      return (<ActivityIndicatorOverlay isFetching={true}/>);
    }
  }

  // Handles rendering the map markers
  _renderMarkers = (props) =>{
    if(props.projects.length > 0){
      let projects = props.projects;
      return(
        projects.map(project => 
          <MapView.Marker.Animated
          identifier={projects.indexOf(project).toString()}
          key={project.project_id.toString()} 
          image={MAP_MARKER_IMAGE}
          coordinate={{ latitude: project.location.loc.coordinates[1] , longitude: project.location.loc.coordinates[0] }}
          onPress={e => this._onMarkerPressed(e)}/>
        )
      )
    }else{
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView.Animated
        ref={ref => this._map = ref} 
        showsUserLocation
        style={styles.map}
        >
          <this._renderMarkers projects={this.props.projects} />
        </MapView.Animated>

        <View style={styles.crouselWrapper}>
          {this.props.projects.length > 0 &&
          <Indicator children={this.props.projects} ref={ref=> this._carouselIndicator = ref}/>
          }
          <Carousel 
            ref={ref => this._projectCarousel = ref}
            pageIndicator={PAGE_INDICATOR_BOOL}
            onPageChangeEnd={page=> this._onPageChangeEnd(page)}>
            <this._renderCarouselPosters projects={this.props.projects} />
          </Carousel>
        </View>
        <View style={styles.addButtonWrapper}>
          <Icon source={ADD_PROJECT_BUTTON_IMAGE} style={styles.addProjectIcon} onPress={()=> this.props.navigateToCreateProjectDescription() }/>
        </View> 
      </View>
    );
  }
}

  // onLoadEnd={ () => !this.state.scrollViewBounced && this._bounceScrollView() }

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
  },
  crouselWrapper:{
    height: 210
  }
});

////////////////////////
// Map to props
////////////////////////

const mapStateToProps = (state) => {
  return {
    projects: state.project.data
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    navigateToCreateProjectDescription: () => dispatch(navigateToCreateProjectDescription()),
    getProjects: () => dispatch(getProjects())
  };
}



export default connect(mapStateToProps, mapDistpatchToProps)(Projects);
