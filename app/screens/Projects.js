import React, { Component } from 'react';
import {bindActionCreators, connect} from 'react-redux';
import ActivityIndicatorOverlay from './../components/ActivityIndicatorOverlay';
import MapView from 'react-native-maps';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

const { width, height } = Dimensions.get("window");



class Projects extends Component {
  componentDidMount(){
    console.log(this.props);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

});


const mapStateToProps = (state) => {
  return {
    isFetching: state.session.isFetching,
    isErrored: state.session.isErrored
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    sessionLogin: (email, password) => dispatch(sessionLogin(email, password))
  };
}



export default connect(mapStateToProps, mapDistpatchToProps)(Projects);
