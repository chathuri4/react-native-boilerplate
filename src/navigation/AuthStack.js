import { createStackNavigator } from 'react-navigation';
import SignIn from '../Auth/SignIn'
import SignUp from '../Auth/SignUp'
import ForgotPassStack from '../Auth/ForgotPassword/'

export default createStackNavigator(
  {
    LoginStack: SignIn,
    SignupStack: SignUp,
    ForgotPassStack: ForgotPassStack
  },
  {
    initialRouteName: 'LoginStack',
    defaultNavigationOptions:
    {
      header: null,
    }
  }
)
