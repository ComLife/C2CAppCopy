import {
  NavigationRouteConfigMap,
  createStackNavigator
} from "react-navigation";
import TabHome from "./bottom-navigator";

export default createStackNavigator(
  {
    TabHome: { screen: TabHome, navigationOptions: { header: null } }
  },
  {
    initialRouteName: "TabHome"
  }
);
