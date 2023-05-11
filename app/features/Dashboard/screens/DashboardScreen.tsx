import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import ProfileScreen from '../../ProfileView/screens/ProfileScreen';
import DummyScreen from '../../ProfileView/screens/DummyScreen';

const DashboardScreen = (): React.JSX.Element => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="ProfileView"
      screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen name="DummyLeft" component={DummyScreen} />
      <Tab.Screen name="ProfileView" component={ProfileScreen} />
      <Tab.Screen name="DummyRight" component={DummyScreen} />
    </Tab.Navigator>
  );
};

export default DashboardScreen;
