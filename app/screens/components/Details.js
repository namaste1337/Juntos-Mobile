////////////////////////
// Import Modules
////////////////////////

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { 
Text, 
Dimensions,
ScrollView,
Image,
StyleSheet,
View,
Modal,
TouchableWithoutFeedback,
TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from "prop-types";

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import Carousel, {Poster} from './../../components/Carousel';
import Icon from './../../components/Icon';

//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles, {FONTS, COLORS, FONT_WEIGHT} from "./../../common/styles.js"
import {deviceProperties} from "./../../common/device";


////////////////////////
// Constants
////////////////////////

// Device
const screenCenter                        = Dimensions.get('window').width/2;
// Images
const PROJECT_START_ICON_IMAGE            = require("./../../assets/projects/project_start_icon.png");
const PROJECT_END_ICON_IMAGE              = require("./../../assets/projects/project_end_icon.png");
const CURRENT_STATUS_ICON_IMAGE           = require("./../../assets/projects/current_status_icon.png");
const PROJECT_TYPE_ICON_IMAGE             = require("./../../assets/projects/project_type_icon.png");
const FOOD_PROVIDED_ICON_IMAGE            = require("./../../assets/projects/food_provided_icon.png");
const PROJECT_MAP_ICON_IMAGE              = require("./../../assets/projects/map_icon.png");
const MAP_MARKER_IMAGE                    = require("./../../assets/projects/map_marker.png");
const CLOSE_PROJECT_ICON_IMAGE            = require("./../../assets/projects/close_project_icon.png");


// Numbers
const ASPECT_RATIO_NUMBER                 = deviceProperties.width / deviceProperties.height;
const LATITUDE_DELTA_NUMBER               = 0.0900;
const LONGITUDE_DELTA_NUMBER              = LATITUDE_DELTA_NUMBER * ASPECT_RATIO_NUMBER;
// Properties 
const SCROLL_VIEW_HORIZONTAL_PROPERTY = true;
const SHOW_USER_LOCATION_PROPERTY = true;

////////////////////////
// Component
/////////////////////////

/* 
~~~~~~~~~~~~~~~~~~~
Required props
~~~~~~~~~~~~~~~~~~~
images: type Array
Description: An array of images to be display for the project.
Default: none
=========================
projectName: type String
Description: The name to be displayed for the project.
Default: none
=========================
startDate: type String
Description: The project start date to be displayed.
Default: none
=========================
endDate: type String
Description: The project end date to be displayed.
Default: none
=========================
currentStatus: type String
Description: The project current status to be diplayed.
Default: none
=========================
projectType: type String
Description: The project type to be diplayed.
Default: none
=========================
foodProvided: type String
Description: The food availability to be displayed.
Default: none
=========================
description: type String
Description: The project description to be displayed.
Default: none
=========================
user: type Object
Description: A user object containing the user username, and profile image.
Definiition: {
  username: "Nomad"
  profileImages:[
    "http://domain.com/image.png"
  ]
}
Default: none
=========================
address: type String
Description: The project address to be dispalyed
Default: none
=========================
latitude: type Number
Description: The project latitude to be displayed on the map
Default: none
=========================
longitude: type Number
Description: The project latitude to be displayed on the map
Default: none
=========================
onClosePress: type Function
Description: Callback that is called when the close button is
pressed. Assigning the callback will render a close button in 
top right of the screen.
Default: none




*/

class  Details extends Component {

  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    return (
     <ScrollView style={CommonStyles.container}>
        <Carousel>
         {this.props.images.map((imageSource, index) => 
           <Poster source={imageSource.uri} key={index}/>
         )}
        </Carousel>
        {this.props.onClosePress != null &&
        <View style={styles.closeButtonWrapper}>
          <Icon
          source={CLOSE_PROJECT_ICON_IMAGE} 
          onPress={()=> this.props.onClosePress()} />
        </View>}
        <View style={styles.contentWrapper}>
          <View style={styles.headerWrapper}>
            <View style={styles.projectHeader}>
              <View style={styles.headerTopLeft}>
                <Image style={styles.userImage} source={{uri: this.props.user.profile.images[0]}} />
              </View>
              <View style={styles.headerTopRight}>
                <Text>{this.props.user.username}</Text>
                <Text style={styles.projectTitle}>{this.props.projectName}</Text>
              </View>
            </View>
            <View style={styles.projectHeader}>
              <View style={styles.headerBottomLeft}>
                <Image style={styles.mapIcon}source={PROJECT_MAP_ICON_IMAGE}/>
              </View>
              <View style={styles.headerBottomRight}>
                <Text style={styles.projectAddress}>{this.props.address}</Text>
              </View>
            </View>
          </View>
          <ScrollView horizontal={SCROLL_VIEW_HORIZONTAL_PROPERTY} showsHorizontalScrollIndicator={false} style={styles.detailsWrapper}>
            <View style={styles.detail}>
              <View style={styles.detailIconWrapper}>
                <Image style={styles.detailIcon}source={PROJECT_START_ICON_IMAGE}/>
              </View>
              <View style={styles.detailTextWrapper}>
                <Text style={styles.detailTextHeader}>Project Start</Text>
                <Text style={styles.detailTextData}>{this.props.startDate}</Text>
              </View>
            </View>
            <View style={styles.detail}>
              <View style={styles.detailIconWrapper}>
                <Image style={styles.detailIcon}source={PROJECT_END_ICON_IMAGE}/>
              </View>
              <View style={styles.detailTextWrapper}>
                <Text style={styles.detailTextHeader}>Project End</Text>
                <Text style={styles.detailTextData}>{this.props.endDate}</Text>
              </View>
            </View>
            <View style={styles.detail}>
              <View style={styles.detailIconWrapper}>
                <Image style={styles.detailIcon}source={CURRENT_STATUS_ICON_IMAGE}/>
              </View>
              <View style={styles.detailTextWrapper}>
                <Text style={styles.detailTextHeader}>Current Status</Text>
                <Text style={styles.detailTextData}>{this.props.currentStatus}</Text>
              </View>
            </View>
            <View style={styles.detail}>
              <View style={styles.detailIconWrapper}>
                <Image style={styles.detailIcon}source={PROJECT_TYPE_ICON_IMAGE}/>
              </View>
              <View style={styles.detailTextWrapper}>
                <Text style={styles.detailTextHeader}>Project Type</Text>
                <Text style={styles.detailTextData}>{this.props.projectType}</Text>
              </View>
            </View>
            <View style={styles.detail}>
              <View style={styles.detailIconWrapper}>
                <Image style={styles.detailIcon}source={FOOD_PROVIDED_ICON_IMAGE}/>
              </View>
              <View style={styles.detailTextWrapper}>
                <Text style={styles.detailTextHeader}>Food Provided</Text>
                <Text style={styles.detailTextData}>{this.props.foodProvided}</Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.sectionHeader}>About</Text>
            <Text style={styles.descriptionText}>{this.props.description}</Text>
          </View>
          <View style={styles.mapViewWrapper}>
            <Text style={styles.sectionHeader}>Location</Text>
            <MapView 
            style={styles.mapView}
            showsUserLocation={SHOW_USER_LOCATION_PROPERTY}
            region={{ latitude: this.props.latitude , longitude: this.props.longitude, latitudeDelta: LATITUDE_DELTA_NUMBER, longitudeDelta: LONGITUDE_DELTA_NUMBER}}>
              <MapView.Marker
              identifier={this.props.address}
              image={MAP_MARKER_IMAGE}
              coordinate={{ latitude: this.props.latitude , longitude: this.props.longitude}}/>
            </MapView>
            <Text style={styles.mapViewAddress}>{this.props.address}</Text>
          </View>
        </View>
     </ScrollView>
    );
  }
}



