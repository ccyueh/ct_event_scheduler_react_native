import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import EventsList from '../screens/EventsList.js';
import GetEvent from '../screens/GetEvent.js';
import SaveEvent from '../screens/SaveEvent.js';
import TabBarIcon from '../components/TabBarIcon';

// create the stack navigators before tab navigator
const ShowEventStack = createStackNavigator(
  {
    GetEvent: GetEvent,
    EventsList: EventsList,
  }
);

ShowEventStack.navigationOptions = {
  tabBarLabel: 'Get Events',
  tabBarIcon: TabBarIcon('today')
};

// create bottom tab navigator
export default createBottomTabNavigator(
  {
    SaveEvent,
    ShowEventStack
  },
  {
    tabBarOptions: {
      // label and icon color of the active tab
      activeTintColor: 'red',
      // background color of the active tab
      //activeBackgroundColor: 'lightgray',
      // label and icon color of the inactive tab
      //inactiveTintColor: 'blue',
      // background color of the inactive tab
      //inactiveBackgroundColor: 'black',
      // style object for the tab bar
      style: { borderTopWidth: 2, borderTopColor: 'red' },
      // style object for tab label
      labelStyle: { fontWeight: 'bold' },
      // style object for tab
      //tabStyle: { paddingBottom: 20 },
      // whether to show label for tab, default is true
      showLabel: false,
      // whether to show icon for tab, default is true
      //showIcon: false,
    }
  }
)
