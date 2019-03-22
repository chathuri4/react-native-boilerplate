import React,{Component}  from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import AppContainer from './AppContainer'
import styles from '../styles'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { isLoaded, isEmpty, firebaseConnect } from 'react-redux-firebase'



// const createAppNavigator = (signedIn = false) => {
//   return createAppContainer(createSwitchNavigator(
//   {
//     Auth: AuthStack,
//     Main: MainTabNavigator,
//   }, {
//     initialRouteName: signedIn ? 'Main' : 'Auth'
//   }
//   ));
// }

class Router extends Component {

  state = {
    loading: true,
    signedIn: false,
  }

//Written to handle component update, only when isLoaded and isEmpty parameters changes.
//Else on each firebase.login() (even if failed) the component will re-render
  shouldComponentUpdate(nextProps) {
    const { auth: {isLoaded, isEmpty} } = nextProps

    return isLoaded !== this.props.auth.isLoaded ? true : isLoaded && isEmpty !== this.props.auth.isEmpty
  }


  render() {

    console.log('render')
    const { auth: {isLoaded, isEmpty}} = this.props

    if (isLoaded) {
      return <AppContainer signedIn={!isEmpty}/>
    }

    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )

  }
}

const enhancer = compose(
  connect((state) => ({
    auth: state.firebase.auth
  }))
);

export default enhancer(Router)
