import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../features/ProfileView/screens/ProfileScreen';
import DummyScreen from '../features/ProfileView/screens/DummyScreen';
import DashboardScreen from '../features/Dashboard/screens/DashboardScreen';

const Stack = createStackNavigator();

const NavigationStack = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="DashboardScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="DummyScreen" component={DummyScreen} />
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
    </Stack.Navigator>
  );
};

export default NavigationStack;
