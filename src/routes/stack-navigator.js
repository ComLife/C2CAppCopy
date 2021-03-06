import {NavigationRouteConfigMap, createStackNavigator} from 'react-navigation';
import TabHome from './bottom-navigator';
import LoginScreen from '../views/login-register/login';
import RegisterScreen from '../views/login-register/register';
import Internationalization from '../views/login-register/Internationalization';
import ForgotPasswordScreen from '../views/login-register/forget-password';

export default createStackNavigator(
  {
    TabHome: {screen: TabHome, navigationOptions: {header: null}},
    Login: {screen: LoginScreen, navigationOptions: {header: null}},
    Register: {screen: RegisterScreen, navigationOptions: {header: null}},
    Internationalization: {
      screen: Internationalization,
      navigationOptions: {header: null},
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      navigationOptions: {header: null},
    },
  },
  {
    initialRouteName: 'TabHome',
  },
);
