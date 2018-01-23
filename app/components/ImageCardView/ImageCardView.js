////////////////////////
// Import Modules
////////////////////////

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions
} from 'react-native'
const {width, height}                  = Dimensions.get('window');
////////////////////////
// Imports Common Files
////////////////////////

// Conditional rendering
import {renderIf} from "./../../common/components";

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import CardView from "./../CardView";

////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";

////////////////////////
// Componenet
////////////////////////

class  ImageCardView extends Component {

  ////////////////////////
  // Methods
  ////////////////////////

  render(){

    return(
      <View>
        <CardView style={[this.props.style, this.props.style]}>
          <Image style={styles.imageCardView} source={this.props.source}/>
        </CardView>
      </View>
    )

  }
};     

export default ImageCardView;