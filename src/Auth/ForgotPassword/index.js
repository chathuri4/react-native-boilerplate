import { createStackNavigator } from 'react-navigation';
import ResetPassForm from './ResetPassForm'
import VerifyCode from './VerifyCode'

export default createStackNavigator(
  {
    ResetPassForm: ResetPassForm,
    VerifyCode: VerifyCode,
  },
  {
    initialRouteName: 'ResetPassForm',
    defaultNavigationOptions:
    {
      header: null,
    }
  }
)
