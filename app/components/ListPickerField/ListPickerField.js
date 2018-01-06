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
  TouchableWithoutFeedback
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
// Componenet
////////////////////////

class  ListPickerField extends Component {

  ////////////////////////
  // Constructor
  ////////////////////////

  constructor(props){

    super(props)
    this.state = {
      modalVisible: false
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

  ////////////////////////
  // Pricate Methods
  ////////////////////////

  _closeModel(){
    this.setState({
      modalVisible: false
    })
  }

  ////////////////////////
  // Methods
  ////////////////////////


  render(){

    return(
      <View>
        <StaticField
        placeholder={this.props.placeholder}
        value={this.state.textInputValue}
        onPress={() => this._onInputPress() }
        valid={this.props.valid}
        validationMessage={this.props.validationMessage}/>
        <View style={[styles.datePickerWrapper]} />
        <Modal 
        visible={this.state.modalVisible} 
        transparent={true}
        animationType={"slide"}>
        <View onPress={()=> this._closeModel()} style={{ flex: 1, justifyContent:"flex-end", backgroundColor: "rgba(0,0,0,0.5)"}}>

          <View style={{flexDirection: "row"}}>

            <View style={{paddingLeft: 5, flex: 1}}>
              <TouchableOpacity onPress={() => this._onCanelPress()}>
                <Text> Cancel </Text>
              </TouchableOpacity>
            </View>

            <View style={{paddingRight: 5, flex: 1, alignItems: "flex-end"}}>
              <TouchableOpacity onPress={() => this._onConfirmPress()}>
                <Text> Done </Text>
              </TouchableOpacity>
            </View>

          </View>

          <Picker
            style={{backgroundColor:"white"}}
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
        </Modal>
      </View>
    )
  }
};

const styles = StyleSheet.create({

})
     

export default ListPickerField;