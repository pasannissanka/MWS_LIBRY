import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationTabsProps} from '../features/Dashboard/interfaces/DashboardInterface';
import {Image, StyleSheet, View} from 'react-native';
import {Colors, Images} from '../theme';
import HomeViewer from '../features/Dashboard/views/HomeViewer';
import DummyScreen from '../features/ProfileView/screens/DummyScreen';
import ProfileScreen from '../features/ProfileView/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const NavigationTabs = ({
  InitialViewer,
  onChangeScreen,
}: NavigationTabsProps): React.JSX.Element => {
  return (
    <Tab.Navigator
      screenListeners={{
        state: (e: any) => {
          onChangeScreen(e);
        },
      }}
      initialRouteName={InitialViewer}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        name="HomeViewer"
        component={HomeViewer}
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
                  focused ? styles.tabIconActiveBar : styles.tabIconInactiveBar
                }
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="none"
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
        name="ProfileViewer"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <Image
                style={styles.rightTabIcon}
                resizeMode="stretch"
                source={Images.image.opening_placeholder}
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

export default NavigationTabs;

const styles = StyleSheet.create({
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
