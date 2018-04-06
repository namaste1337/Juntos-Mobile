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

////////////////////////
// Import Commmon Files
////////////////////////

// Note: Common files located in app/common
// Conditional rendering
import {renderIf} from "./../../common/components";

////////////////////////
// Import Styles
////////////////////////

// import styles from "./styles";

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


  screen = props => {
    return (
      <View style={styles.scrollPage}>
        <Animated.View style={[styles.screen, this.transitionAnimation(props.index)]}>
          <Text style={styles.text}>{props.text}</Text>
        </Animated.View>
      </View>
    );
  };

  transitionAnimation = index => {
  return {
    opacity: xOffset.interpolate({
      inputRange: [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH
      ],
      outputRange: [0, 1, 0]
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
          outputRange: [0.25, .90, 0.25]
        })
      }
    ]
  };
};
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
        <this.screen text="Screen 1" index={0} />
        <this.screen text="Screen 2" index={1} />
        <this.screen text="Screen 3" index={2} />
        <this.screen text="Screen 4" index={3} />
        <this.screen text="Screen 5" index={4} />
        <this.screen text="Screen 6" index={5} />
        <this.screen text="Screen 7" index={6} />
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


// import React, { Component } from "react";
// import {
//   Animated,
//   Dimensions,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View
// } from "react-native";

// const SCREEN_WIDTH = Dimensions.get("window").width;

// const xOffset = new Animated.Value(0);

// export default class App extends Component {
//   render() {
//     return (
//       <View>
//         <Animated.ScrollView
//           scrollEventThrottle={16}
//           onScroll={Animated.event(
//             [{ nativeEvent: {contentOffset: { x: xOffset} } }],
//             { useNativeDriver: true }
//           )}
//           horizontal
//           pagingEnabled
//           decelerationRate={"fast"}
//           style={styles.scrollView}
//         >
//           <Screen style={{backgroundColor: "pink"}} text="Card 1" index={0} />
//           <Screen style={{backgroundColor: "black"}} text="Card 2" index={1} />
//           <Screen style={{backgroundColor: "purple"}} text="Card 3" index={2} />
//           <Screen style={{backgroundColor: "blue"}} text="Card 4" index={3} />
//           <Screen style={{backgroundColor: "red"}} text="Card 5" index={4} />
//           <Screen style={{backgroundColor: "green"}} text="Card 6" index={5} />
//           <Screen style={{backgroundColor: "orange"}} text="Card 7" index={6} />
//         </Animated.ScrollView>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "row",
    width: SCREEN_WIDTH,
  },
  scrollPage: {
    // width: SCREEN_WIDTH,
  },
  screen: {
    width: SCREEN_WIDTH,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "orange"
  },
  text: {
    fontSize: 45,
    fontWeight: "bold"
  }
});
