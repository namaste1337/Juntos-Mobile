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
  Image
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

////////////////////////
// Component
/////////////////////////

class Pager extends Component {


  ////////////////////////
  // Constructor
  ////////////////////////

  constructor(props){

    super(props)
    this.state = {
      // Initial state definitions
      pageIndicators: new Array(10),
      lastActiveIndicator: null,
      scrollViewBounced: false
    }
  }

  ////////////////////////
  // Setters & Getters
  ////////////////////////

  // Sets the active page indicator for 
  // the paging scroll view.
  _setActivePageIndicator(page){
    console.log(this.state.pageIndicators);
    let pageIndicator = this.state.pageIndicators[page];
    pageIndicator.setNativeProps({styles: pageIndicatorActive});

    // Set the last page indicator to 
    if(lastActiveIndicator != null)
      lastActiveIndicator.setNativeProps({styles: pageIndicatorInactive});

    // Set the last active indicator
    lastActiveIndicator = pageIndicator;

  }

  ////////////////////////
  // Lifecycle
  ////////////////////////

  componenDidMount(){


    this._setActivePageIndicator(0);


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

    // Set the current active indicator
    // this._setActivePageIndicator(currentPage);

    // Validate that the onPageChangeEnd prop
    // had been set
    console.log(`Current Page: ${currentPage}`);
    if(this.props.onPageChangeEnd)
      this.props.onPageChangeEnd(currentPage);
  }

  // Handles bouncing the scroll view to indicate
  // to users that they can scroll more projects
  // to the right.
  _bounceScrollView(){
    
    // Set the state of scroll view Bounces to true
    this.setState({
      scrollViewBounced: true
    })

    // Show scrollView bounce effect
    this._scrollView.flashScrollIndicators();
    setTimeout(() => {
      this._scrollView.scrollTo({x: 50, y: 0, animated: true});
    }, 1000);
    setTimeout(() => {
      this._scrollView.scrollTo({x: 0, y: 0, animated: true});
    }, 2000);
 

  }

  //Requires props
  /* 
  data: type projectData [
    {
      image: String,
    }
  ]
  */

  render(){

    return (
      <View>
        <View style={styles.pageIndicatorWrapper}>
          {this.props.data.map(data =>
            <View key={data.id} 
              ref={ref => this.state.pageIndicators[this.state.pageIndicators.length] = ref}
              style={styles.pageIndicatorInactive}>
            </View>)
          }
        </View>
        <ScrollView 
        ref={ref => this._scrollView = ref}
        scrollEventThrottle={1} 
        onMomentumScrollEnd={event=> this._onScrollDidEnd(event)} 
        pagingEnabled={true} 
        horizontal={true}>
          {this.props.data.map(data => 
              <Image
              key={data.key}  
              source={{uri: data.image}} 
              onLoadEnd={()=>{ if (!this.state.scrollViewBounced) this._bounceScrollView()}}
              style={styles.pagerImage}/>
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

Pager.propTypes = {
  //Prop validation definitions for custom props
  data: PropTypes.array.isRequired,
  onPageChangeEnd: PropTypes.func.isRequired

}

export default Pager;

