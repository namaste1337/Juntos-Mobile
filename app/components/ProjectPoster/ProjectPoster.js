////////////////////////
// Import Modules
////////////////////////

// Note: node module imports
import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground
} from 'react-native';
import PropTypes from "prop-types";


////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";

////////////////////////
// Constants
////////////////////////

// Images
const TEMPORARY_IMAGE = require("./../../assets/projects/tempImage.png");

////////////////////////
// Component
/////////////////////////

  /* 
  
  // Required props

  data: type posterData (object) {
      id: Number,
      image: String,
      title: String,
      description: String,
      distance: String
    }
  

  */

class  ProjectPoster extends Component {

  ////////////////////////
  // Methods
  ////////////////////////

  render(){

    return (

      <ImageBackground style={styles.carouselTempImage} source={TEMPORARY_IMAGE}>
        <ImageBackground 
        source={{uri: this.props.data.image}} 
        style={styles.carouselImage}>
          <View style={styles.carouselTextView}>
            <View style={styles.carouselFirstLineTextWrapper}>
              <Text style={styles.carouselTitleText}> {this.props.data.title} </Text>
              <Text style={styles.carouselDistanceText}> {this.props.data.distance}  </Text>
            </View>
            <View>
              <Text style={styles.carouselDescriptionText}> {this.props.data.description}  </Text>
            </View>
          </View>
        </ImageBackground>
      </ImageBackground>

    );
  }
}


////////////////////////
// Prop Type Checks
////////////////////////

ProjectPoster.propTypes = {
  //Prop validation definitions for custom props
  data: PropTypes.object.isRequired
}

export default ProjectPoster;

