import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../features/ProfileView/screens/ProfileScreen';
import DummyScreen from '../features/ProfileView/screens/DummyScreen';
import DashboardScreen from '../features/Dashboard/screens/DashboardScreen';
import OpeningScreen from '../features/AppAccess/screens/OpeningScreen';
import LoginScreen from '../features/AppAccess/screens/LoginScreen';
import SendResetPasswordScreen from '../features/AppAccess/screens/SendResetPasswordScreen';
import ChangePasswordScreen from '../features/AppAccess/screens/ChangePasswordScreen';
import EnterMobileNumberScreen from '../features/AppAccess/screens/EnterMobileNumberScreen';
import EnterOTPScreen from '../features/AppAccess/screens/EnterOTPScreen';
import EnterEmailScreen from '../features/AppAccess/screens/EnterEmailScreen';
import EnterPasswordScreen from '../features/AppAccess/screens/EnterPasswordScreen';
import EnterNameScreen from '../features/AppAccess/screens/EnterNameScreen';
import EnterBirthdayScreen from '../features/AppAccess/screens/EnterBirthdayScreen';
import AddYourLibryScreen from '../features/AppAccess/screens/AddYourLibryScreen';
import WelcomeLibryScreen from '../features/AppAccess/screens/WelcomeLibryScreen';

const Stack = createStackNavigator();

const NavigationStack = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="OpeningScreen"
      //initialRouteName="WelcomeLibryScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="DummyScreen" component={DummyScreen} />
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
      <Stack.Screen name="OpeningScreen" component={OpeningScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="SendResetPasswordScreen"
        component={SendResetPasswordScreen}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name="EnterMobileNumberScreen"
        component={EnterMobileNumberScreen}
      />
      <Stack.Screen name="EnterOTPScreen" component={EnterOTPScreen} />
      <Stack.Screen name="EnterEmailScreen" component={EnterEmailScreen} />
      <Stack.Screen
        name="EnterPasswordScreen"
        component={EnterPasswordScreen}
      />
      <Stack.Screen name="EnterNameScreen" component={EnterNameScreen} />
      <Stack.Screen
        name="EnterBirthdayScreen"
        component={EnterBirthdayScreen}
      />
      <Stack.Screen name="AddYourLibryScreen" component={AddYourLibryScreen} />
      <Stack.Screen name="WelcomeLibryScreen" component={WelcomeLibryScreen} />
    </Stack.Navigator>
  );
};

export default NavigationStack;
