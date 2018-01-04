////////////////////////
// Import Modules
////////////////////////

import React, { Component } from 'react';
import {
  View,
  Modal,
  Text,
  Picker
} from 'react-native'

////////////////////////
// Imports Common Files
////////////////////////

// Conditional rendering
import {renderIf} from "./../../common/components";

////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";

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
  _onPrimaryInputFocus(){

    this.setState({
      modalVisible: true
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
        onPress={() => this._onPrimaryInputFocus() }
        valid={this.props.valid}
        validationMessage={this.props.validationMessage}/>
        <View style={[styles.datePickerWrapper]} />
        <Modal 
        visible={this.state.modalVisible} 
        transparent={true}
        animationType={"slide"}>
        <View style={{ flex: 1, justifyContent:"flex-end"}}>

          <View style={{flexDirection: "row"}}>

            <View stye={{flex: 1, backgroundColor: 'blue'}}>
              <Text> Cancel </Text>
            </View>

            <View style={{ alignItems: "flex-end", backgroundColor: 'blue'}}>
              <Text> Done </Text>
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


     

export default ListPickerField;