
////////////////////////
// Import Modules
////////////////////////

// Note: node module imports
import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground
} from 'react-native';
import PropTypes from "prop-types";

////////////////////////
// Import Commmon Files
////////////////////////

import {renderIf} from "./../../common/components";
import {deviceProperties} from "./../../common/device";

////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";

////////////////////////
// Constants
////////////////////////

// Images
const TEMPORARY_IMAGE                       = require("./../../assets/projects/tempImage.png");
// Key Suffixes
const PAGER_SUFFIX_KEY                      = "-pager";
const IMAGEBACKGROUND_SUFFIX_KEY            = "-imageBackground";
const IMAGE_SUFFIX_KEY                      = "-image"
// Properties
const SCROLL_VIEW_EVENT_THROTTILE_PROPERTY  = 1;
const SCROLL_VIEW_PAGING_PROPERTY           = true;
const SCROLL_VIEW_HORIZONTAL_PROPERTY       = true;
const SCROLL_VIEW_INIAL_PAGE_PROPERTY       = 0;
const SCROLL_VIEW_X_DESTINATION_PROPERTY    = 50;
const SCROLL_VIEW_X_ORIGIN_PROPERTY         = 0;
const SCROLL_VIEW_Y_ORIGIN_PROPERTY         = 0;
const SCROLL_VIEW_ANIMATED_PROPERTY         = true;
const SCROLL_VIEW_ANIMATION_TIME_1000       = 1000;
const SCROLL_VIEW_ANIMATION_TIME_2000       = 2000;

// Bools
const SCROLL_VIEW_BOUNCED_TRUE_BOOL         = true;
const SCROLL_VIEW_BOUNCED_FALSE_BOOL        = false;


////////////////////////
// Component
/////////////////////////
  /* 
  
  // Required props

  data: type data (Array) [
    {
      id: Number,
      image: String,
      title: String,
      description: String,
      distance: String
    }
  ]
  onPageChangeEnd: type function(page),
  passes back project carousel current page
  as the first parameter of the callback. 
  */

class ProjectCarousel extends Component {


  ////////////////////////
  // Constructor
  ////////////////////////

  constructor(props){

    super(props)
    this.state = {
      // Initial state definitions
      pageIndicators: [],
      lastActiveIndicator: null,
      scrollViewBounced: SCROLL_VIEW_BOUNCED_FALSE_BOOL
    }
    // Caveat: If the ref callback is set inline the refs will get called 
    // twice during updates. Because a new instance of the function is created
    // with each render, React needs to clear the old ref and set up the new 
    // one. You can avoid this be defining the ref callback as a bound method
    // on the class, but not that it shouldn't matter in most cases.
    // We bind the setPagerIndicator to allow the pageIndicator refs
    // to only be set once. 
    this._setPagerIndicatorRefs = this._setPagerIndicatorRefs.bind(this);
  }

  ////////////////////////
  // Setters & Getters
  ////////////////////////

  // Sets the active page indicator for 
  // the paging scroll view.
  _setActivePageIndicator(page){
    console.log(page);

    // Get the indicator in regards to the page
    let pageIndicator = this.state.pageIndicators[page];
        
    // First indicator is affected by this logic.
    if(pageIndicator != this.state.lastActiveIndicator){
      // Set the current page indicator to active
      pageIndicator.setNativeProps({style: styles.pageIndicatorActive});
  
      // Set the last page indicator to 
      if(this.state.lastActiveIndicator != null)
        this.state.lastActiveIndicator.setNativeProps({style: styles.pageIndicatorInactive});
  
      // Set the last active indicator
      this.state.lastActiveIndicator = pageIndicator;
    }
  }

  // Sets a ref for a page indicator to the pageIndicators state object
  _setPagerIndicatorRefs(ref){
    this.state.pageIndicators[this.state.pageIndicators.length] = ref
  }

  ////////////////////////
  // Lifecycle
  ////////////////////////

  componentDidMount(){

    // Set the intial active page indicator
    this._setActivePageIndicator(SCROLL_VIEW_INIAL_PAGE_PROPERTY);

  }

