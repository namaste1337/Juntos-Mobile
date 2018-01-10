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
import PropTypes from "prop-types";

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
// String
const PICKER_VALUE_EMPTY_STRING         = "";
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
      listPickerValue: PICKER_VALUE_EMPTY_STRING
    }
  }

  ////////////////////////
  // Setters & Getters
  ////////////////////////

  get _pickerValue(){

    return this.state.listPickerValue;

  }

  // Handles setting the state for the
  // picker value
  set _pickerValue(value){

    this.setState({
      listPickerValue: value
    })

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

    // Clear the list picker value if canceled
    this._clearListPickerValue();

  }

  // Handles executing the modal
  // show animation.
  _onModalShow(){

    this._openModal();

    // Set the default picker selection
    // to the staticField on open
    if(this._pickerValue == PICKER_VALUE_EMPTY_STRING)
      this._pickerValue = this.props.pickerData[0];

  }

  // Handles setting the pickerValue to the
  // static field and sending the value 
  // back to the component callback when 
  // an item is selected
  _onPickerItemSelect(itemValue){
    console.log(itemValue)

    // Set the value to the field
    this._pickerValue = itemValue;
    // Send value back to callback
    this._sendValueToCallback(itemValue);

  }

  ////////////////////////
  // Private methods
  ////////////////////////

  // Hanldes sending the value to
  // the parent component onValueChange
  // callback.
  _sendValueToCallback(itemValue){

    if(this.props.onValueChange != null)
      this.props.onValueChange(itemValue)

  }

  // Handles clearing the picker value
  _clearListPickerValue(){
    this._pickerValue = PICKER_VALUE_EMPTY_STRING;
  }

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
        value={this.state.listPickerValue}
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
              selectedValue={this.state.listPickerValue}
              onValueChange={(itemValue, itemIndex) => this._onPickerItemSelect(itemValue)}>
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

////////////////////////
// Prop Type Checks
////////////////////////

ListPickerField.propTypes = {
  //Prop validation definitions for custom props
  validationMessage: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  pickerData: PropTypes.array.isRequired

}

export default ListPickerField;