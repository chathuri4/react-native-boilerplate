import React from 'react';
import { View, Text } from 'react-native'
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginStack from './LoginStack';
import SignupStack from './SignupStack';
import AuthLoading from './AuthLoading'

export default createAppContainer(createSwitchNavigator(
  {
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Loading: AuthLoading,
  Login: LoginStack,
  SignUp: SignupStack,
  Main: MainTabNavigator,
}, {
  initialRouteName: 'Loading',

}
));