////////////////////////
// Screen Styles
////////////////////////

const styles = StyleSheet.create({

  contentWrapper:{
    margin: 20
  },

  ////////////////////////
  // HEADER
  ////////////////////////

  headerWrapper:{
    borderBottomColor: COLORS.LIGHT_GREY,
    borderBottomWidth: 0.5,
    paddingBottom: 15
  },
  projectHeader:{
    flexDirection: "row"
  },
  headerTopLeft:{
    justifyContent: "center",
  },
  headerTopRight:{
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    paddingLeft: 10
  },
  headerBottomLeft:{
    marginTop: 10,
    width: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  headerBottomRight:{
    flex: 1,
    flexWrap: "wrap",
    paddingLeft: 10,
    justifyContent: "center",
  },
    userImage:{
    width: 50,
    height: 50,
    borderRadius: 25
  },
  projectTitle:{
    fontFamily: FONTS.PRIMARY,
    fontWeight: FONT_WEIGHT.BOLD,
    fontSize: 20,
    color: COLORS.PRIMARY
  },
  projectAddress:{
    marginTop: 15,
    fontFamily: FONTS.PRIMARY,
    fontSize: 15,
    color: COLORS.DARK_GREY
  },
  mapIcon:{
    width: 25,
    height: 25,
    tintColor: COLORS.DARK_GREY
  },

  ////////////////////////
  // Close Chevron Button
  ////////////////////////

  closeButtonWrapper:{
    position: "absolute", 
    left: 10
  },

  ////////////////////////
  // Details
  ////////////////////////

  detailsWrapper:{
    flexDirection: "row",
    borderBottomColor: COLORS.LIGHT_GREY,
    borderBottomWidth: 0.5,
    padding: 10
  },

  detail:{
    flexDirection: "row",
    paddingRight: 10
  },

  detailIconWrapper:{
    justifyContent: "center",
    alignItems: "center",
  },

  detailIcon:{
    width: 30,
    height: 30,
    tintColor: COLORS.DARK_GREY
  },

  detailTextWrapper:{
    paddingLeft: 10,
  },

  detailTextHeader:{
    fontFamily: FONTS.PRIMARY,
    color: COLORS.PRIMARY,
    fontWeight: FONT_WEIGHT.REGULAR
  },
  detailTextData:{
    fontFamily: FONTS.PRIMARY,
    fontWeight: FONT_WEIGHT.LIGHT
  },

  ////////////////////////
  // Section Header
  ////////////////////////

  sectionHeader:{
    fontFamily: FONTS.PRIMARY,
    fontWeight: FONT_WEIGHT.REGULAR,
    color: COLORS.PRIMARY,
    fontSize: 18,
    paddingVertical: 10,
  },

  ////////////////////////
  // Description
  ////////////////////////

  descriptionWrapper:{
    paddingBottom: 15,
    borderBottomColor: COLORS.LIGHT_GREY,
    borderBottomWidth: 0.3,
  },
  descriptionText:{
    fontFamily: FONTS.PRIMARY
  },

  ////////////////////////
  // Map
  ////////////////////////

  mapViewWrapper:{
    paddingBottom: 15,
    borderBottomColor: COLORS.LIGHT_GREY,
    borderBottomWidth: 0.3,
  },

  mapView:{
    width: "100%", 
    height: 200 
  },

  mapViewAddress:{
    fontFamily: FONTS.PRIMARY,
    fontWeight: FONT_WEIGHT.LIGHT,
    paddingTop: 15
  }


});



////////////////////////
// Prop Type Checks
////////////////////////

Details.propTypes = {

  images: PropTypes.array.isRequired,
  projectName: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  currentStatus: PropTypes.string.isRequired,
  projectType: PropTypes.string.isRequired,
  foodProvided: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired

}

export default Details;

