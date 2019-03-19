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
import AppNavigator from '../src/navigation/AppNavigator'
import { Provider } from 'react-redux'
import configureStore from './store';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class App extends Component<Props> {
  state = {
    rehydrated: false
  }

  store = null

  componentWillMount() {
    this.store = configureStore(() => {this.setState({rehydrated: true})})
  }



  render() {
    return(
      <Provider store={this.store}>
        <AppNavigator />
      </Provider>
    )
  }
}


export default App
