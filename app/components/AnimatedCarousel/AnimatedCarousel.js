
////////////////////////
// Import Modules
////////////////////////

// Note: node module imports
import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
  ScrollView
} from 'react-native';
import PropTypes from "prop-types";
import Carousel from 'react-native-snap-carousel';

/////////////////////////////
// Import Custom Components
/////////////////////////////

import ShadowView from "./../../components/ShadowView";
import {Poster} from "./../../components/Carousel";

////////////////////////
// Import Commmon Files
////////////////////////

import {deviceProperties} from "./../../common/device";

////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";

////////////////////////
// Constants
////////////////////////

//Properties
const SLIDER_WIDTH_PROPERTY             = deviceProperties.width;
const ITEM_WIDTH_PROPERTY               = deviceProperties.width - 50;
const SLIDER_USE_SCROLL_VIEW_PROPERTY   = true;
const SLIDER_LOCK_SCROLL_VIEW_PROPERTY  = true


////////////////////////
// Stateless Component 
/////////////////////////
 //transitionAnimation(props.index)
const Card = props => {
  return (
    <ShadowView>
      <View style={styles.card}>
        <Poster {...props} />
      </View>
    </ShadowView>
  );
};


////////////////////////
// Component
/////////////////////////

class  AnimatedCarousel extends Component {


  ////////////////////////
  // Default Props
  ////////////////////////

  static defaultProps = {
    ...Component.defaultProps,
    // Default props definitions
  }

  goToPage(page){

    this._carsourel.snapToItem(page);

  }

  ////////////////////////
  // Methods
  ////////////////////////
  
  render () {
    return (
      <Carousel
        ref={ref=> this._carsourel = ref}
        sliderWidth={SLIDER_WIDTH_PROPERTY}
        useScrollView={SLIDER_USE_SCROLL_VIEW_PROPERTY}
        lockScrollWhileSnapping={SLIDER_LOCK_SCROLL_VIEW_PROPERTY}
        itemWidth={ITEM_WIDTH_PROPERTY} 
        {...this.props} />
    );
  }

}


////////////////////////
// Prop Type Checks
////////////////////////

AnimatedCarousel.propTypes = {
  //Prop validation definitions for custom props
}

export {AnimatedCarousel as default, Card};

