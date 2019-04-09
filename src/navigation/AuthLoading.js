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
    const { auth: {isLoaded, isEmpty} } = this.props
    console.log('component did update', this.props)
    console.log(this.props, prevProps.auth)

    if (prevProps.auth !== this.props.auth) {
      if (isLoaded) {
        if (isEmpty) {
          this.props.navigation.navigate('Auth')
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
  connect((state) => ({
    auth: state.firebase.auth
  }))
);

export default enhancer(AuthLoading)
