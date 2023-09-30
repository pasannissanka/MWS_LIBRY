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
import Header from '../../../components/header/Header';
import InfoBottomSheet from '../components/InfoBottomSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import SearchViewer from '../views/SearchViewer';
import {HeaderSearchBarRightIcon} from '../../../components/Interfaces';
import * as Animatable from 'react-native-animatable';
import HomeViewer from '../views/HomeViewer';
import {DashboardScreens} from '../interfaces/DashboardInterface';
import * as RootNavigation from '../../../navigation/RootNavigation';
import NavigationTabs from '../../../navigation/NavigationTabs';

const DashboardScreen = (): React.JSX.Element => {
  const Tab = createBottomTabNavigator();
  const infoBottomSheetRef: RefObject<RBSheet> = useRef<RBSheet>(null);
  const searchViewerRef: MutableRefObject<Animatable.View> = useRef(null);

  const onPressBack = () => {
    if (DashboardViewer === 'SearchViewer') {
      searchViewerRef.current?.bounceOutDown(2000).then(() => {
        Keyboard.dismiss();
        setDashboardViewer(PrevDashboardViewer);
      });
    } else {
      RootNavigation.jumpTo('HomeViewer');
    }
  };

  const onPressSearchBarHamburger = () => {
    infoBottomSheetRef.current!.open();
  };

  const onPressSearchBarMeatballs = () => {
    infoBottomSheetRef.current!.open();
  };

  const onPressSearchBarSettings = () => {
    RootNavigation.navigate('SettingsScreen');
  };

  const [searchText, onChangeSearchText] = useState('');
  const [DashboardViewer, setDashboardViewer] =
    useState<DashboardScreens>('HomeViewer');
  const [PrevDashboardViewer, setPrevDashboardViewer] =
    useState<DashboardScreens>('HomeViewer');

  const getHeaderRightIcon = (): HeaderSearchBarRightIcon => {
    switch (DashboardViewer) {
      case 'SearchViewer':
        return 'none';
      case 'ProfileViewer':
        return 'hamburger';
      case 'HomeViewer':
        return 'settings';
      default:
        return 'none';
    }
  };

  const onChangeScreen = (e: any) => {
    switch (e.data.state.index) {
      case 0:
        setDashboardViewer('HomeViewer');
        break;
      case 1:
        setDashboardViewer('none');
        break;
      case 2:
        setDashboardViewer('ProfileViewer');
        break;
      default:
        setDashboardViewer('none');
        break;
    }
  };

  const InitialViewer =
    DashboardViewer === 'SearchViewer' ? PrevDashboardViewer : DashboardViewer;

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
          screenType={DashboardViewer}
          searchBar={true}
          onPressBack={onPressBack}
          searchBarImageUri="https://reactnative.dev/img/tiny_logo.png"
          searchBarRightIcon={getHeaderRightIcon()}
          onChangeSearchBarText={onChangeSearchText}
          searchBarValue={searchText}
          onPressHamburger={onPressSearchBarHamburger}
          onPressMeatballs={onPressSearchBarMeatballs}
          onPressSettings={onPressSearchBarSettings}
          onFocusSearchBar={() => {
            setPrevDashboardViewer(DashboardViewer);
            setDashboardViewer('SearchViewer');
          }}
          // onBlurSearchBar={() => {
          //   searchViewerRef.current?.bounceOutDown(2000).then(() => {
          //     setSearchViewerVisibility(false);
          //   });
          // }}
        />
      </View>

      {DashboardViewer === 'SearchViewer' ? (
        <SearchViewer onPressItem={() => {}} reference={searchViewerRef} />
      ) : (
        <NavigationTabs
          onChangeScreen={onChangeScreen}
          InitialViewer={InitialViewer}
        />
      )}

      <InfoBottomSheet
        reference={infoBottomSheetRef}
        infoType={DashboardViewer}
      />
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
