import { createStackNavigator } from 'react-navigation';
import SignUp from '../Auth/SignUp'

export default createStackNavigator(
  {
    SignUp: SignUp,
}, {
  initialRouteName: 'SignUp'
}
)
