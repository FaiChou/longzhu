import React from 'react';
import { Image } from 'react-native';
import Home from './Home';
import Setting from './Setting';
import Play from './Play';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

global.selectedParse = {
  id: 1,
  name: '万能接口5',
  url: 'http://jx.vgoodapi.com/jx.php?url=',
};



const Tab =  createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: '龙珠超',
        activeTintColor: '#1296db',
        tabBarIcon: ({ focused }) =>
          <Image
            resizeMode="contain"
            style={{ width: 18, height: 18 }}
            source={focused ?
              require('./imgs/home-selected.png') :
              require('./imgs/home-unselected.png')}
          />,
      },
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        title: '解析',
        activeTintColor: '#1296db',
        tabBarIcon: ({ focused }) =>
          <Image
            resizeMode="contain"
            style={{ width: 18, height: 18 }}
            source={focused ?
              require('./imgs/setting-selected.png') :
              require('./imgs/setting-unselected.png')}
          />,
      },
    },
  }
);

export default createStackNavigator(
  {
    Tab: {
      screen: Tab,
      navigationOptions: {
        header: null,
      }
    },
    Play: Play,
  },
  {
    initialRouteName: 'Tab',
  }
);