  ////////////////////////
  // Callbacks
  ////////////////////////

  // ScrollDidEnd calculate the current page 
  // that the user has scrolled too.
  _onScrollDidEnd(event: Object){
    let currentEvent    = event.nativeEvent;
    let scrollViewWidth = currentEvent.layoutMeasurement.width;
    let currentOffset   = currentEvent.contentOffset.x;
    let currentPage     = Math.ceil(currentOffset/scrollViewWidth);

    // Set the current active indicator if it is within bounds
    if(currentPage < this.props.data.length)
      this._setActivePageIndicator(currentPage);

    // Validate that the onPageChangeEnd prop
    // had been set
    if(this.props.onPageChangeEnd)
      this.props.onPageChangeEnd(currentPage);
  }

  // Handles bouncing the scroll view to indicate
  // to users that they can scroll more projects
  // to the right.
  _bounceScrollView(){
    
    // Set the state of scroll view bounced to true
    this.setState({
      scrollViewBounced: SCROLL_VIEW_BOUNCED_TRUE_BOOL
    })

    // Show scrollView bounce effect
    this._scrollView.flashScrollIndicators();
    setTimeout(() => {
      this._scrollView.scrollTo({x: 
        SCROLL_VIEW_X_DESTINATION_PROPERTY, 
        y: SCROLL_VIEW_Y_ORIGIN_PROPERTY, 
        animated: SCROLL_VIEW_ANIMATED_PROPERTY
      });
    }, SCROLL_VIEW_ANIMATION_TIME_1000);
    setTimeout(() => {
      this._scrollView.scrollTo({
        x: SCROLL_VIEW_X_ORIGIN_PROPERTY, 
        y: SCROLL_VIEW_Y_ORIGIN_PROPERTY, 
        animated: SCROLL_VIEW_ANIMATED_PROPERTY});
    }, SCROLL_VIEW_ANIMATION_TIME_2000);
 

  }

  ////////////////////////
  // Methods
  ////////////////////////

  render(){

    return (
      <View>
        <View style={styles.carouselIndicatorWrapper}>
          {this.props.data.map(data =>
            <View key={data.id + PAGER_SUFFIX_KEY} 
              ref={this._setPagerIndicatorRefs}
              style={styles.carouselIndicatorInactive}>
            </View>)
          }
        </View>
        <ScrollView 
        ref={ref => this._scrollView = ref}
        scrollEventThrottle={SCROLL_VIEW_EVENT_THROTTILE_PROPERTY} 
        onMomentumScrollEnd={event=> this._onScrollDidEnd(event)} 
        pagingEnabled={SCROLL_VIEW_PAGING_PROPERTY} 
        horizontal={SCROLL_VIEW_HORIZONTAL_PROPERTY}>
          {this.props.data.map(data =>
          <ImageBackground key={data.id + IMAGEBACKGROUND_SUFFIX_KEY} style={styles.carouselTempImage} source={TEMPORARY_IMAGE}>
              <ImageBackground
              key={data.id + IMAGE_SUFFIX_KEY}  
              source={{uri: data.image}} 
              onLoadEnd={()=>{ if (!this.state.scrollViewBounced) this._bounceScrollView()}}
              style={styles.carouselImage}>
                <View style={styles.carouselTextView}>
                  <View style={styles.carouselFirstLineTextWrapper}>
                    <Text style={styles.carouselTitleText}> {data.title} </Text>
                    <Text style={styles.carouselDistanceText}> {data.distance}  </Text>
                  </View>
                  <View>
                    <Text style={styles.carouselDescriptionText}> {data.description}  </Text>
                  </View>
                </View>
              </ImageBackground>
            </ImageBackground>
            )
          }
        </ScrollView>
      </View>
    )
  }

}


////////////////////////
// Prop Type Checks
////////////////////////

ProjectCarousel.propTypes = {
  //Prop validation definitions for custom props
  data: PropTypes.array.isRequired,
  onPageChangeEnd: PropTypes.func.isRequired

}

export default ProjectCarousel;

