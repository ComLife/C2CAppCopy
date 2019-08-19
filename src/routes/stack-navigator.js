import {
  NavigationRouteConfigMap,
  createStackNavigator
} from "react-navigation";
import TabHome from "./bottom-navigator";
import LoginScreen from "../views/login-register/login";

export default createStackNavigator(
  {
    TabHome: { screen: TabHome, navigationOptions: { header: null } },
    Login: { screen: LoginScreen, navigationOptions: { header: null } }
  },
  {
    initialRouteName: "TabHome"
  }
);
