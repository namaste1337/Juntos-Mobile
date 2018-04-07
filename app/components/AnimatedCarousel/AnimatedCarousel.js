// The prupose of this file is to define 
// and standardize the organization of an
// Custom Comonent file. Each section below
// has been defined to organize code in regards 
// to it's function.


// Note:
// Each action file must have a descriptive 
// purpose at the top of the file.


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

/////////////////////////////
// Import Custom Components
/////////////////////////////

import {Poster} from "./../../components/Carousel";
import CardView from "./../../components/CardView";

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


const SCREEN_WIDTH = Dimensions.get("window").width;
const xOffset      = new Animated.Value(0);

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
// Animated
/////////////////////////

const transitionAnimation = index => {
  return {
    opacity: xOffset.interpolate({
      inputRange: [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH
      ],
      outputRange: [0.80, 1, 0.80]
    }),
    transform: [
      { perspective: 800 },
      {
        scale: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [0.80, .90, 0.80]
        })
      },
      {
        translateX: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [-60, 0, 60]
        })
      }
    ]
  };
};

////////////////////////
// Statless Component 
/////////////////////////
 
const AnimatedCard = props => {
  return (
    <View style={styles.scrollPage}>
      <Animated.View style={[styles.animatedCard, props.style, transitionAnimation(props.index)]}>
        <CardView>
          <Poster 
            title={"Awesome Title"} 
            description="Awesone Description" 
            distance={"2 miles"}
            source={"https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}/>
        </CardView>
      </Animated.View>
    </View>
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
  // Animations
  ////////////////////////



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



  // Note: Publci and private methods

 render() {
    return (
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: xOffset } } }],
          { useNativeDriver: true }
        )}
        horizontal
        pagingEnabled
        style={styles.scrollView}
      >
        <AnimatedCard text="Screen 1" index={0} />
        <AnimatedCard text="Screen 2" index={1} />
        <AnimatedCard text="Screen 3" index={2} />
        <AnimatedCard text="Screen 4" index={3} />
        <AnimatedCard text="Screen 5" index={4} />
        <AnimatedCard text="Screen 6" index={5} />
        <AnimatedCard text="Screen 7" index={6} />
      </Animated.ScrollView>
    );
  }

}


////////////////////////
// Prop Type Checks
////////////////////////

AnimatedCarousel.propTypes = {
  //Prop validation definitions for custom props
}

export default AnimatedCarousel;


// const styles = StyleSheet.create({
//   scrollView: {
//     flexDirection: "row",
//     width: SCREEN_WIDTH,
//   },
//   scrollPage: {
//     // width: SCREEN_WIDTH,
//   },
//   screen: {
//     width: SCREEN_WIDTH,
//     height: 180,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 4,
//     backgroundColor: "orange"
//   },
//   text: {
//     fontSize: 45,
//     fontWeight: "bold"
//   }
// });
