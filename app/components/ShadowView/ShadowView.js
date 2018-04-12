////////////////////////
// Import Modules
////////////////////////

import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native'

////////////////////////
// Imports Common Files
////////////////////////

// NOTE: Will be left in place for the android shadow implementation
// see line 39.
// import {deviceOS, deviceTypes} from "./../../common/device";

////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";



////////////////////////
// Componenet
////////////////////////


class  ShadowView extends Component {


  ////////////////////////
  // Methods
  ////////////////////////

  // TODO: The following is to allow seperate implementation
  // for the Shadow view for android and iOS. For the moment
  // we will ignore the Android implementation, do to the lack 
  // of a graceful solution. The following snippet will be
  // left in place to future proof the implementation.'

  // _renderByOS = () =>{
  //   if(deviceOS === deviceTypes.ios){
  //     return(
          // <View style={[styles.shadowViewWrapper, this.props.style]}>
          //   {this.props.children}
          // </View>
  //     );
  //   }else{
  //     return (
  //       <View>
  //         {this.props.children}
  //       </View>
  //     );
  //   }
  // }

  render(){

    return(
      <View style={[styles.shadowViewWrapper, this.props.style]}>
          {this.props.children}
      </View>
    )
  }
};

export default ShadowView;