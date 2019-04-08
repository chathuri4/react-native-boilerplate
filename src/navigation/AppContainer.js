import React  from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import AuthStack from './AuthStack';

export default AppContainer = (props) => {
  const {signedIn} = props
  console.log('props', props)
  const AppLayout = createAppContainer(createSwitchNavigator(
  {
    Auth: AuthStack,
    Main: MainTabNavigator,
  }, {
    initialRouteName: signedIn ? 'Main' : 'Auth'
  }
  ));

  return <AppLayout />
}
