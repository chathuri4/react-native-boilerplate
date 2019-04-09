import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import style from '../styles'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { validEmail }  from '../components/form/Validation'
import { Button, List, InputItem, WhiteSpace, Flex } from '@ant-design/react-native'
import { t } from '../locales/i18n';


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

    return (
      <SafeAreaView style={style.container}>
        <Text style={style.page_header}>{t('Auth.Sign in to access {{appName}}', {appName: 'RN Boilerplate'})}</Text>
        {hasError !== null && hasError !== '' &&
          <View style={{justifyContent: 'center'}}>
            <Text style={style.error}>{hasError}</Text>
            <WhiteSpace size="sm" />
          </View>
        }
        <WhiteSpace size="sm" />
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
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassStack')}>
          <Text>{t('Auth.Forgot Password')}</Text>
        </TouchableOpacity>
        <WhiteSpace size="md" />
        <Button style={style.signin_button} onPress={(event) => this.onLogin('email', event)}>{t('Auth.Sign In')}</Button>
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

  onLogin = (provider, event) => {
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
        if (email && !validEmail(email)) {
          this.setState({signinProgress: false, hasError: t('Please enter a valid email')})
        }else if (email && email !== '' && password && password !== '') {
          firebase.login({email, password}).then((result) => {
            console.log('firebase signin', result)
            this.props.navigation.navigate('Main')

            // this.setState({signinProgress: false, signedIn: true}, () => {
            //   this.props.navigation.navigate('Main')
            // })
          })
          .catch(error => {
            console.log('error', error)
            this.setState({signinProgress: false, signedIn: false, hasError: error.message})
          })
        }else {
          this.setState({signinProgress: false, hasError: t('All fields are required')})
        }
        break;
      }

    }
  }
}

const enhancer = compose(
  withFirebase,
  firestoreConnect(),
)

export default enhancer(SignIn);
