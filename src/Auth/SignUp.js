import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import style from '../styles'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { validEmail }  from '../helpers/Validation'
// import { GoogleSignin } from 'react-native-google-signin'--> Add if using google sign in
import { Button, List, InputItem, WhiteSpace, Flex, Row, Col } from '@ant-design/react-native'
import { t } from '../locales/i18n';

class SignUp extends React.Component {
  state = {
    loading: false,
    signedUp: false,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirm_password: '',
    hasError: ''
  }

  render() {
    const { loading, firstname, lastname, email, password, confirm_password, hasError} = this.state

    return (
      <SafeAreaView style={style.container}>
        <Text style={style.page_header}>{t('Auth.Sign Up with {{appname}}', {appname: 'RN Boilerplate'})}</Text>
        <WhiteSpace size="sm" />
        {hasError !== null && hasError !== '' &&
          <View>
            <Text style={style.error}>{hasError}</Text>
            <WhiteSpace size="sm" />
          </View>
        }
          <InputItem
            placeholder={t('Auth.Enter first name')}
            style={{flex: 1, textAlign: 'center'}}
            value={firstname}
            onChange={(text) => this.setState({firstname: text, hasError: ''})} />
          <InputItem
            placeholder={t('Auth.Enter last name')}
            style={{flex: 1, textAlign: 'center'}}
            value={lastname}
            onChange={(text) => this.setState({lastname: text, hasError: ''})} />
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
        <WhiteSpace size="md" />
        <InputItem
          type='password'
          placeholder={t('Auth.Confirm password')}
          value={confirm_password}
          onChange={(text) => this.setState({confirm_password: text, hasError: ''})} />
        <WhiteSpace size="md" />
        <Button style={style.signin_button} onPress={() => this.onSignUp()}>{t('Auth.Sign Up')}</Button>
        <WhiteSpace size="lg" />
        <Text>OR</Text>
        {/*Add if using google sign in*/}
        {/*
          <WhiteSpace size="lg" />
        <Button style={style.signin_button} disabled={signinProgress} onPress={() => this.onLogin('google')}>Sign in with Google</Button>*/}
        <WhiteSpace size="lg" />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SigninStack')}>
          <Text>{t('Auth.Already have an account? Sign in')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  onSignUp = () => {

    const { firebase } = this.props
    const { firstname, lastname, email, password, confirm_password} = this.state

    if (firstname.isEmpty || lastname.isEmpty || email.isEmpty || password.isEmpty || confirm_password.isEmpty) {
      this.setState({hasError: 'All fields are required'})
      return
    }

    if (password !== confirm_password) {
      this.setState({hasError: 'Passwords do not match', password: '', confirm_password: ''})
      return
    }

    firebase.createUser({email, password, signIn: false}, {profile: {firstname, lastname, email}}).then(user => {
      console.log('user', user)
    }).catch(error => {
      this.setState({ loading: false, hasError: error.message})
    });


  }
}



const enhancer = compose(
  withFirebase,
  firestoreConnect(),
  // firebaseConnect(),
  // connect()
)

export default enhancer(SignUp);
