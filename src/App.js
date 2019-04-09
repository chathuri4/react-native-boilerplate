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
import { PersistGate } from 'redux-persist/es/integration/react';
import styles from './styles'


const { persistor, store } = configureStore((onAuthReady) => this.setState({authReady: true}));
firebase = RNFirebase.app()

rrfProps = {
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
          <PersistGate
            loading={<ActivityIndicator />}
            persistor={persistor}>
            <ReactReduxFirebaseProvider {...rrfProps}>
              <Router />
            </ReactReduxFirebaseProvider>
          </PersistGate>
        </Provider>
      )

  }
}

export default App
