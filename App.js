import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {signUp, login, logout} from './app/services/api/session';
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

// Create the store
const store = createStore(ALL_REDUCERS, applyMiddleware(thunk));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigatorContainer />
      </Provider>
    );
  }
}
