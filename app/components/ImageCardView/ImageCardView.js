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
        <CardView>
          <Image style={{width: width/4, height: width/4, paddingVertical: 5, paddingHorizontal: 5}} key={1} source={this.props.source}/>
          <Text style={{fontFamily: "Roboto-Light", fontSize:10, paddingVertical: 5, paddingHorizontal: 5}}> This is an image...</Text>
        </CardView>
      </View>
    )
  }
};     
// <View style={styles.imageCardWrapper}><Image style={{width: width/2, height: width/2, paddingVertical: 5, paddingHorizontal: 5}} key={1} source={image}/></View>
export default ImageCardView;