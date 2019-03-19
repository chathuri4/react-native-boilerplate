import React from 'react';
import { View, SafeAreaView, Text } from 'react-native'
import style from '../../styles'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase'
import { validEmail }  from '../../helpers/Validation'
// import { GoogleSignin } from 'react-native-google-signin'--> Add if using google sign in
import { Button, List, InputItem, WhiteSpace, Flex } from '@ant-design/react-native'

// GoogleSignin.configure();--> Add if using google sign in
const ListItem = List.Item;

class SignIn extends React.Component {
  state = {
    signinProgress: false,
    signedIn: false,
    email: '',
    password: '',
    hasError: ''
  }



  render() {
    console.log('in Sign in')
    const { signinProgress, email, password, hasError} = this.state


    return (
      <SafeAreaView style={style.container}>
        <Text style={style.page_header}>Sign in to access AppName</Text>
        <WhiteSpace size="sm" />
        {hasError !== null && hasError !== '' &&
          <View>
            <Text style={style.error}>{hasError}</Text>
            <WhiteSpace size="sm" />
          </View>
        }
        <InputItem
          type='email'
          placeholder={'Enter email address'}
          style={{textAlign: 'center'}}
          value={email}
          onChange={(text) => this.setState({email: text, hasError: ''})} />
        <WhiteSpace size="sm" />
        <InputItem
          type='password'
          placeholder={'Enter password'}
          value={password}
          onChange={(text) => this.setState({password: text, hasError: ''})} />
        <WhiteSpace size="sm" />
        <Text>Forgot Password</Text>
        <WhiteSpace size="md" />
        <Button style={style.signin_button} onPress={() => this.onLogin('email')}>Sign in</Button>
        <WhiteSpace size="lg" />
        <Text>OR</Text>
        {/*Add if using google sign in*/}
        {/*
          <WhiteSpace size="lg" />
        <Button style={style.signin_button} disabled={signinProgress} onPress={() => this.onLogin('google')}>Sign in with Google</Button>*/}
        <WhiteSpace size="lg" />
        <Text>Do not have an account? Sign Up</Text>
      </SafeAreaView>
    );
  }

  onLogin(provider) {
    const { firestore, firebase } = this.props
    const { email, password } = this.state

    this.setState({signinProgress: true, hasError: ''})
    switch(provider) {
      //Add if using Google sign in
      // case 'google': {
      //   GoogleSignin.signIn().then(result => {
      //     console.log('result', result)
      //     // return result
      //     const { idToken, accessToken } = result
      //     const credential = firebase.auth.GoogleAuthProvider.credential(idToken)
      //     return firebase.login({credential:credential}).then(result => {
      //       console.log('firebase signin', result)
      //       this.setState({signinProgress: false, signedIn: true}, () => {
      //         this.props.navigation.navigate('Main')
      //       })
      //     }).catch(error => console.log('firebase signin error', error.message))
      //   })
      //   .catch(error => {
      //     this.setState({signinProgress: false, hasError: error.message})
      //   })
      //   break;
      // }
      case 'email': {
        if (email && email !== '' && password && password !== '') {
          firebase.login({email, password}).then(result => {
            console.log('firebase signin', result)
            this.setState({signinProgress: false, signedIn: true}, () => {
              this.props.navigation.navigate('Main')
            })
          })
          .catch(error => {
            this.setState({signinProgress: false, hasError: error.message})
          })
        }else if (validEmail(email)) {
          this.setState({signinProgress: false, hasError: 'Please enter a valid email'})
        }else {
          this.setState({signinProgress: false, hasError: 'Please enter email and password'})
        }

      }

    }
  }
}

const enhancer = compose(
  firestoreConnect(),
  firebaseConnect(),
  connect()
)

export default enhancer(SignIn);
