import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import ProfileScreen from '../../ProfileView/screens/ProfileScreen';
import DummyScreen from '../../ProfileView/screens/DummyScreen';
import { View } from 'react-native/types';

const DashboardScreen = (): React.JSX.Element => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="ProfileView"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: 'pink', height: 56},
      }}>
      <Tab.Screen
        name="ProfileView"
        component={ProfileScreen}
        options={{
          tabBarIconStyle: {backgroundColor: 'green', width: 30, height: 30, marginBottom: 10}
          //tabBarIcon: {size: 30}
        }}
      />
      <Tab.Screen name="DummyOne" component={DummyScreen} />
      <Tab.Screen name="DummyTwo" component={DummyScreen} />
    </Tab.Navigator>
  );
};

export default DashboardScreen;
