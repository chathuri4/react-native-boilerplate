import { createStackNavigator } from 'react-navigation';
import SignIn from '../Auth/Login/SignIn'
import ForgotPassword from '../Auth/Login/ForgotPassword'

export default createStackNavigator(
  {
    SignIn: SignIn,
    ForgotPassword: ForgotPassword
}, {
  initialRouteName: 'SignIn',
  defaultNavigationOptions: {
    header: null,
  },
}
)
