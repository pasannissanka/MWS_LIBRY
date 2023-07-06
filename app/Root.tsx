import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import NavigationStack from './navigation/NavigationStack';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {navigationRef} from './navigation/RootNavigation';
import SplashScreen from 'react-native-splash-screen';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import DeviceInfo from 'react-native-device-info';
import {Colors} from './theme';
import {useDispatch, useSelector} from 'react-redux';
import {setDeviceId} from './redux/action/action';
import NoNetworkNarrowStrip from './features/AppAccess/components/NoNetworkNarrowStrip';
import AlertBox from './features/AppAccess/components/AlertBox';
import {Animated} from 'react-native';

const Root = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const SpinnerVisibility = useSelector(
    (state: any) => state.commonReducer.spinnerVisibility,
  );
  const AlertBoxVisibility = useSelector(
    (state: any) => state.commonReducer.alertBoxVisibility,
  );

  const av = new Animated.Value(0);
  av.addListener(() => {
    return;
  });

  useEffect(() => {
    DeviceInfo.getUniqueId().then(uniqueId => {
      dispatch(setDeviceId(uniqueId));
      console.log('DEVICE_ID::: ', uniqueId);
    });
    SplashScreen.hide();
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
    },
  };
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={'#012674'}
        barStyle={'default'}
      />
      <Spinner
        visible={SpinnerVisibility}
        overlayColor={Colors.SPINNER_OVERLAY_COLOR}
      />
      <SafeAreaView style={styles.parentSafeAreaView} />
      <SafeAreaView style={styles.childSafeAreaView}>
        <LinearGradient
          colors={['#012674', '#222322']}
          style={styles.linearGradient}>
          <NoNetworkNarrowStrip />
          <NavigationContainer ref={navigationRef} theme={MyTheme}>
            <NavigationStack />
          </NavigationContainer>
        </LinearGradient>
      </SafeAreaView>

      <AlertBox
        visible={AlertBoxVisibility.visible}
        title={AlertBoxVisibility.title}
        description={AlertBoxVisibility.description}
        button={AlertBoxVisibility.button}
        onPress={AlertBoxVisibility.onPress}
      />
    </>
  );
};

export default Root;

const styles = StyleSheet.create({
  parentSafeAreaView: {
    flex: 0,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  childSafeAreaView: {
    flex: 1,
    backgroundColor: Colors.SCREEN_PRIMARY_BACKGROUND_COLOR,
  },
  linearGradient: {
    flex: 1,
  },
});
