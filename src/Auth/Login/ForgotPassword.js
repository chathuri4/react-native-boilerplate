import React from 'react';
import { View, Button } from 'react-native'

class ForgotPassword extends React.Component {
  static navigationOptions = {
    title: 'Forgot Password',
  };

  render() {
    return (
      <View>
        <Button title="ForgotPassword!" />
      </View>
    );
  }
}

export default ForgotPassword;
