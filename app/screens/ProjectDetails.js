////////////////////////
// Imports
////////////////////////

import React, { Component } from 'react';
import {bindActionCreators, connect} from 'react-redux';
import { 
Text, 
Dimensions,
ScrollView,
Image,
StyleSheet,
TouchableOpacity,
View
} from 'react-native';
import { NavigationActions } from 'react-navigation'

//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles, {FONTS, COLORS, FONT_WEIGHT} from "../common/styles.js"

////////////////////////
// Actions
////////////////////////

import {accountLogout} from "./../actions/account-actions.js";

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import PrimaryButton from './../components/PrimaryButton';
import Carousel, {Poster} from './../components/Carousel';


////////////////////////
// Constants
////////////////////////
const screenCenter                  = Dimensions.get('window').width/2;
const PROJECT_TABBAR_ICON_IMAGE     = require('./../assets/tabbar/settings_icon.png');
const PROJECT_MAP_ICON_IMAGE         = require('./../assets/projects/map_icon.png');


const TEMP_DATA = {
  user: {
    profileImage: "https://i2.cdn.turner.com/cnnnext/dam/assets/140926165711-john-sutter-profile-image-large-169.jpg",
  },
  images:[
    "https://odis.homeaway.com/odis/listing/2878aa26-7de3-4e26-95c0-41db54dde043.c10.jpg",
    "https://www.goodhouseidea.com/wp-content/uploads/2017/08/living-home-c6.1-1.jpg",
    "https://teamnacl.com/wp-content/uploads/2017/06/self-sustainable-homes-for-sale-in-arizonaself-homesteadself-europe-homesteading-videos-homesteads-960x640.jpg"
  ]
}

class ProjectDetails extends Component {


  tabBarOnPress(){
    
  }


  ////////////////////////
  // Navigation Options
  ////////////////////////

  static navigationOptions = {
    // If project is in preview mode we show the done button
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
     <ScrollView style={{flex: 1, backgroundColor: "#FFF"}}>
      <View>
        <Carousel>
         {TEMP_DATA.images.map((imageSource, index) => 
           <Poster source={imageSource} key={index}/>
         )}
        </Carousel>
        <View style={styles.header}>
          <View style={styles.projectHeaderTop}>
            <View style={styles.headerTopLeft}>
              <Image style={styles.userImage} source={{uri: TEMP_DATA.user.profileImage}} />
            </View>
            <View style={styles.headerTopRight}>
              <Text>SustainableNomad</Text>
              <Text style={styles.projectTitle}>Tiny Kitchen, Tool Shed, and Backroom</Text>
            </View>
          </View>
          <View style={styles.projectHeaderBottom}>
            <View style={styles.headerBottomLeft}>
              <Image style={styles.mapIcon}source={PROJECT_MAP_ICON_IMAGE}/>
            </View>
            <View style={styles.headerBottomRight}>
              <Text style={styles.projectAddress}>5441 Makati Circle, San Jose, Ca 95123</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.descriptionWrapper}>
        <Text style={styles.descriptionHeader}>About</Text>
        <Text style={styles.descriptionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae libero ante. Ut turpis ex, scelerisque eu iaculis vel, porta vitae velit. Maecenas semper quam eros, non malesuada tellus placerat ut. Phasellus est orci, sodales quis neque at, maximus pharetra arcu. In a nibh lacus. Suspendisse nec urna a nulla vehicula interdum quis at justo. Praesent dui nisi, pulvinar ut massa ut, condimentum sollicitudin odio. Aliquam a venenatis ligula, a dapibus turpis. In id convallis dolor. Morbi tellus enim, scelerisque non tellus eu, pulvinar pulvinar nisi. Nunc justo orci, lobortis sit amet odio a, elementum fermentum eros. Duis ornare, tellus sit amet lobortis scelerisque, est lorem blandit diam, id faucibus eros nisl nec turpis. Fusce egestas neque varius pellentesque euismod. Mauris odio tellus, tempor id molestie in, bibendum ut quam. </Text>
      </View>
     </ScrollView>
    );
  }
}

////////////////////////
// Screen Styles
////////////////////////

const styles = StyleSheet.create({

  header:{
    margin: 20,
    borderBottomColor: COLORS.LIGHT_GREY,
    borderBottomWidth: 0.5,
    paddingBottom: 15
  },
  projectHeaderTop:{
    flexDirection: "row",
  },
  projectHeaderBottom:{
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
  descriptionWrapper:{
    marginLeft: 20,
    marginRight: 20
  },
  descriptionHeader:{
    fontFamily: FONTS.PRIMARY,
    fontWeight: FONT_WEIGHT.REGULAR,
    fontSize: 18,
    paddingBottom: 10,
  },
  descriptionText:{
    fontFamily: FONTS.PRIMARY
  }

});

////////////////////////
// Map to props
////////////////////////

const mapStateToProps = (state) => {
  return {
    isFetching: state.session.isFetching,
    isErrored: state.session.isErrored
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(accountLogout())
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(ProjectDetails);