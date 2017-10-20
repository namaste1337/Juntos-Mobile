import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

class LandingView extends Component {
	 static navigationOptions = {
    	title: 'Welcome',
  	}
     render(){
          return (
               <Button
                    onPress={() => this.props.navigation.navigate('Login', {name: 'Landing'})}
                    title="Go to Login"/>
               );
          }
};

export default LandingView;