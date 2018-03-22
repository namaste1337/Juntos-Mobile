///////////////////////////
// Imports
///////////////////////////

import React from 'react';
import {connect, Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { BackHandler } from "react-native";
import { addNavigationHelpers, NavigationActions } from "react-navigation";

///////////////////////////
// Navigation
///////////////////////////

import AppNavigatorContainer from './app/navigation/AppNavigatorContainer';

///////////////////////////
// Redux Middleware
///////////////////////////

import thunk from 'redux-thunk';
import logger from 'redux-logger'

///////////////////////////
// Reducer Setup
///////////////////////////

import ALL_REDUCERS from './app/config/store';
const store = createStore(ALL_REDUCERS, applyMiddleware(thunk), applyMiddleware(logger));

///////////////////////////
// Actions
///////////////////////////

import { accountLogout } from './app/actions/account-actions';

///////////////////////////
// Extensions
///////////////////////////

require('./app/extensions/strings');

///////////////////////////
// Services
///////////////////////////

import Services, { NETWORK_EVENT_TYPES } from "./app/services/api";


///////////////////////////
// Constants
///////////////////////////

// Events
const HARDWARE_BACK_PRESS_EVENT = "hardwareBackPress";
// Bools
const ON_BACK_PRESS_FALSE_BOOL  = false;
const ON_BACK_PRESS_TRUE_BOOL   = true;

export default class App extends React.Component {

  ////////////////////////
  // Life Cycle
  ////////////////////////

  // Handles Android back button press
  onBackPress = () => {

    const state = store.getState();
    const nav   = state.nav;

    if (nav.index === 0) {
      return ON_BACK_PRESS_FALSE_BOOL;
    }

    store.dispatch(NavigationActions.back());
    return ON_BACK_PRESS_TRUE_BOOL;

  };

  ////////////////////////
  // Life Cycle
  ////////////////////////

  componentWillUnmount() {

    // Remove the Android back button listener
    BackHandler.removeEventListener(HARDWARE_BACK_PRESS_EVENT, this.onBackPress);
    
  } 

  componentWillMount(){

  	// Listen for network 401 unauthorized user event,
  	// the logic will transition to the login screen.
  	Services.on(NETWORK_EVENT_TYPES.NETWORK_EVENT_401, function(data){
  		// Perform the appropriate unauthorized logic
  		store.dispatch(accountLogout());
  	})

    // Listen for the Android back button
    BackHandler.addEventListener(HARDWARE_BACK_PRESS_EVENT, this.onBackPress);

  }

  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {

    return (
      <Provider store={store}>
        <AppNavigatorContainer />
      </Provider>
    );
  }

}
