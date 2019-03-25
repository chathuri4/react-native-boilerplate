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


store = configureStore(() => console.log('store is ready'));
firebase = RNFirebase.app()

rrfProps = {
  firebase,
  config: reduxFirebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  initializeAuth: true,
}

class App extends Component<Props> {

  state = {
    onStore: false,
    onAuthReady: false
  }


  render() {
    const { onStoreReady } = this.state

    console.log('onstoreready', onStoreReady)

    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router />
        </ReactReduxFirebaseProvider>
      </Provider>
    )
    
    if (onStoreReady) {
      return (
        <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <Router />
          </ReactReduxFirebaseProvider>
        </Provider>
      )
    }

    return (
      <View style={{flex: 1}}><ActivityIndicator /></View>
    )
  }
}

export default App
