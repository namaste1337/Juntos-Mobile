
////////////////////////
// Import Modules
////////////////////////

// Note: node module imports
import React, { Component } from 'react';
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

// Strings
const PLACE_HOLDER_STRING       = 'Enter Location';
// Properties
const RETURN_KEY_TYPE_PROPERTY  = 'default';
const MINIMUM_LENGTH_PROPERTY   = 2;
const FETCH_DETAILS_PROPERTY    = true;
const QUERY_KEY_PROPERTY        = "AIzaSyA9DqXBxlJc8RVlHLwg_95H8yVDGdftD3Q";
const LANGUAGE_CODE_PROPERTY    = "en";
const TYPES_GEOCODES_PROPERTY   = "geocode";

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
  // Methods
  ////////////////////////

  triggerFocus(){
    this._places.triggerFocus();
  }

  // Note: Public and private methods

  render(){

    return (
      <GooglePlacesAutocomplete
        {...this.props}
        ref={ref=> this._places = ref}
        placeholder={PLACE_HOLDER_STRING}
        minLength={MINIMUM_LENGTH_PROPERTY}
        autoFocus={this.state.placeSearchFocus}
        returnKeyType={RETURN_KEY_TYPE_PROPERTY}
        fetchDetails={FETCH_DETAILS_PROPERTY}
        styles={styles.placesSearch}
        query={{
        key: QUERY_KEY_PROPERTY,
        language: LANGUAGE_CODE_PROPERTY,
        types: TYPES_GEOCODES_PROPERTY }} />
    )
  }

}

export default GooglePlaces;

