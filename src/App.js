/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, ActivityIndicator} from 'react-native';
import Router from '../src/navigation/Router'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import configureStore from './store';
import RNFirebase from 'react-native-firebase';
import { reduxFirebaseConfig } from './firebase/config'

const store = configureStore()
const firebase = RNFirebase.app()

const rrfProps = {
  firebase,
  config: reduxFirebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  initializeAuth: true,
}

class App extends Component<Props> {

  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router />
        </ReactReduxFirebaseProvider>
      </Provider>
    )
  }
}

export default App
