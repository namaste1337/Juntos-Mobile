
////////////////////////
// Import Modules
////////////////////////

// Note: node module imports
import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text
} from 'react-native';
import PropTypes from "prop-types";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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

// Note: Constants must be defined with all uppercase
// letters seprating words with by underscore (_).
// The constants must be seperated by purpose, and each 
// constant name followed by a pre-defined type.

// Ex:
// //Images
// const PROFILE_IMAGE = require("../assets/profile/profile_image.png");
// //Strings
// const PROFILE_NAME_STRING = @"John";
// //Numbers
// const IMAGE_COUNT_NUMBER = 5;
// //Properties 
// const IMAGE_SIZE_WIDTH_PROPERTY  = 100;
// const IMAGE_SIZE_HEIFHT_PROPERTY = 100
// //States
// const INITIAL_PROFILE_IMAGE_SOURCE_STATE =  require("../assets/profile/default_profile.png")


////////////////////////
// Component
/////////////////////////

class  GooglePlaces extends Component {


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

  triggerFocus(){
    this._places.triggerFocus();
  }

  // Note: Publci and private methods

  render(){
    console.log(styles);
    return (
      <GooglePlacesAutocomplete
        {...this.props}
        ref={ref=> this._places = ref}/>
        placeholder='Enter Location'
        minLength={2}
        autoFocus={this.state.placeSearchFocus}
        returnKeyType={'default'}
        fetchDetails={true}
        currentLocation={false}
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          console.log(data);
          // Will contain the longitude and latitutde in the geometry field
          console.log(details); 
          this.setState({
            placeSearchVisible: "none",
            locationValue: details.formatted_address,
            geometryLocation: details.geometry.location
          })

        }}
        styles={styles.placesSearch}
        query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyA9DqXBxlJc8RVlHLwg_95H8yVDGdftD3Q',
        language: 'en', // language of the results
        types: 'geocode' }} />
    )
  }

}


////////////////////////
// Prop Type Checks
////////////////////////

GooglePlaces.propTypes = {
  //Prop validation definitions for custom props
}

export default GooglePlaces;

