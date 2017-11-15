import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//Thunk import
import thunk from 'redux-thunk';
// Reducer import
import ALL_REDUCERS from './app/config/store';
// Redux Imports
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
// Import React Navigation Component
import AppNavigatorContainer from './app/navigation/AppNavigatorContainer';
// Load object extensions
require('./app/extensions/strings')
// Import networkEvents 
import Services, { NETWORK_EVENT_TYPES } from "./app/services/api";
// Import account actions 
import { accountLogout } from './app/actions/account-actions';

// Create the store
const store = createStore(ALL_REDUCERS, applyMiddleware(thunk));

export default class App extends React.Component {

  componentWillMount(){

  	// Listen for network 401 unauthorized user event,
  	// the logic will transition to the login screen.
  	Services.on(NETWORK_EVENT_TYPES.NETWORK_EVENT_401, function(data){
  		// Perform the appropriate unauthorized logic
  		store.dispatch(accountLogout());
  	})

  } 

  render() {
    return (
      <Provider store={store}>
        <AppNavigatorContainer />
      </Provider>
    );
  }
}
