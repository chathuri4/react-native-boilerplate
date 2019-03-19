import React from 'react';
import { View, Button } from 'react-native'

class SignUp extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View>
        <Button title="Sign Up!" onPress={this._signUpAsync} />
      </View>
    );
  }

  _signUpAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

export default SignUp;
