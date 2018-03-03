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
const GPS_HIGH_ACCURACY_BOOL              = true;
// Image
const PROJECT_TABBAR_ICON_IMAGE           = require("./../assets/tabbar/project_icon.png");
const MAP_MARKER_IMAGE                    = require("./../assets/projects/map_marker.png");
const ADD_PROJECT_BUTTON_IMAGE            = require("./../assets/projects/add_project_button.png")

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

    // _animateTo is fired asynchronously
    if(this._map != null){
      this._map._component.animateToRegion(region, REGION_ANIMATION_DURATION_PROPERTY);
      this.setState({region});
    }
  }

  ////////////////////////
  // Callback
  ////////////////////////

  // Handles animating to the marker corresponding to 
  // the current page of the project carousel
  _onPageChangeEnd(page){

    // Check if the currentPage is within bounds of
    // of the temp coordinate length
    if(page < this.props.project.data.length){
      let project = this.props.project.data[page];
      let coords  = project.location.loc.coordinates;
      let long    = coords[1];
      let lat     = coords[0];

      this._animateTo(long, lat);
    }

    // Set the carousel indicator the corresponding page
    this.carouselIndicator.setActivePageIndicator(page);

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

  componentWillMount(){
    this.props.getProjects();
  }
  
  // Handles login for Map onMapReady callback
  // for the map component
  componentDidMount(){
    // Retrieve the project data from the server
    console.log("Component Did Mount");
    console.log(this.props.project.data);
    // If the users device is iOS, prompt for 
    // location permissions
    if(Platform.OS == deviceTypes.ios)
      navigator.geolocation.requestAuthorization();
    // Get the users current location
    navigator.geolocation.getCurrentPosition(data => {
      // Get coordinate of first project and animate
      // let project  = this.props.projectData[0];
      // let coords   = project.location.loc.coordinates;
      // console.log(coords);
      // let long     = coords[1];
      // let lat      = coords[0]; 
      // this._animateTo(lat, long);
    }, error => {
      console.log(error);

    }, {
      enableHighAccuracy: GPS_HIGH_ACCURACY_BOOL // Allows for high accuracy gps coordinates
    });

  }

  ////////////////////////
  // Screen UI
  ////////////////////////

  _renderCarousel = (props) => {
    if (props.projectData.data.length > 0){
      return (
          props.projectData.data.map(project => 
             <Poster 
              source={project.images[0]}
              title={project.name}
              description={project.description}
              distance={"how far"}
              key={project.project_id}/>
          )
        );
    }
    else{
      return (<ActivityIndicatorOverlay isFetching={true}/>);
    }
  }

  _renderMarkers = (props) =>{
    if(props.project.data.length > 0){
      return(
        props.project.data.map(project => 
          <MapView.Marker.Animated
          identifier={project.project_id.toString()}
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
          <this._renderMarkers project={this.props.project} />
        </MapView.Animated>

        <View style={{height: 180}}>
        {this.props.project.data.length > 0 &&
        <Indicator children={this.props.project.data} ref={ref=> this.carouselIndicator = ref}/>
        }
        <Carousel 
          ref={ref => this._projectCarousel = ref}
          pageIndicator={true}
          onPageChangeEnd={page=> this._onPageChangeEnd(page)}>
          <this._renderCarousel projectData={this.props.project} />
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
  }
});

////////////////////////
// Map to props
////////////////////////

const mapStateToProps = (state) => {
  return {
    project: state.project
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    navigateToCreateProjectDescription: () => dispatch(navigateToCreateProjectDescription()),
    getProjects: () => dispatch(getProjects())
  };
}



export default connect(mapStateToProps, mapDistpatchToProps)(Projects);
