import React  from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import AuthStack from './AuthStack';
import AuthLoading from './AuthLoading'


export default createAppContainer(createSwitchNavigator(
{
  Loading: AuthLoading,
  Auth: AuthStack,
  Main: MainTabNavigator,
}, {
  initialRouteName: 'Loading'
}
));
//
// export default AppContainer = (props) => {
//   const {signedIn} = props
//   // if (signedIn) {
//   //   this.props.navigation.navigate('Main')
//   // }else {
//   //   this.props.navigation.navigate('Auth')
//   // }
//   return <AppLayout />
// }
