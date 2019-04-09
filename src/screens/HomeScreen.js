import React from 'react'
import {
  Button,
  Text,
  View
} from 'react-native'
import style from '../styles'
import { compose } from 'redux';
import { MonoText } from '../components/StyledText'
// import TodosList from '../components/TodosList'
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  }

  render() {
    return (
      <View style={style.container}>
        <Text>Home</Text>
        <Button onPress={() => this.onLogout()} title={'Logout'}></Button>
      </View>
    )
  }

  onLogout = () => {
    this.props.firebase.logout().then(result => {
      console.log('logged out')
      this.props.navigation.navigate('Auth')
    })
  }
}

const enhancer = compose(
  firebaseConnect()
)
export default enhancer(HomeScreen)
