import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ProfileScreen from '../../ProfileView/screens/ProfileScreen';
import DummyScreen from '../../ProfileView/screens/DummyScreen';
import {Colors, Images} from '../../../theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Header from '../../../components/header/Header';

const DashboardScreen = (): React.JSX.Element => {
  type TabNavigatorParams = {
    ProfileView: undefined;
    DummyOne: undefined;
  };
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation() as NavigationProp<TabNavigatorParams>;

  const onPressBack = () => {
    navigation.navigate('DummyOne');
  };

  const [currentView, setCurrentView] = useState(0);
  const [searchText, onChangeSearchText] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={16}
      style={styles.parentView}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.SCREEN_PRIMARY_BACKGROUND_COLOR}
        barStyle={'default'}
      />
      <View style={styles.headerContainer}>
        <Header
          searchBar={true}
          onPressBack={onPressBack}
          searchBarImageUri="https://reactnative.dev/img/tiny_logo.png"
          searchBarRightIcon={currentView === 2 ? 'hamburger' : 'meatballs'}
          onChangeSearchBarText={onChangeSearchText}
          searchBarValue={searchText}
        />
      </View>

      <Tab.Navigator
        screenListeners={{
          state: (e: any) => {
            setCurrentView(e.data.state.index);
          },
        }}
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
                  source={Images.icons.bottom_tab_icon.conttent_icon}
                />

                <View
                  style={
                    focused
                      ? styles.tabIconActiveBar
                      : styles.tabIconInactiveBar
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
                source={Images.icons.bottom_tab_icon.add_icon}
              />
            ),
          }}
        />
        <Tab.Screen
          name="DummyTwo"
          component={ProfileScreen}
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
                    focused
                      ? styles.tabIconActiveBar
                      : styles.tabIconInactiveBar
                  }
                />
              </>
            ),
          }}
        />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: 28,
    paddingTop: 10,
    paddingBottom: 28,
  },
  tabBarStyle: {
    width: '100%',
    height: 68,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
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
    backgroundColor: Colors.ACTIVE_GREEN_COLOR,
  },
  tabIconInactiveBar: {
    width: 30,
    height: 2,
    borderRadius: 1,
    marginTop: 4,
    backgroundColor: 'transparent',
  },
});
