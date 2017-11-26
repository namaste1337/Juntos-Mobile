////////////////////////
// Import Modules
////////////////////////

// Note: node module imports
import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  ImageBackground
} from 'react-native';
import PropTypes from "prop-types";

////////////////////////
// Import Commmon Files
////////////////////////

// Note: Common files located in app/common
// Conditional rendering
import {renderIf} from "./../../common/components";

////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";

////////////////////////
// Constants
////////////////////////

// Images
const TEMPORARY_IMAGE                       = require("./../../assets/projects/tempImage.png");


////////////////////////
// Component
/////////////////////////

class  ProjectPoster extends Component {


  ////////////////////////
  // Default Props
  ////////////////////////

  static defaultProps = {
    ...Component.defaultProps,
    // Default props definitions
  }

  ////////////////////////
  // Constructor
  ////////////////////////

  constructor(props){

    super(props)
    this.state = {
    // Initial state definitions
    }
  }

  ////////////////////////
  // Life Cycle
  ////////////////////////


  ////////////////////////
  // Getters and Setters
  ////////////////////////

  //Note: Public and private getters and setters

  ////////////////////////
  // Callbacks
  ////////////////////////

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

 // onLoadEnd={()=>{ if (!this.state.scrollViewBounced) this._bounceScrollView()}}


////////////////////////
// Prop Type Checks
////////////////////////

ProjectPoster.propTypes = {
  //Prop validation definitions for custom props
}

export default ProjectPoster;

