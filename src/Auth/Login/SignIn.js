import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import style from '../../styles'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { validEmail }  from '../../helpers/Validation'
// import { GoogleSignin } from 'react-native-google-signin'--> Add if using google sign in
import { Button, List, InputItem, WhiteSpace, Flex } from '@ant-design/react-native'
import { t } from '../../locales/i18n';


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
    const { signinProgress, email, password, hasError} = this.state
    const { authError } = this.props
    console.log('props', this.props)
    return (
      <SafeAreaView style={style.container}>
        <Text style={style.page_header}>{t('Auth.Sign in to access {{appName}}', {appName: 'RN Boilerplate'})}</Text>
        <WhiteSpace size="sm" />
        {hasError !== null && hasError !== '' &&
          <View>
            <Text style={style.error}>{hasError}</Text>
            <WhiteSpace size="sm" />
          </View>
        }
        <InputItem
          type='email'
          placeholder={t('Auth.Enter email address')}
          style={{textAlign: 'center'}}
          value={email}
          onChange={(text) => this.setState({email: text, hasError: ''})} />
        <WhiteSpace size="sm" />
        <InputItem
          type='password'
          placeholder={t('Auth.Enter password')}
          value={password}
          onChange={(text) => this.setState({password: text, hasError: ''})} />
        <WhiteSpace size="sm" />
        <Text>{t('Auth.Forgot Password')}</Text>
        <WhiteSpace size="md" />
        <Button style={style.signin_button} onPress={() => this.onLogin('email')}>{t('Auth.Sign In')}</Button>
        <WhiteSpace size="lg" />
        <Text>OR</Text>
        {/*Add if using google sign in*/}
        {/*
          <WhiteSpace size="lg" />
        <Button style={style.signin_button} disabled={signinProgress} onPress={() => this.onLogin('google')}>Sign in with Google</Button>*/}
        <WhiteSpace size="lg" />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignupStack')}>
          <Text>{t('Auth.Do not have an account? Sign Up')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  onLogin = (provider) => {
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
        console.log('before sign in')
        if (email && email !== '' && password && password !== '') {

          firebase.login({email, password}).then((result) => {
            console.log('firebase signin', result, error)
            this.setState({signinProgress: false, signedIn: true}, () => {
              this.props.navigation.navigate('Main')
            })
          })
          .catch(error => {
            console.log('error', error)
            this.setState({signinProgress: false, signedIn: false, hasError: error.message})
          })
        }else if (validEmail(email)) {
          this.setState({signinProgress: false, hasError: 'Please enter a valid email'})
        }else {
          this.setState({signinProgress: false, hasError: 'Please enter email and password'})
        }
        break;
      }

    }
  }
}

const enhancer = compose(
  withFirebase,
  firestoreConnect(),
  // firebaseConnect(),
  // connect()
)

export default enhancer(SignIn);
