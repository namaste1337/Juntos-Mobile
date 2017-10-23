////////////////////////
// Imports
////////////////////////

import React, { Component } from 'react';
import {bindActionCreators, connect} from 'react-redux';
import { 
Text, 
View,
Image,
ImageBackground,
Dimensions,
TouchableOpacity,
ScrollView,
StyleSheet } from 'react-native';

////////////////////////
// Constants
////////////////////////

//Images
const profileImage  = require("./../assets/profile/profile.jpg");
const leftArrow     = require("./../assets/profile/left-arrow.png");
const menu          = require("./../assets/profile/menu.png");
const verifiedCheck = require("./../assets/profile/verify-button-circle.png");
const profileIcon   = require("./../assets/profile/profile-icon.png");
const likesIcon     = require("./../assets/profile/likes-icon.png");
const networkIcon   = require("./../assets/profile/network-icon.png");
const messagesIcon  = require("./../assets/profile/messages-icon.png");
//Test Image
const t1 = require("./../assets/profile/t1.jpg");
const t2 = require("./../assets/profile/t2.jpg");
const t3 = require("./../assets/profile/t3.jpg");
const t4 = require("./../assets/profile/t4.jpg");
const t5 = require("./../assets/profile/t5.jpg");
const t6 = require("./../assets/profile/t6.jpg");
// Properties
const BUTTON_HIT_SLOP               = 30;
const IMAGE_BACKGROUND_BLUR_RADIUS  = 25;
const IMAGE_BACKGROUND_OPACITY      = 0.5;
// Devices
const screenCenter                  = Dimensions.get('window').width/2;

class Profile extends Component {

  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    return (
     <ScrollView style={styles.container}>
        <View style={styles.profileBackground} >
          <ImageBackground 
          blurRadius={IMAGE_BACKGROUND_BLUR_RADIUS} 
          style={styles.profileBackgroundImageWrapper}
          opacity={IMAGE_BACKGROUND_OPACITY}
          source={profileImage}>
            <View style={styles.profileWrapper}>
              {/*<TouchableOpacity style={styles.navigationArrowTouchable} hitSlop={{bottom: BUTTON_HIT_SLOP, top: BUTTON_HIT_SLOP, left: BUTTON_HIT_SLOP, right: BUTTON_HIT_SLOP}}>
                <Image source={leftArrow} style={styles.navigationArrow} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuButtonTouchable}>
                <Image source={menu} style={styles.menuButton}/>
              </TouchableOpacity>*/}
              <Image source={profileImage} style={styles.profileImage} />
              <Image source={verifiedCheck} style={styles.verifiedCheck}/>
              <Text style={styles.profileUserName}> 
                Jannet Watson
              </Text>
              <Text style={styles.profileDescription}>
                Janet is an entrepreneur with a love of music.
                She has used her passion to pursue her dream career. And is now a successful music therapist.
              </Text>
            </View>
            <View style={styles.statsWrapper}>
                <TouchableOpacity style={styles.stat}>
                  <Image source={profileIcon} style={styles.statIcon}/>
                  <Text style={styles.statText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.stat}>
                  <Image source={likesIcon} style={styles.statIcon}/>
                  <Text style={styles.statText}>Likes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.stat}>
                  <Image source={networkIcon} style={styles.statIcon}/>
                  <Text style={styles.statText}>Network</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.stat}>
                  <Image source={messagesIcon} style={styles.statIcon}/>
                  <Text style={styles.statText}>Message</Text>
                </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.photosWrapper}>
          <View style={styles.photoHeaderWrapper}>
            <View style={styles.photoHeaderPhotoCount}>
              <Text style={styles.photoHeaderLeftText} >48 PHOTOS</Text>
            </View>
            <View style={styles.photoHeaderMorePhotos}>     
              <Text style={styles.photoHeaderRightText}>SEE ALL ></Text>
            </View>
          </View>
          <View style={styles.photosSectionWrapper}>
            <Image source={t1} resizeMode={"cover"} style={styles.imageTest} />
            <Image source={t2} resizeMode={"cover"} style={styles.imageTest} />
            <Image source={t3} resizeMode={"cover"} style={styles.imageTest} />
            <Image source={t4} resizeMode={"cover"} style={styles.imageTest} />
            <Image source={t5} resizeMode={"cover"} style={styles.imageTest} />
            <Image source={t6} resizeMode={"cover"} style={styles.imageTest} />
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
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  
  ////////////////////
  // Buttons
  ///////////////////
  
  navigationArrowTouchable:{
    position: "absolute",
    left: 20,
    top: 40
  },
  navigationArrow:{
    width: 15,
    height: 25,
  },
  menuButtonTouchable:{
    position: "absolute",
    right: 20,
    top: 40
  },
  menuButton:{
    width: 20,
    height: 20
  },
  
  ////////////////////
  // Profile
  ///////////////////
  
  verifiedCheck:{
    position:"absolute",
    height: 25,
    width: 25,
    top: 30,
    left: screenCenter + 25,
  },
  profileBackground:{
    backgroundColor: "black"
  },
  profileBackgroundImageWrapper:{
   
  },
  profileWrapper:{
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: "center",
  },
  profileImage:{
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 2,
  },
  profileUserName:{
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "400",
    color: "white",
    backgroundColor: "transparent"
  },
  profileDescription:{
    color: "white",
    backgroundColor: "transparent",
    fontWeight: "100",
    textAlign: "center",
    opacity: 0.7
  },
  
  ////////////////////
  //Stats
  ///////////////////
  
  statsWrapper:{
    flexDirection: "row",
  },
  
  stat:{
    flexDirection: "row",
    flexGrow: 1,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  
  statText:{
    fontSize: 15,
    paddingLeft: 5,
    color: "white",
  },
  
  statIcon:{
    tintColor: "#FF3366",
    width: 15,
    height: 15
  },
  
  ////////////////////
  //Photos
  ///////////////////
  
  photosWrapper:{
    flex: 1
  },
  photoHeaderWrapper:{
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderColor: '#aaaaaa',
    borderBottomWidth: 0.5
  },
  photoHeaderPhotoCount:{
    flexGrow: 1,
  },
  photoHeaderMorePhotos:{
    alignItems: "flex-end",
    flexDirection: "row"
  },
  photoHeaderLeftText:{
    fontWeight: "600", 
    color: "#1c1c1c"
  },
  photoHeaderRightText:{
    fontWeight: "600", 
    color: "#b3b3b3",
  },
  photosSectionWrapper:{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 7.5,
    paddingVertical: 15

  },
  imageTest: {
    flexGrow: 1,
    width: 100,
    height: 100,
    marginBottom: 15,
    marginHorizontal: 7.5
  },
  
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
    sessionLogin: (email, password) => dispatch(sessionLogin(email, password))
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(Profile);