////////////////////////
// Import Modules
////////////////////////

import React, { Component } from 'react';
import {
  View,
  Modal,
  Text,
  Picker,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native'

////////////////////////
// Imports Common Files
////////////////////////

import {COLORS} from "./../../common/styles";

//////////////////////
//Import Styles
//////////////////////

import styles from "./styles";

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import StaticField from './../StaticField';

////////////////////////
// Constants
////////////////////////

// Properties
const MODAL_ANIMATION_TYPE_PROPERTY     = "none"
const MODAL_ANIMATION_DURATION_PROPERTY = 200;
const PICKER_HEIGHT_PROPERTY            = 255;
// Bools 
const MODAL_TRANSPARENCY_BOOL           = true;
const MODAL_VISIBLE_FALSE_BOOL          = false;
const MODAL_VISIBLE_TRUE_BOOL           = true;
// Device
const { height }                        = Dimensions.get("window");

////////////////////////
// Componenet
////////////////////////

class  ListPickerField extends Component {

  ////////////////////////
  // Constructor
  ////////////////////////

  constructor(props){
    super(props)

    this.state = {
      modalVisible: MODAL_VISIBLE_FALSE_BOOL,
      yCoordinate: new Animated.Value(height),
    }

  }

  ////////////////////////
  // Callbacks
  ////////////////////////

  // Handles displaying the picker when 
  // the field is selected
  _onInputPress(){

    this.setState({
      modalVisible: MODAL_VISIBLE_TRUE_BOOL
    })

  }

  // Handles the logic for when 
  // the confirm button is pressed
  _onConfirmPress(){

    this._closeModel();

  }

  // Handles the logic for when
  // the cofirm button is pressed
  _onCanelPress(){

    this._closeModel();

  }

  // Handles executing the modal
  // show animation.
  _onModalShow(){

    this._openModal();

  }

  ////////////////////////
  // Private methods
  ////////////////////////

  // Handles opening the list picker animation
  _openModal(){

    Animated.timing(           
      this.state.yCoordinate,         
      {
        toValue: height - PICKER_HEIGHT_PROPERTY,                
        duration: MODAL_ANIMATION_DURATION_PROPERTY,           
      }
    ).start(); 

  }

  // Handles closing the list picker animation
  _closeModel(){

    Animated.timing(           
      this.state.yCoordinate,         
      {
        toValue: height,                
        duration: MODAL_ANIMATION_DURATION_PROPERTY,           
      }
    ).start(() => {
      this.setState({
        modalVisible: MODAL_VISIBLE_FALSE_BOOL
      })
    })

  }

  ////////////////////////
  // Methods
  ////////////////////////


  render(){
    return(
      <View>
        <StaticField
        {...this.props}
        onPress={() => this._onInputPress() }
        valid={this.props.valid}/>
        <Modal 
        visible={this.state.modalVisible} 
        transparent={MODAL_TRANSPARENCY_BOOL}
        animationType={MODAL_ANIMATION_TYPE_PROPERTY}
        onShow={()=> this._onModalShow()}>
        <View style={styles.background}>
          <Animated.View 
          style={[styles.animatedView, {top: this.state.yCoordinate}]}>
            <View style={styles.toolBarWrapper}>
              <View style={styles.toolBarLeftWrapper}>
                <TouchableOpacity onPress={() => this._onCanelPress()}>
                  <Text style={styles.toolBarCanceText}> Cancel </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.toolBarRightWrapper}>
                <TouchableOpacity onPress={() => this._onConfirmPress()}>
                  <Text style={styles.toolBarDoneText}> Done </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Picker
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              {this.props.pickerData.map((data) => {
                return(<Picker.Item key={data} label={data} value={data} />)
              })}
            </Picker>
          </Animated.View>
        </View>
        </Modal>
      </View>
    )
  }
};

export default ListPickerField;