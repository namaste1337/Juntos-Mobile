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
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Dimensions
} from 'react-native'

////////////////////////
// Imports Common Files
////////////////////////

// Conditional rendering
import {renderIf} from "./../../common/components";
import CommonStyles from "./../../common/styles";

////////////////////////
// Import Styles
////////////////////////

// import styles from "./styles";

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import StaticField from './../StaticField';

////////////////////////
// Constants
////////////////////////

const { height, width } = Dimensions.get("window");

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
      modalVisible: false,
      yCoordinate: new Animated.Value(height),
      pickerHeight: 0
    }


  }
  componentWillUnmount(){
  
  }

  ////////////////////////
  // Callbacks
  ////////////////////////

  // Handles dispalying the picker when 
  // thefield is touched
  _onInputPress(){

    this.setState({
      modalVisible: true
    })

  }

  _onConfirmPress(){

    this._closeModel();

  }

  _onCanelPress(){

    this._closeModel();

  }

  _onModalShow(){

    Animated.timing(           
      this.state.yCoordinate,         
      {
        toValue: height - 255,                
        duration: 200,           
      }
    ).start(); 

  }

  ////////////////////////
  // PriVate Methods
  ////////////////////////

  // Handles closing the list picker model
  _closeModel(){

    Animated.timing(           
      this.state.yCoordinate,         
      {
        toValue: height,                
        duration: 200,           
      }
    ).start(() => {
      this.setState({
        modalVisible: false
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
        transparent={true}
        animationType={"none"}
        onShow={()=> this._onModalShow()}>
        <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.5)"}}>
          <Animated.View 
          style={{ position:"absolute", width: width, left: 0, top: this.state.yCoordinate}}>
            
            <View style={{flexDirection: "row", backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#CCCCCC'}}>
  
              <View style={{padding: 12, flex: 1}}>
                <TouchableOpacity onPress={() => this._onCanelPress()}>
                  <Text style={{fontSize: 16, color: "#5e5e5e"}}> Cancel </Text>
                </TouchableOpacity>
              </View>
  
              <View style={{padding: 12, flex: 1, alignItems: "flex-end"}}>
                <TouchableOpacity onPress={() => this._onConfirmPress()}>
                  <Text style={{fontSize: 16, color: "#FF3366"}}> Done </Text>
                </TouchableOpacity>
              </View>
  
            </View>

  
            <Picker
              style={{backgroundColor:"white"}}
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              {this.props.pickerData.map((data) => {
                return(<Picker.Item label={data} value={data} />)
              })}
            </Picker>
          </Animated.View>
        </View>
        </Modal>
      </View>
    )
  }
};
// <ListItems pickerData={this.props.pickerData} />
const styles = StyleSheet.create({

})
     

export default ListPickerField;