import { createStackNavigator } from 'react-navigation';
import LoginStack from '../Auth/Login/SignIn'
import SignupStack from '../Auth/SignUp'

export default createStackNavigator(
  {
    LoginStack: LoginStack,
    SignupStack: SignupStack
  },
  {
    initialRouteName: 'LoginStack',
    defaultNavigationOptions:
    {
      header: null,
    }
  }
)
