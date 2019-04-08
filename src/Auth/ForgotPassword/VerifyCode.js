import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import style from '../../styles'
import { Button, List, InputItem, WhiteSpace, Flex } from '@ant-design/react-native'
import { validEmail }  from '../../components/form/Validation'
import { t } from '../../locales/i18n';

class VerifyCode extends React.Component {
  state = {
    loading: false,
    resetPassword: false,
    email: '',
    hasError: ''
  }


  render() {

    const { hasError, email } = this.state

    return (
      <SafeAreaView style={style.container}>
        <Text style={style.page_header}>{t('Auth.Reset Password')}</Text>
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
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
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
}

export default VerifyCode;
