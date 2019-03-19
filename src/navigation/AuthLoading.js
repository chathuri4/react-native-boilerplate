import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import styles from '../styles'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { isLoaded, isEmpty, firebaseConnect } from 'react-redux-firebase'

class AuthLoading extends React.Component {

  componentDidUpdate(prevProps) {
    const { auth } = this.props

    console.log(auth, prevProps.auth)

    if (prevProps.auth !== auth) {
      if (isLoaded(auth)) {
        if (isEmpty(auth)) {
          this.props.navigation.navigate('Login')
        }else {
          this.props.navigation.navigate('Main')
        }
      }
    }
  }

  render() {
    console.log('in loading', this.props.auth)
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const enhancer = compose(
  firebaseConnect(),
  connect((state) => ({
    auth: state.firebase.auth
  })
));

export default enhancer(AuthLoading)
