import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {MutableRefObject, RefObject, useRef, useState} from 'react';
import ProfileScreen from '../../ProfileView/screens/ProfileScreen';
import DummyScreen from '../../ProfileView/screens/DummyScreen';
import {Colors, Images} from '../../../theme';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Header from '../../../components/header/Header';
import InfoBottomSheet from '../components/InfoBottomSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import SearchViewer from '../views/SearchViewer';
import {HeaderSearchBarRightIcon} from '../../../components/Interfaces';
import * as Animatable from 'react-native-animatable';

const DashboardScreen = (): React.JSX.Element => {
  type TabNavigatorParams = {
    ProfileView: undefined;
    DummyOne: undefined;
  };

  type ProfileTypes = 'someone' | 'user' | 'none';
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation() as NavigationProp<TabNavigatorParams>;
  const infoBottomSheetRef: RefObject<RBSheet> = useRef<RBSheet>(null);
  const searchViewerRef: MutableRefObject<Animatable.View> = useRef(null);

  const onPressBack = () => {
    if (searchViewerVisibility) {
      searchViewerRef.current?.bounceOutDown(2000).then(() => {
        Keyboard.dismiss();
        setSearchViewerVisibility(false);
      });
    } else {
      navigation.navigate('DummyOne');
    }
  };

  const onPressSearchBarHamburger = () => {
    infoBottomSheetRef.current!.open();
  };

  const onPressSearchBarMeatballs = () => {
    infoBottomSheetRef.current!.open();
  };

  const [searchText, onChangeSearchText] = useState('');
  const [profileType, setProfileType] = useState<ProfileTypes>('someone');
  const [searchViewerVisibility, setSearchViewerVisibility] = useState(true);

  const getHeaderRightIcon = (): HeaderSearchBarRightIcon => {
    if (searchViewerVisibility) {
      return 'none';
    } else if (profileType === 'user') {
      return 'hamburger';
    } else if (profileType === 'someone') {
      return 'meatballs';
    } else {
      return 'none';
    }
  };

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
          searchBarRightIcon={getHeaderRightIcon()}
          onChangeSearchBarText={onChangeSearchText}
          searchBarValue={searchText}
          onPressHamburger={onPressSearchBarHamburger}
          onPressMeatballs={onPressSearchBarMeatballs}
          onFocusSearchBar={() => {
            setSearchViewerVisibility(true);
          }}
          // onBlurSearchBar={() => {
          //   searchViewerRef.current?.bounceOutDown(2000).then(() => {
          //     setSearchViewerVisibility(false);
          //   });
          // }}
        />
      </View>

      {searchViewerVisibility ? (
        <SearchViewer onPressItem={() => {}} reference={searchViewerRef} />
      ) : (
        <Tab.Navigator
          screenListeners={{
            state: (e: any) => {
              setProfileType(e.data.state.index === 2 ? 'user' : 'someone');
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
      )}

      <InfoBottomSheet reference={infoBottomSheetRef} infoType={profileType} />
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
    paddingHorizontal: 15,
    paddingTop: 10,
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
