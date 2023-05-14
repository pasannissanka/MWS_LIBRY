import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ProfileScreen from '../../ProfileView/screens/ProfileScreen';
import DummyScreen from '../../ProfileView/screens/DummyScreen';

const DashboardScreen = (): React.JSX.Element => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="ProfileView"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        name="ProfileView"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <Image
                style={styles.leftTabIcon}
                resizeMode="stretch"
                source={require('../../../assets/images/bottom-tab-icons/conttent-icon/content-icon.png')}
              />

              <View
                style={
                  focused ? styles.tabIconActiveBar : styles.tabIconInactiveBar
                }
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="DummyOne"
        component={DummyScreen}
        options={{
          tabBarIcon: () => (
            <Image
              style={styles.middleTabIcon}
              resizeMode="stretch"
              source={require('../../../assets/images/bottom-tab-icons/add-icon/add-icon.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DummyTwo"
        component={DummyScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <Image
                style={styles.rightTabIcon}
                resizeMode="stretch"
                source={require('../../../assets/dummyImages/philhughes-profile/philhughes.png')}
              />
              <View
                style={
                  focused ? styles.tabIconActiveBar : styles.tabIconInactiveBar
                }
              />
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  tabBarStyle: {
    width: '100%',
    height: 68,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#222322',
    borderTopColor: 'transparent',
  },
  leftTabIcon: {
    width: 30,
    height: 30,
  },
  rightTabIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  middleTabIcon: {
    width: 60,
    height: 50,
    marginBottom: 4,
  },
  tabIconActiveBar: {
    width: 30,
    height: 2,
    borderRadius: 1,
    marginTop: 4,
    backgroundColor: '#06D30F',
  },
  tabIconInactiveBar: {
    width: 30,
    height: 2,
    borderRadius: 1,
    marginTop: 4,
    backgroundColor: 'transparent',
  },
});
