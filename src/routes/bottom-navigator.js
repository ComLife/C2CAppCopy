import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import Images from '../configs/images';
import HomeScreen from '../views/home';
import MarketScreen from '../views/home';
import TransationScreen from '../views/transition';
import AssetsScreen from '../views/assets';

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: '首页',
        tabBarIcon: ({focused}) => {
          const source = focused ? Images.tab1_selected : Images.tab1;
          return <Image source={source} />;
        },
      },
    },
    Market: {
      screen: MarketScreen,
      navigationOptions: {
        tabBarLabel: '详情',
        tabBarIcon: ({focused}) => {
          const source = focused ? Images.tab2_selected : Images.tab2;
          return <Image source={source} />;
        },
      },
    },
    Transation: {
      screen: TransationScreen,
      navigationOptions: {
        tabBarLabel: '交易',
        tabBarIcon: ({focused}) => {
          const source = focused ? Images.tab3_selected : Images.tab3;
          return <Image source={source} />;
        },
      },
    },
    Assets: {
      screen: AssetsScreen,
      navigationOptions: {
        tabBarLabel: '资产',
        tabBarIcon: ({focused}) => {
          const source = focused ? Images.tab4_selected : Images.tab4;
          return <Image source={source} />;
        },
      },
    },
  },
  {
    initialRouteName: 'Home',
    lazy: true,
  },
);
