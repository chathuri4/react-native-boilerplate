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
        <Text style={style.page_header}>{t('Auth.Sign Up with {{appname}}', {appName: 'RN Boilerplate'})}</Text>
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
        <WhiteSpace size="sm" />
        <Text>{t('Auth.Forgot Password')}</Text>
        <WhiteSpace size="md" />
        <Button style={style.signin_button} onPress={() => this.onLogin('email')}>Sign in</Button>
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
}

export default SignUp;
