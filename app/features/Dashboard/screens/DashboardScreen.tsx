import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {MutableRefObject, RefObject, useRef, useState} from 'react';
import {Colors} from '../../../theme';
import Header from '../../../components/header/Header';
import InfoBottomSheet from '../components/InfoBottomSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import SearchViewer from '../views/SearchViewer';
import {HeaderSearchBarRightIcon} from '../../../components/Interfaces';
import * as Animatable from 'react-native-animatable';
import {DashboardScreens} from '../interfaces/DashboardInterface';
import * as RootNavigation from '../../../navigation/RootNavigation';
import NavigationTabs from '../../../navigation/NavigationTabs';
import {useDispatch} from 'react-redux';
import {getUsersBySearch} from '../redux/action/action';

const DashboardScreen = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const infoBottomSheetRef: RefObject<RBSheet> = useRef<RBSheet>(null);
  const searchViewerRef: MutableRefObject<Animatable.View> = useRef(null);

  const [searchText, setSearchText] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>();
  const [DashboardViewer, setDashboardViewer] =
    useState<DashboardScreens>('HomeViewer');
  const [PrevDashboardViewer, setPrevDashboardViewer] =
    useState<DashboardScreens>('HomeViewer');

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

  //ON CHANGE SEARCHBAR
  const onChangeSearchText = (text: string) => {
    setSearchText(text);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTimeout = setTimeout(() => {
      //SEARCH USERS BY KEYWORD
      dispatch(getUsersBySearch(text));
    }, 3000);

    setTypingTimeout(newTimeout);
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
          onChangeSearchBarText={text => {
            onChangeSearchText(text);
          }}
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
