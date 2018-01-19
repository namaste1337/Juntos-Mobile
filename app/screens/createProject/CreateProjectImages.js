////////////////////////
// Imports
////////////////////////

import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {bindActionCreators, connect} from 'react-redux';
import { 
Text, 
Dimensions,
ScrollView,
Image,
StyleSheet,
TouchableOpacity,
View
} from 'react-native';

//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles from "../../common/styles.js"

////////////////////////
// Actions
////////////////////////

import {accountLogout} from "./../../actions/account-actions.js";

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import PrimaryButton from './../../components/PrimaryButton';

////////////////////////
// Constants
////////////////////////
const screenCenter                  = Dimensions.get('window').width/2;

class CreateProjectImages extends Component {

  constructor(props){
    super(props);
    this.state = {
      projectImages:[]
    }

  }


  tabBarOnPress(){
    
  }


  ////////////////////////
  // Navigation Options
  ////////////////////////

  static navigationOptions = {
    headerRight: <TouchableOpacity><Text>Next</Text></TouchableOpacity>,
  }

  ////////////////////////
  // Callbacks
  ////////////////////////
    //Handles profile image button press
  _onAddImagePress(){

    ImagePicker.openPicker({
      width: 300,
      height: 200,
      cropping: 300
    }).then(image => {
      let source = { uri: image.path };
      // this.setState({
      //   profileImageData: {
      //     uri: image.path,
      //     mime: image.mime
      //   },
      //   profileImage: source,
      //   profileImageValid: PROFILE_IMAGE_TRUE_STATE
      // });
      
      this.setState(function(previousState){
        previousState.projectImages[previousState.projectImages.length] = source;
        return previousState;
      })
    }).catch(error => {
      console.log(error);
    });

  }

  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    console.log(this.state);
    return (
     <ScrollView style={CommonStyles.container} >
      <TouchableOpacity onPress={()=> this._onAddImagePress()}>
       <View><Text>Add Image</Text></View>
      </TouchableOpacity>
     <View style={{flex: 1, flexDirection: "row"}}>
      {this.state.projectImages.map(function(image){
       console.log(image);
       return (<Image style={{width: 100, height: 100}} key={1} source={image}/>);
      })}
     </View>
     </ScrollView>
    );
  }
}


////////////////////////
// Screen Styles
////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  tabBarIcon:{
    width: 25,
    height: 25
  }
});

////////////////////////
// Map to props
////////////////////////

const mapStateToProps = (state) => {
  return {
    isFetching: state.session.isFetching,
    isErrored: state.session.isErrored,
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(accountLogout())
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(CreateProjectImages);