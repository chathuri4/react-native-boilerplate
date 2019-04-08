import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import style from '../../styles'
import { Button, List, InputItem, WhiteSpace, Flex } from '@ant-design/react-native'
import { validEmail }  from '../../components/form/Validation'
import { t } from '../../locales/i18n';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';

class ResetPassForm extends React.Component {
  state = {
    loading: false,
    resetPassword: false,
    email: '',
    password: '',
    hasError: ''
  }


  render() {

    const { loading, resetPassword, email, password, hasError } = this.state

    return (
      <SafeAreaView style={style.container}>
        <Text style={style.page_header}>{t('Auth.Reset Password')}</Text>
        {hasError !== null && hasError !== '' &&
          <View style={{justifyContent: 'center'}}>
            <Text style={style.error}>{hasError}</Text>
            <WhiteSpace size="sm" />
          </View>
        }
        <WhiteSpace size="md" />
        <InputItem
          type='email'
          placeholder={t('Auth.Enter email address')}
          value={email}
          onChange={(text) => this.setState({email: text, hasError: ''})} />
        <WhiteSpace size="sm" />
        <InputItem
          type='password'
          placeholder={t('Auth.Enter password')}
          value={password}
          onChange={(text) => this.setState({password: text, hasError: ''})} />
        <WhiteSpace size="sm" />
        <WhiteSpace size="md" />
        <Button style={style.signin_button} onPress={(event) => this.onReset()}>{t('Auth.Reset')}</Button>
        <WhiteSpace size="lg" />
      </SafeAreaView>
    );
  }

  onReset = () => {
    const { firebase } = this.props
    const { email, password } = this.state

    var actionCodeSettings = {
      url: "https://rnreduxfirebasestarter.firebaseapp.com",
      iOS: {
        bundleId: 'com.RNReduxFirebaseStarter'
      },
      android: {
        packageName: 'com.RNReduxFirebaseStarter',
        installApp: true,
      },
      handleCodeInApp: true
    };


    if (email && email !== '' && password !== '') {
      firebase.resetPassword(email, password).then(result => {
        this.props.navigation.navigate('VerifyCode')
      }).catch(error => this.setState({hasError: error.message}))
    }else {
      this.setState({hasError: t('All fields are required')})
    }
  }
}

const enhancer = compose(
  withFirebase,
)

export default enhancer(ResetPassForm);
