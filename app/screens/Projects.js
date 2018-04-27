/////////////////////////////
// Imports
/////////////////////////////

import React, { Component } from 'react';
import {bindActionCreators, connect} from 'react-redux';
import MapView from 'react-native-maps';
import Permissions from 'react-native-permissions';
import OpenAppSettings from 'react-native-app-settings';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
  ActivityIndicator,
  Linking,
  AppState,
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
import {basicAlert} from  "./../common/alerts";

////////////////////////////
// Import Screen Components
////////////////////////////

import Details from "./components/Details";

////////////////////////
// Actions
////////////////////////

import {
  navigateToCreateProjectDescription, 
  getProjectsByLocation,
  clearProjectData
} from "./../actions/project-actions.js";

/////////////////////////////
// Import Custom Components
/////////////////////////////

import PrimaryButton from "./../components/PrimaryButton";
import {Indicator} from "./../components/Carousel";
import ActivityIndicatorOverlay from './../components/ActivityIndicatorOverlay';
import Icon from "./../components/Icon";
import AnimatedCarousel, {Card} from "./../components/AnimatedCarousel";


////////////////////////
// Constants
////////////////////////

// Number
const ASPECT_RATIO_NUMBER                     = deviceProperties.width / deviceProperties.height;
const LATITUDE_DELTA_NUMBER                   = 0.0900;
const LONGITUDE_DELTA_NUMBER                  = LATITUDE_DELTA_NUMBER * ASPECT_RATIO_NUMBER;
const INITIAL_LONGITUDE_NUMBER                = 95.50; // Center of the U.S.
const INITIAL_LATITUDE_NUMBER                 = -98.35; // Center of the U.S.
const PROJECT_FETCH_LIMIT_NUMBER              = 10;
const REGION_ANIMATION_DURATION_NUMBER        = 500;
// Nudges the center of the map upward, 
// so the Redo Search in the Area button does 
// not overlap the map markers on smaller screen devices.
const LATITUDE_CENTER_OFFSET                  = 0.015; 
// The following value represents the number miles a user must pan the map before
// showing the redo-Search button. Adjust accordingly 
const REDO_SEARCH_DISTANCE_THRESHOLD          = 20; 
// Bools
const PAGE_INDICATOR_BOOL                     = true;
const GPS_HIGH_ACCURACY_BOOL                  = false;
const MODAL_TRANSPARENT_BOOL                  = false;
const ACTIVITY_INDICACTOR_ANIMATING_BOOL      = true;
const IS_ANIMATING_FALSE_BOOL                 = false;
const IS_ANIMATING_TRUE_BOOL                  = true;
const INITIAL_ANIMATION_FALSE_BOOL            = false;
const INITIAL_ANIMATION_TRUE_BOOL             = true;
const IS_FETCHING_FALSE_BOOL                  = false;
const IS_FETCHING_TRUE_BOOL                   = true;
const REDO_SEARCH_VISIBLE_FALSE_BOOL          = false;
const REDO_SEARCH_VISIBLE_TRUE_BOOL           = true;
const STATUS_BAR_HIDDEN_FALSE_BOOL            = false;
const STATUS_BAR_HIDDEN_TRUE_BOOL             = true;
const MODAL_VISIBLE_FALSE_BOOL                = false;
const MODAL_VISIBLE_TRUE_BOOL                 = true;
const SHOWING_GPS_WARNING_FALSE_BOOL          = false;
const SHOWING_GPS_WARNING_TRUE_BOOL           = true;
const GPS_ENABLED_FALSE_BOOL                  = false;
const GPS_ENABLED_TRUE_BOOL                   = true;
const SHOW_MY_LOCATION_BUTTON_FALSE_BOOL      = false;
// Values
const PERMISSION_RESPONSE_DENIED_VALUE        = "denied";
const PERMISSION_RESPONSE_RESTRICTED_VALUE    = "restricted";
const PERMISSION_RESPONSE_UNDETERMINED_VALUE  = "undetermined";
const PERMISSION_LOCATION_VALUE               = "location";
// Image
const PROJECT_TABBAR_ICON_IMAGE               = require("./../assets/tabbar/project_icon.png");
const MAP_MARKER_IMAGE                        = require("./../assets/projects/map_marker.png");
const ADD_PROJECT_BUTTON_IMAGE                = require("./../assets/projects/add_project_button.png")
// String     
const MILES_UNIT_STRING                       = "Miles";
const KILOMETERS_UNIT_STRING                  = "Kilometers";
const ACTIVITY_INDICATOR_SIZE_STRING          = "large";
const REDO_SEARCH_BUTTON_STRING               = "Redo Search In This Area";
const RETRY_BUTTON_STRING                     = "RETRY";
const MODAL_ANIMATION_STRING                  = "slide";
const APP_STATE_CHANGE_STRING                 = "change";
const APP_STATE_ACTIVE_STRING                 = "active";
const GPS_WARNING_HEADER_STRING               = "Juntos Requires Location Access";
const GPS_WARNING_BODY_STRING                 = "Please turn on your GPS, and enable GPS permissions."
  

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

    this.state = {
      // NOTE: The radius will be a fixed for now,
      // but the following is to future proof for
      // a radius adjustment feature.
      isAnimating: IS_ANIMATING_FALSE_BOOL,
      initialAnimation: INITIAL_ANIMATION_FALSE_BOOL,
      redoSearchVisible: REDO_SEARCH_VISIBLE_FALSE_BOOL,
      statusBarHidden: STATUS_BAR_HIDDEN_FALSE_BOOL,
      modalVisible: MODAL_VISIBLE_FALSE_BOOL,
      selectedProject: null,
      // The number of radial miles to search for projects
      // from the user location, or from the current region.
      radius: 10000000,
      // The following value determines if the GPS has been enabled
      // to allow for the fetching of project data by location. 
      gpsEnabled: GPS_ENABLED_FALSE_BOOL,
      // Prevents double prompting of the GPS settings warning.
      showingGpsWarning: SHOWING_GPS_WARNING_FALSE_BOOL
    }
    // The following properties will be assigned in 
    // navigator.geolocation.getCurrentPosition and
    // will be used to calculate the distance from the
    // user location to each project location.
    this._userLng = null;
    this._userLat = null;
    // The following will be used to store the current 
    // region, and will be used to re-fetch projects
    // if the user presses the redo-search button.
    this._currentRegionLng = null;
    this._currentRegionLat = null;

  }

  ////////////////////////
  // Private Methods
  ////////////////////////

  // Handles animating the maps
  // to the specified region.
  _animateTo(lat, long){

    // We watch for the initial animation  to then 
    // allow for the redo search button logic
    // to be executed.
    if(!this.state.initialAnimation){
      this.setState({
        initialAnimation: INITIAL_ANIMATION_TRUE_BOOL
      })
    }

    this.setState({ isAnimating: IS_ANIMATING_TRUE_BOOL })

    let region = new MapView.AnimatedRegion({
      latitude: lat - LATITUDE_CENTER_OFFSET,
      longitude: long,
      latitudeDelta: LATITUDE_DELTA_NUMBER,
      longitudeDelta: LONGITUDE_DELTA_NUMBER
    });

    this._map._component.animateToRegion(region, REGION_ANIMATION_DURATION_NUMBER);
   
  }

  // Handles calculating the distance of two lat/lng points
  // and returns the distance number.
  _distance(lat1, lon1, lat2, lon2, unit) {

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

    return dist;

  }

  // Handles calculating the distance of two lat/lng points
  // and returns a string with the appropraite distance
  // and unit.
  _distanceString(lat1, lon1, lat2, lon2, unit){

    let unitString = MILES_UNIT_STRING;
    let dist = this._distance(lat1, lon1, lat2, lon2, unit);

    if (unit===KILOMETERS_UNIT_STRING) { 
      unitString = KILOMETERS_UNIT_STRING;
    }

    return parseInt(dist).toString() + " " + unitString;

  }

  // Handles returining the lat and lng from
  // a project object.
  _extractLocation(project){

    let coords  = project.location.loc.coordinates;
    let lat     = coords[1];
    let lng     = coords[0];

    return { lng, lat};

  }

  // Created a setting prompt for GPS settings
  _displayGpsSettingsPrompt(header, body){

    if(!this.state.showingGpsWarning){
      basicAlert(
        header, 
        body,
        () =>{ 
          OpenAppSettings.open();
          this.setState({
            showingGpsWarning: SHOWING_GPS_WARNING_FALSE_BOOL
          })
        });
  
      this.setState({
        showingGpsWarning: SHOWING_GPS_WARNING_TRUE_BOOL
      })
    }

  }

  // Handles displaying the GPS setting prompt
  _platformGpsSettingPrompt(){
      
    this._displayGpsSettingsPrompt(GPS_WARNING_HEADER_STRING, GPS_WARNING_BODY_STRING);

  }

  // Handles fetching the user GPS location and 
  // then fetching the project data by locaton.
  // The users lat and lng is cached, to later
  // calcualte the project to user location distance deltas.
  _getDataByGpsLocation(){

    // Handle iOS and Android dangerous permissions
    Permissions.request(PERMISSION_LOCATION_VALUE).then(response => {
      console.log(response);
      if(response === PERMISSION_RESPONSE_DENIED_VALUE || response === PERMISSION_RESPONSE_RESTRICTED_VALUE || response === PERMISSION_RESPONSE_UNDETERMINED_VALUE){
        this._platformGpsSettingPrompt();
        return 
      }

      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      navigator.geolocation.getCurrentPosition(data => {

        this._userLat = data.coords.latitude;
        this._userLng = data.coords.longitude;
  
        // We cache this location to later be able to
        // determine if the use has panned the map.
        // If the map is panned past the threshold 
        // the user will be presented with a redo search 
        // in this area button.
        this._currentRegionLat = data.coords.latitude;
        this._currentRegionLng = data.coords.longitude;
    
        // Fetch project data by location and radius 
        this.props.getProjectsByLocation(this._userLat, this._userLng, this.state.radius, PROJECT_FETCH_LIMIT_NUMBER);
        this.setState({gpsEnabled: GPS_ENABLED_TRUE_BOOL});
      }, error => {
        this._platformGpsSettingPrompt();
      }, {
        enableHighAccuracy: GPS_HIGH_ACCURACY_BOOL // Allows for high accuracy gps coordinates
      });

    });

  }

  ////////////////////////
  // Callback
  ////////////////////////

  // Handles animating to the marker corresponding to 
  // the current page of the project carousel and 
  // updating the carousel page indicator.
  _onPageChangeEnd(page){

    // Check if the currentPage is within bounds of
    // of the available project count
    if(page < this.props.projects.length){

      let loc = this._extractLocation(this.props.projects[page]);
      this._animateTo(loc.lat, loc.lng);
      this._carouselIndicator.setActivePageIndicator(page);

    }

  }

  // Handles on map marker press, when
  // a map marker is pressed the carousel is
  // transitioned to the corresponding page
  // and the map zooms in on the marker.
  _onMarkerPressed(e){
    
    // Determine the page for the marker.
    // The marker page is determined by
    // the assined indentifier prop
    // for each marker.
    let event = e.nativeEvent;
    let page  = parseInt(event.id);
    // Scroll to the page
    this._animatedCarousel.goToPage(page);
    this._carouselIndicator.setActivePageIndicator(page);

  }

  // Handles on poster pressed 
  _onPosterPressed(projectData){

    // Sets the project data
    // to be displayed in the project details
    // modal, make the project detail 
    // modal visible, and hide the status ber.
    this.setState({
      selectedProject: projectData,
      modalVisible: MODAL_VISIBLE_TRUE_BOOL
    });

    if(Platform.OS == deviceTypes.ios)
      this.setState({statusBarHidden: STATUS_BAR_HIDDEN_TRUE_BOOL})

  }


  // The method handles the modal 
  // close state.
  _onModalClosePressed(){

    this.setState({
      selectedProject: null,
      modalVisible: MODAL_VISIBLE_FALSE_BOOL,
      statusBarHidden: STATUS_BAR_HIDDEN_FALSE_BOOL
    });

  }

  // Handles on region changes
  // The method handles the logic 
  // for when the redo search button 
  // should be shown.
  _onRegionChangeComplete(region){

    if(this.props.projects.length > 0){

      let lat = region.latitude;
      let lng = region.longitude;
      let distanceDelta = this._distance(this._currentRegionLat, this._currentRegionLng, lat, lng);
      let loc = this._extractLocation(this.props.projects[0]);
      
      // The following line prevents the redo button from being shown when 
      // re-fetching new project data.
      let isFirstProject = ( 
        parseFloat(loc.lat).toFixed(5) === parseFloat(lat).toFixed(5) && 
        parseFloat(loc.lng).toFixed(5) === parseFloat(lng).toFixed(5)
      )
     
      if(
        !isFirstProject
        && !this.state.isAnimating
        && this.state.initialAnimation 
        && distanceDelta > REDO_SEARCH_DISTANCE_THRESHOLD 
      ){

        this.setState({
          redoSearchVisible: REDO_SEARCH_VISIBLE_TRUE_BOOL
        })
  
        this._currentRegionLng = lng;
        this._currentRegionLat = lat;
  
      }

    }
  }

  // Handles on the redo button press.
  // The method executes the re-fetch of projects
  // relative to the current region.
  _onRedoSearchPress(){

    this.setState({
      redoSearchVisible: REDO_SEARCH_VISIBLE_FALSE_BOOL,
      initialAnimation: INITIAL_ANIMATION_FALSE_BOOL
    })

    this.props.clearProjectData();
    this.props.getProjectsByLocation(this._currentRegionLat, this._currentRegionLng , this.state.radius, PROJECT_FETCH_LIMIT_NUMBER);

  }

  // Handles on animation complete logic
  _onAnimationComplete(event){

    this.setState({isAnimating: IS_ANIMATING_FALSE_BOOL})

  }


  // Handles listening for app state changes.
  // If GPS has not been enables atleast once, 
  // the app will continously prompt to do so.
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === APP_STATE_ACTIVE_STRING) {
      if(!this.state.gpsEnabled){
        this._getDataByGpsLocation();
      }
    }
  }

  ////////////////////////
  // Life Cycle
  ////////////////////////

  // Handles removing the app state listener
  componentWillUnmount() {

    AppState.removeEventListener(APP_STATE_CHANGE_STRING, this._handleAppStateChange);
  
  }

  // When a service call is made to fetch projects
  // the redux state is updated and re-rerenders.
  // This calls for an animation to the first project
  // in the newly fetched data.
  componentDidUpdate(){

    if(this.props.projects.length > 0 && !this.state.initialAnimation){

      let loc   = this._extractLocation(this.props.projects[0]);
  
      // Animate to the first project marker
      this._animateTo(loc.lat, loc.lng);
    }

  }
  

  // Handles listening for foreground/background app state changes
  // which are required to prompt for GPS permissions.
  componentDidMount(){
    // Begin listening to app state changes
    // This will be used to determine if the user 
    // has enabled GPS permissions
    AppState.addEventListener(APP_STATE_CHANGE_STRING, this._handleAppStateChange);
    // Get data by GPS location
    this._getDataByGpsLocation();
  }

  ////////////////////////
  // Screen UI
  ////////////////////////

  // Handles rendering the carousel posters if the project data is available
  _renderCards = (itemObject) => {
    let item = itemObject.item
    return (
        <TouchableWithoutFeedback key={item.project_id} onPress={()=> this._onPosterPressed(item)}>
         <View>
          <Card 
           source={item.images[0].uri}
           title={item.name}
           description={item.description}
           distance={this._distanceString(
             this._userLat, 
             this._userLng,
             item.location.loc.coordinates[1],
             item.location.loc.coordinates[0],
             )}
           key={item.project_id}/>
          </View>
        </TouchableWithoutFeedback>
      );
  }

  // Handles rendering the map markers if the project data is available 
  // else the nothing is returned
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
        toolbarEnabled
        showsMyLocationButton={SHOW_MY_LOCATION_BUTTON_FALSE_BOOL}
        style={styles.map}
        onRegionChangeComplete={region => this._onRegionChangeComplete(region)}
        onAnimationComplete={(event)=> this._onAnimationComplete(event.nativeEvent)}
        >
          <this._renderMarkers projects={this.props.projects} />
        </MapView.Animated>
        <View style={styles.crouselWrapper}>
          <View style={styles.redoButtonView}>
            <View style={styles.redoButtonWrapper}>
              { this.state.redoSearchVisible &&
              <PrimaryButton  
                onPress={()=> this._onRedoSearchPress()} 
                style={styles.redoButtonButton} 
                textStyle={styles.redoButtonText} 
                buttonText={REDO_SEARCH_BUTTON_STRING} />
              } 
            </View>
          </View>
          {this.props.projects.length > 0 &&
          <View>
            <Indicator children={this.props.projects} ref={ref=> this._carouselIndicator = ref}/>
            <AnimatedCarousel
              renderItem={this._renderCards}
              data={this.props.projects}
              ref={ ref => this._animatedCarousel = ref}
              pageIndicator={PAGE_INDICATOR_BOOL}
              onSnapToItem={page=> this._onPageChangeEnd(page)} />
          </View>
          } 
          {this.props.isFetching &&
            <ActivityIndicator style={styles.activityIndicator} animating={ACTIVITY_INDICACTOR_ANIMATING_BOOL} size={ACTIVITY_INDICATOR_SIZE_STRING}/>
          }
          {this.props.isErrored && !this.props.isFetching &&
          <View style={styles.retryButtonWrapper}>
            <PrimaryButton  
            onPress={()=> this._onRedoSearchPress()} 
            style={styles.retryButton} 
            textStyle={styles.retryButtonText} 
            buttonText={RETRY_BUTTON_STRING} />
          </View>
          }
        </View>
        <View style={styles.addButtonWrapper}>
          <Icon source={ADD_PROJECT_BUTTON_IMAGE} style={styles.addProjectIcon} onPress={()=> this.props.navigateToCreateProjectDescription() }/>
        </View> 
        <StatusBar hidden={this.state.statusBarHidden} />
        <Modal
          animationType={MODAL_ANIMATION_STRING}
          transparent={MODAL_TRANSPARENT_BOOL}
          visible={this.state.modalVisible}
          onRequestClose={()=> this._onModalClosePressed()}>
          {this.state.selectedProject != null &&
           <Details
            images={this.state.selectedProject.images}
            projectName={this.state.selectedProject.name}
            startDate={this.state.selectedProject.start_date}
            endDate={this.state.selectedProject.end_date}
            currentStatus={this.state.selectedProject.current_status}
            projectType={this.state.selectedProject.type}
            foodProvided={this.state.selectedProject.food_provided}
            description={this.state.selectedProject.description}
            user={this.state.selectedProject.user.local}
            address={this.state.selectedProject.location.address}
            latitude={this.state.selectedProject.location.loc.coordinates[1]}
            longitude={this.state.selectedProject.location.loc.coordinates[0]}
            onClosePress={()=> this._onModalClosePressed()}/>
          }
        </Modal>
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

  /////////////////////////
  // Carousel
  ////////////////////////
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  /////////////////////////
  // Add Button
  ////////////////////////

  addButtonWrapper:{
    position:"absolute",
    top: 10,
    right: 10,
  },
  addProjectIcon:{
    width: 50,
    height: 50,
  },

  /////////////////////////
  // Carousel
  ////////////////////////

  crouselWrapper:{
    height: 270
  },

  /////////////////////////
  // Activity Indicator
  ////////////////////////

  activityIndicator:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /////////////////////////
  // Retry Button
  ////////////////////////

  retryButtonWrapper:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButton:{
    width: 150, 
    height: 50, 
    marginBottom: 10,
    borderRadius: 30
  },
  retryButtonText:{
    paddingHorizontal: 10,
    fontSize: 20
  },

  ////////////////////////
  // Redo Button
  ////////////////////////

  redoButtonView:{
    alignItems:"center"
  },
  redoButtonWrapper:{
    width: 150, 
    height: 50, 
    marginBottom: 10,
  },
  redoButtonButton:{
    paddingVertical: 10,
    borderRadius: 30
  },
  redoButtonText:{
    fontSize: 10
  }
});

////////////////////////
// Map to props
////////////////////////

const mapStateToProps = (state) => {
  return {
    projects: state.project.data,
    isFetching: state.project.isFetching,
    isErrored: state.project.isErrored
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    navigateToCreateProjectDescription: () => dispatch(navigateToCreateProjectDescription()),
    getProjectsByLocation: (lat, lng, radius, limit) => dispatch(getProjectsByLocation(lat, lng, radius, limit)),
    clearProjectData: () => dispatch(clearProjectData())
  };
}



export default connect(mapStateToProps, mapDistpatchToProps)(Projects);
