///////////////////////////
// Imports
///////////////////////////

import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

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
